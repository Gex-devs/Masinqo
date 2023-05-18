

import { Text, TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import SearchBar from './Searchbar';

const TopBar = () => {
    const handleSearch = (text) => {
        // Perform search logic here and return the search results
        console.log(text);
        if (text == "") {
            return Promise.resolve([]);
        }
        return Promise.resolve([
            { id: 1, title: 'Never' },
            { id: 2, title: 'Gone' },
            { id: 3, title: 'Give' },
            { id: 3, title: 'You' },
            { id: 3, title: 'Up' },
        ]);
        // Pls fix this later
    };

    return (
        <View style={styles.container}>
            <SearchBar onSearch={handleSearch} />
            {/* Place your other components here */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        //backgroundColor: "red",
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 2, 
    },
});

export default TopBar;
