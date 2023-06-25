import React, { useState } from 'react';
import { Text, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';


const Track = ({ name, artist, cover, id, path, duration, onPress }) => {

  const handlePress = () => {
    onPress(name, artist, cover, id, path, duration);
  }
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

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
      <Menu
        //https://www.npmjs.com/package/react-native-material-menu
        style={styles.kebabMenu}
        visible={visible}
        anchor={
        <TouchableOpacity onPress={showMenu}>
          <View style={styles.button_icon}>
            <Image source={require("../assets/MenuVertical.png")} />
          </View>
        </TouchableOpacity>}
        onRequestClose={hideMenu
        }>
        <MenuItem onPress={hideMenu}>Delete</MenuItem>
        <MenuItem onPress={hideMenu}>Menu item 2</MenuItem>
        <MenuItem disabled>Disabled item</MenuItem>
        <MenuDivider />
        <MenuItem onPress={hideMenu}>Menu item 4</MenuItem>
      </Menu>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  kebabMenu: {
    borderRadius: 15
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
    paddingHorizontal: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
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
  button_icon:{
    
  }
});


export default Track;
