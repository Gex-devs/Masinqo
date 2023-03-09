import React, { useState } from 'react';
import {  StyleSheet, ScrollView, StatusBar, SafeAreaView } from 'react-native';
import RNFS from 'react-native-fs';
import MediaMeta from 'react-native-media-meta';
import Track from './Track';

export default class TrackList extends React.Component {
    
    state = {
        audioFiles: [

        /*{ name: 'Track 1', artist: 'Artist 1', cover: null },
        { name: 'Track 2', artist: 'Artist 2', cover: null },
        { name: 'Track 3', artist: 'Artist 3', cover: null },
        { name: 'Track 4', artist: 'Artist 4', cover: null },
        { name: 'Track 5', artist: 'Artist 5', cover: null },
        { name: 'Track 6', artist: 'Artist 6', cover: null },
        { name: 'Track 7', artist: 'Artist 7', cover: null },
        { name: 'Track 8', artist: 'Artist 8', cover: null },
        { name: 'Track 9', artist: 'Artist 9', cover: null },*/
    
        ],
      
        audioFiles: [],
        selectedTrack: null
        
          
    }

    getAudioFiles = async () => {
        try {
            const files = await RNFS.readDir(RNFS.DownloadDirectoryPath);
            const audioFiles = []

            for (const file of files) {
                if (file.name.endsWith('.mp3') || file.name.endsWith('.m4a')) {
                    const metadata = await MediaMeta.get(file.path);
                    audioFiles.push({
                        name: file.name,
                        artist: metadata.artist || 'Unknown artist',
                        cover: metadata.picture,
                        path: file.path,
                    });
                }
            }
            this.setState({ audioFiles })
        } catch (error) {
            console.log('Failed to get audio files', error);
        }
    };

    componentDidMount() {
        this.getAudioFiles().then(() => {
            console.log(this.state.audioFiles)
        });
    }

    
    styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: StatusBar.currentHeight,
            backgroundColor: '#2D2A2A',
        },
        scrollView: {
            marginHorizontal: 20,
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
    // Remove later
    handleTrackPress = (path) => {
        console.log("The path is "+ path)
    }
    render() {
        return (
            <SafeAreaView style={this.styles.container}>
                <ScrollView style={this.styles.scrollView} contentInsetAdjustmentBehavior="automatic">
                {this.state.audioFiles.map((audioFile, index) => (
                    <Track
                        key={index} 
                        name={audioFile.name} 
                        artist={audioFile.artist} 
                        over={audioFile.cover} 
                        path={audioFile.path} 
                        onPress={this.handleTrackPress} />
                    ))}
                </ScrollView>
            </SafeAreaView>
        );
    };
}

export { TrackList };
