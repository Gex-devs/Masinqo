import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, Image, StyleSheet,KeyboardAvoidingView } from 'react-native';
import TrackPlayer, { State, Event, useTrackPlayerEvents, useProgress } from 'react-native-track-player';
import Slider from '@react-native-community/slider';




const MediaCC = ({ audioFiles }) => {

  const { position, duration } = useProgress(1000); // Update every second
  const [elapsedTime, setElapsedTime] = useState("0");
  const [remainingTime, setRemainingTime] = useState("0");
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  
  const [currentArtwork, setCurrentArtwork] = useState(null);
  const [currenTitle, setCurrentTitle] = useState("");
  const [currenTitleDuration, setcurrenTitleDuration] = useState(0);

  const [playPauseImage, setplayPauseImage] = useState(require("../assets/PlayButtonCircled.png"));

  // Test Track
  // const track2 = {
  //   url: require('../dev_assets/song.mp3'),
  //   title: 'Coelacanth I',
  //   artist: 'demesa',
  //   artwork: require('../assets/cover.jpeg'),
  //   duration: 143,
  // };






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
    if (!isPlayerReady) {
      setupPlayer();
      setIsPlayerReady(true);
    }

    // Calculate elapsed time
    minutes = Math.floor(position / 60);
    elapsed = Math.floor(position % 60);

    formattedMinutes = minutes >= 10 ? minutes : `0${minutes}`;
    formattedSeconds = String(elapsed).padStart(2, "0");

    setElapsedTime(`${formattedMinutes}:${formattedSeconds}`);


    // Calculate remaining time
    minutes = Math.floor((duration - position) / 60);
    remaining = Math.floor((duration - position) % 60);
    formattedMinutes = minutes >= 10 ? minutes : `0${minutes}`;
    formattedSeconds = String(remaining).padStart(2, "0");
    setRemainingTime(`${formattedMinutes}:${formattedSeconds}`);



  }, [isPlayerReady, position, duration]);



  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const { title } = track || {};
      console.log(title);
      setCurrentTitle(title);
      setcurrenTitleDuration(track.duration);
      getCurrentTrackArtwork();
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
      setplayPauseImage(require('../assets/PlayButtonCircled.png'));
    } else if (state === State.Paused) {
      TrackPlayer.play();
      setplayPauseImage(require('../assets/Pause.png'));
    }
    else {
      TrackPlayer.play();
    }
  };


  const Next = async () => {
    await TrackPlayer.skipToNext();
    await TrackPlayer.play();

  }

  const Prev = async () => {
    await TrackPlayer.skipToPrevious();
    await TrackPlayer.play();
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
      paddingLeft: 10
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
      paddingLeft: 10
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
      width: 405,
      marginLeft: -4,
      marginTop: 39,
      paddingLeft: 20,
      paddingRight: 20,
      borderRadius: 40,
      bottom:11
    },
    button_icon: {
      justifyContent: "center",
      paddingBottom: 15
    },
    play_button: {
      justifyContent: "center",
    },

  })
  return (
    <KeyboardAvoidingView
      style={styles.Container}>
      <View style={styles.Image_Title}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {currentArtwork === `data:image/jpeg;base64,${undefined}` ? (
            <Image source={require('../assets/temp.png')} style={styles.artwork} />
          ) : (
            <Image
              source={{ uri: currentArtwork }}
              style={styles.artwork}
            />
          )}
          <Text style={styles.title}>{currenTitle}</Text>

        </View>
      </View>
      <Slider
        // Slider doesn't work unless height is at very least 10
        style={{ width: 400, height: 10, marginBottom: 10, marginTop: 25 }}
        minimumValue={0}
        maximumValue={currenTitleDuration}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        value={progress.position}
        onValueChange={handleSliderChange}
      />
      <View style={{ flexDirection: "row", alignItems: "center"}}>
        <View style={{ flex: 1 }}>
          <Text style={{ textAlign: "left",color:"white" }}>{elapsedTime}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ textAlign: "right",color:"white" }}>{remainingTime}</Text>
        </View>
      </View>

      <View
        style={styles.mediaController}>
        <TouchableOpacity onPress={Prev}>
          <View style={styles.button_icon}>
            <Image source={require("../assets/fastprev.png")} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={Go}>
          <View style={styles.play_button}>
            <Image source={playPauseImage} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={Next}>
          <View style={styles.button_icon}>
            <Image source={require("../assets/FastForward.png")} />
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default MediaCC;
