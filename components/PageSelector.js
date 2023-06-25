import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const PageSelector = ({ onPageChange }) => {
  const pages = ['Page 1', 'Page 2', 'Page 3', 'Page 4'];

  return (
    <View style={styles.container}>
      {pages.map((page, index) => (
        <TouchableOpacity
          key={index}
          style={styles.page}
          onPress={() => onPageChange(index)}
        >
          <Text style={styles.pageText}>{page}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 50,
    backgroundColor: 'lightgray',
  },
  page: {
    paddingHorizontal: 10,
  },
  pageText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PageSelector;
