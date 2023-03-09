import React from 'react';
import { Text, Button, View, StyleSheet, Image } from 'react-native';
import TrackPlayer, { State } from 'react-native-track-player';
import Slider from '@react-native-community/slider';


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
  Go = async () => {
    const state = await TrackPlayer.getState();
    console.log(state)
    if (state === State.Playing) {
      TrackPlayer.play();
    } if (state === State.Playing) {
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    };
  }
  componentDidMount() {
    this.setupPlayer();
  }
  test(value) {
    console.log(Math.round(value))
  }
  render() {
    return (
      <View
        style={{
          backgroundColor: "#94430F",
          height: 280
        }
        }>

        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          onValueChange={(value) => (this.test(value))}
        />
        <View>
          <Image
            source={require('../assets/cover.jpeg')}
            style={{ width: 100, height: 100, resizeMode: 'contain', paddingLeft: 140 }}
          />
          <View style={{paddingTop:50}}> 
            <Button
              onPress={() => this.Go()}
              title="GO"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
        </View>
      </View>
    );
  }
}

export { MediaCC };