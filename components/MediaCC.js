import React, { useEffect, useState } from 'react';
import { Text, Button, View, Image, StyleSheet } from 'react-native';
import TrackPlayer, { State, Event, useTrackPlayerEvents, useProgress } from 'react-native-track-player';
import Slider from '@react-native-community/slider';


const MediaCC = ({ audioFiles }) => {

  // Test Track
  const track2 = {
    url: require('../dev_assets/song.mp3'),
    title: 'Coelacanth I',
    artist: 'demesa',
    artwork: require('../assets/cover.jpeg'),
    duration: 143,
  };




  const [currentArtwork, setCurrentArtwork] = useState(null);
  const [currenTitle, setCurrentTitle] = useState("");

  async function setupPlayer() {
    console.log('Player Setup Called');
    //console.log(audioFile)
    try {
      await TrackPlayer.setupPlayer();
    } catch (error) {
      console.log(error);
    }
    for (files of audioFiles) {
      await TrackPlayer.add({
        url: files.path,
        title: files.name,
        artist: files.artist,
        artwork: files.cover,
        duration: files.duration,
      });
    }
    //TrackPlayer.add(track2)


  }



  useEffect(() => {
    // update the parent component on track change
    setupPlayer();
  }, []);



  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const { title } = track || {};
      console.log(title)
      setCurrentTitle(title)
      getCurrentTrackArtwork()
    }
  });




  async function getCurrentTrackArtwork() {
    const trackId = await TrackPlayer.getCurrentTrack();
    const trackObject = await TrackPlayer.getTrack(trackId);
    const artwork = trackObject.artwork;
    setCurrentArtwork(`data:image/jpeg;base64,${artwork}`)
    return artwork;
  }

  const Go = async () => {
    const state = await TrackPlayer.getState();
    console.log(state);
    if (state === State.Playing) {
      TrackPlayer.pause();
    } else if (state === State.Paused) {
      TrackPlayer.play();
    } else {
      TrackPlayer.play();
    }
  };


  const next = async () => {
    await TrackPlayer.skipToNext();


  }

  const Prev = async () => {
    await TrackPlayer.skipToPrevious();

  }

  const progress = useProgress();

  const handleSliderChange = async (value) => {
    await TrackPlayer.seekTo(value);
  };

  const styles = StyleSheet.create({

    title: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
    },
    Container: {
      backgroundColor: '#211818',
      height: 280,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingLeft: 7,
    },
    Image_Title: {
      flexDirection: 'row',  // set flexDirection to "row"
      justifyContent: 'space-between',
      alignItems: 'center',  // center the child components vertically
      paddingHorizontal: 20,  // add horizontal padding
      paddingTop: 20,  // add top padding
    },
    artwork: {
      width: 100,
      height: 100,
      resizeMode: 'contain',
    },
    mediaController: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      justifyitems: 'center',
      backgroundColor: '#94430F',
      flex: 1,
      marginLeft: 10,
      marginRight: 20,
      marginBottom: 40,
      marginTop: 10,
      paddingLeft: 20,
      paddingRight: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
      borderBottomLeftRadius: 20,
    }
  })
  return (
    <View
      style={styles.Container}>
      <View style={styles.Image_Title}>
        {currentArtwork === `data:image/jpeg;base64,${undefined}` ? (
          // Set image if the current track doesn't have art work...this doesn't work for some reason; 
          <Image source={require('../assets/temp.png')} style={styles.artwork} />
        ) : (
          <Image
            source={{ uri: currentArtwork }}
            style={styles.artwork}
          />
        )}
        <Text style={styles.title}>{currenTitle}</Text>
      </View>
      <Slider
        // Slider doesn't work unless height is at very least 10
        style={{ width: 400, height: 10, marginBottom: 30,marginTop:20 }}
        minimumValue={0}
        maximumValue={100}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        value={progress.position}
        onValueChange={handleSliderChange}
      />
      <View
        style={styles.mediaController}>
        <Button
          onPress={Prev}
          title="Prev"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          onPress={Go}
          title="GO"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          onPress={next}
          title="Next"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    </View>
  );
};

export default MediaCC;
