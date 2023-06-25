import React from 'react';
import { View, StyleSheet } from 'react-native';
import TrackList from './TrackList';

const ComponentHolder = () => {
  return (
    <View style={styles.container}>
      <TrackList />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#2D2A2A',
        marginTop:40,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
    },
});

export default ComponentHolder;
