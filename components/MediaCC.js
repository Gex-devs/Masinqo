import React from 'react';
import { Text, Button, View, StyleSheet, Image } from 'react-native';
import TrackPlayer, { State } from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import { Colors } from 'react-native/Libraries/NewAppScreen';



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
      if (this.props.currentTrack) {
        TrackPlayer.add({
          url: this.props.currentTrack.path,
          title: this.props.currentTrack.filename,
          artist: this.props.currentTrack.author,
          artwork: this.props.currentTrack.image,
          duration: this.props.currentTrack.duration,
        });
      }
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
          backgroundColor: "#211818",
          height: 280,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingLeft:7
        }
        }>
        <Image
          source={require('../assets/cover.jpeg')}
          style={{ width: 100, height: 100, resizeMode: 'contain', paddingLeft: 140, paddingTop: 200 ,}}
        />
        <Slider
          style={{ width: 400, height: 0,marginBottom:30 }}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          onValueChange={(value) => (this.test(value))}
        />
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          justifyitems:'center',
          backgroundColor:"#94430F",
          flex:1,
          marginLeft:10,
          marginRight:20,
          marginBottom:8,
          marginTop:3,
          paddingLeft:20,
          paddingRight:20,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderBottomRightRadius:20,
          borderBottomLeftRadius: 20
        }}>
          <Button
            onPress={() => this.Go()}
            title="Prev"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
          <Button
            onPress={() => this.Go()}
            title="GO"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
          <Button
            onPress={() => this.Go()}
            title="Next"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </View>
    );
  }
}

export { MediaCC };