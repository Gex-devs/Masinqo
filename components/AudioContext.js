import React, { createContext, useState, useEffect } from 'react';
import RNFS from 'react-native-fs';
import MediaMeta from 'react-native-media-meta';
import TrackPlayer from 'react-native-track-player';


export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [audioFiles, setAudioFiles] = useState([]);

  useEffect(() => {
    const loadAudioFiles = async () => {
      try {
        const files = await RNFS.readDir(RNFS.DownloadDirectoryPath);
        const loadedAudioFiles = [];
        let i = 0;
        for (const file of files) {
          if (file.name.endsWith('.mp3') || file.name.endsWith('.m4a')) {
            const metadata = await MediaMeta.get(file.path);
            loadedAudioFiles.push({
              name: metadata.title,
              artist: metadata.artist || 'Unknown artist',
              cover: metadata.thumb,
              path: file.path,
              duration: Math.floor(metadata.duration / 1000),
              id: i,
            });
            ++i;
          }
        }
        setAudioFiles(loadedAudioFiles);
      } catch (error) {
        console.log('Failed to get audio files', error);
      }
    };

    loadAudioFiles();
  }, []);

  useEffect(() => {
    const loadAudioIntoTrackPlayer = async () => {
      try {
        const tracks = audioFiles.map((file) => ({
          id: file.id.toString(),
          url: file.path,
          title: file.name,
          artist: file.artist,
          artwork: file.cover,
          duration: file.duration,
        }));
        await TrackPlayer.add(tracks); // Add the tracks to TrackPlayer
      } catch (error) {
        console.log('Failed to load audio files into TrackPlayer', error);
      }
    };
    loadAudioIntoTrackPlayer();
  }, [audioFiles]);
  

  return (
    <AudioContext.Provider value={audioFiles}>{children}</AudioContext.Provider>
  );
};
