import React from 'react';
import { Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Track = ({ name, artist, cover ,path, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(path)}>
      {cover && <Image style={styles.cover} source={{ uri: `data:image/jpeg;base64,${cover}` }} />}
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.artist}>{artist}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    backgroundColor:"#94430F"
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

export default Track;
