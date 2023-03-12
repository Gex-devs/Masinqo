import React from 'react';
import { Text, Image, StyleSheet, TouchableOpacity, View } from 'react-native';

const Track = ({ name, artist, cover, id, path, duration, onPress }) => {

  const handlePress = () => {
    onPress(name, artist, cover, id, path, duration,);
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.iconContainer}>
        {cover === undefined || cover === null ? (
          // Set image if the current track doesn't have art work...this doesn't work for some reason; 
          <Image source={require('../assets/temp.png')} style={styles.cover} />
        ) : (
          <Image
            source={{ uri: `data:image/jpeg;base64,${cover}` }}
            style={styles.cover}
          />
        )}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.artist}>{artist}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: "#841584",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius:10,
    borderBottomLeftRadius:10,
  },
  iconContainer: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  artist: {
    color: '#BBBBBB',
    fontSize: 14,
    marginTop: 5,
  },
  cover: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});


export default Track;
