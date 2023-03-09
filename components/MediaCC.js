import React from 'react';
import { useEffect } from 'react';
import { Text,Button } from 'react-native';
import TrackPlayer , { State } from 'react-native-track-player';

export default class MediaCC extends React.Component { 
  track2 = {
    url: require('../dev_assets/song.mp3'), // Load media from the app bundle
    title: 'Coelacanth I',
    artist: 'demesa',
    artwork: require('../assets/cover.jpeg'), // Load artwork from the app bundle
    duration: 143
  };
  
  setupPlayer = async () => {
    console.log("Player Setup Called")
    try {
      await TrackPlayer.setupPlayer();
      TrackPlayer.add(this.track2);
    } catch (error) { console.log(error) }

  }
  Go =async () => {
    const state = await TrackPlayer.getState();
    console.log(state)
    if (state === State.Playing) {
      TrackPlayer.play();
    }if (state === State.Playing){
      TrackPlayer.pause();
    }else{
      TrackPlayer.play();
    }; 
  }
  componentDidMount(){
    this.setupPlayer();
  }
    render() { 
      return (
        <Button
        onPress={()=> this.Go()}
        title="GO"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      );
    }
  }

export {MediaCC};