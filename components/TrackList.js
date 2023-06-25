import React, { useContext } from 'react';
import { StyleSheet, ScrollView, View, SafeAreaView, Text } from 'react-native';
import Track from './Track';
import TrackPlayer from 'react-native-track-player';
import { AudioContext } from './AudioContext';

const TrackList = () => {

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#2D2A2A',
      marginTop: 40,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
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


  const audioFiles = useContext(AudioContext);
  const handleTrackPress = async (name, artist, cover, id, path, duration) => {
    const track = await TrackPlayer.getTrack(id);
    console.log(id);
    console.log(name);
    if (track) {
      await TrackPlayer.skip(id);
      console.log('track found, Playing');
      await TrackPlayer.play(id);
    } else {
      // Will add the File the track is not in the list
      console.log('not in list');
      await TrackPlayer.add({
        id: id.toString(),
        url: path,
        title: name,
        artist: artist,
        artwork: cover,
        duration: duration,
      });
      try {
        await TrackPlayer.skip(id);
        await TrackPlayer.play();
      } catch (error) {
        console.log(error);
      }

    }
  };

  return (
    <SafeAreaView>
      <ScrollView
        style={styles.scrollView}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        {audioFiles && audioFiles.length > 0 ? (
          audioFiles.map((audioFile, index) => (
            <Track
              key={index}
              name={audioFile.name}
              artist={audioFile.artist}
              cover={audioFile.cover}
              id={audioFile.id}
              path={audioFile.path}
              duration={audioFile.duration}
              onPress={handleTrackPress}
            />
          ))
        ) : (
          <View>
            {/* Render a placeholder or loading state when audioFiles is empty */}
            <Text>Loading...</Text>
          </View>
        )}
      </ScrollView>
      <View style={{ height: 65 }} />
    </SafeAreaView>
  );
};

export default TrackList;
