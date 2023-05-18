import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, KeyboardAvoidingView, FlatList, Image } from 'react-native';

const SearchBar = ({ onSearch }) => {
  const [expanded, setExpanded] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleToggleExpand = () => {
    setExpanded(!expanded);
    setSearchText('');
    setSearchResults([]);
  };

  const handleSearch = (text) => {
    setSearchText(text);
    onSearch(text).then((results) => {
      setSearchResults(results);
    });
  };
  
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.resultItem} onPress={() => handleResultPress(item)}>
      {/* Return clickable tracks */}
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );
    
  const handleResultPress = (item) => {
    // Handle the selection of a search result item
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {expanded ? (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search"
            value={searchText}
            onChangeText={handleSearch}
            autoFocus={true}
          />
          {searchResults.length > 0 && (
            <FlatList
              data={searchResults}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              style={styles.resultList}
            />
          )}
          <TouchableOpacity style={styles.button} onPress={handleToggleExpand}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleToggleExpand}>
         {/* <Text style={styles.buttonText}>Search</Text> */}
          <Image source={require('../assets/Search.png')}/>
        </TouchableOpacity>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 1,
  },
  button: {

  },
  buttonText: {
    color: 'blue',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  resultList: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    maxHeight: 200,
    paddingHorizontal: 10,
  },
  resultItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});

export default SearchBar;
