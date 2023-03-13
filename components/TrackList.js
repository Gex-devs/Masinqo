import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, SafeAreaView } from 'react-native';
import RNFS from 'react-native-fs';
import MediaMeta from 'react-native-media-meta';
import Track from './Track';
import TrackPlayer from 'react-native-track-player';

export default class TrackList extends React.Component {

    state = {
        audioFiles: [
            /*
            { name: 'Track 1', artist: 'Artist 1', cover: null },
            { name: 'Track 2', artist: 'Artist 2', cover: null },
            { name: 'Track 3', artist: 'Artist 3', cover: null },
            { name: 'Track 4', artist: 'Artist 4', cover: null },
            { name: 'Track 5', artist: 'Artist 5', cover: null },
            { name: 'Track 6', artist: 'Artist 6', cover: null },
            { name: 'Track 7', artist: 'Artist 7', cover: null },
            { name: 'Track 8', artist: 'Artist 8', cover: null },
            { name: 'Track 9', artist: 'Artist 9', cover: null },*/

        ],
        selectedTrack: null
    }

    getAudioFiles = async () => {
        try {
            const files = await RNFS.readDir(RNFS.DownloadDirectoryPath);
            const audioFiles = []
            let i = 0
            for (const file of files) {
                if (file.name.endsWith('.mp3') || file.name.endsWith('.m4a')) {
                    const metadata = await MediaMeta.get(file.path);
                    audioFiles.push({
                        name: metadata.title,
                        artist: metadata.artist || 'Unknown artist',
                        cover: metadata.thumb,
                        path: file.path,
                        duration: Math.floor(metadata.duration / 1000),
                        id: i,
                    });
                    ++i
                }
            }
            this.setState({ audioFiles })
            this.props.onAudioFilesUpdate(audioFiles);
        } catch (error) {
            console.log('Failed to get audio files', error);
        }
    };

    componentDidMount() {
        this.getAudioFiles().then(() => {
            //console.log(this.state.audioFiles)
        });
    }


    styles = StyleSheet.create({
        container: {
            flex:1,
            backgroundColor: '#2D2A2A',
            marginTop:67,
            borderTopLeftRadius:20,
            borderTopRightRadius:20,
        },
        scrollView: {
            marginHorizontal: 20,
        },
        title: {
            color: '#FFFFFF',
            fontSize: 18,
            fontWeight: 'bold',
            marginTop: 20,
        },
        artist: {
            color: '#BBBBBB',
            fontSize: 14,
            marginBottom: 10,
        },
        cover: {
            width: 200,
            height: 200,
            resizeMode: 'contain',
        },
    });


    handleTrackPress = async (name, artist, cover ,id,path,duration) => {
        const track = await TrackPlayer.getTrack(id);
        console.log(id)
        console.log(name)
        if (track) {
            await TrackPlayer.skip(id);
            console.log("track found, Playing")
            await TrackPlayer.play(id)
        } else {
            // Will add the File the track is not in the list
            console.log("not in list");
            await TrackPlayer.add({
                url: path,
                title: name,
                artist: artist,
                artwork: cover,
                duration: duration,
            });
            await TrackPlayer.play();
        }
    }
    render() {
        return (
            <SafeAreaView style={this.styles.container} >
                <ScrollView style={this.styles.scrollView} contentInsetAdjustmentBehavior="automatic" showsVerticalScrollIndicator={false}>
                    {this.state.audioFiles.map((audioFile, index) => (
                        <Track
                            key={index}
                            name={audioFile.name}
                            artist={audioFile.artist}
                            cover={audioFile.cover}
                            id={audioFile.id}
                            path={audioFile.path}
                            duration={audioFile.duration}
                            onPress={this.handleTrackPress}
                        />
                    ))}
                </ScrollView>
                <View style={{ height: 65 }} />
            </SafeAreaView>
        );
    };
}

export { TrackList };
