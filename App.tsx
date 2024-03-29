/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  KeyboardAvoidingView,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import TrackList from './components/TrackList';
import MediaCC from './components/MediaCC';
import TopBar from './components/TopBar';


function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  const [audioFiles, setAudioFiles] = useState([]);

  const handleAudioFilesUpdate = (newAudioFiles) => {
    setAudioFiles(newAudioFiles);
    //console.log(newAudioFiles)
  };



  // Don't render unless getAudioFiles is complete
  return (
    <KeyboardAvoidingView style={styles.container}>
      <TopBar />
      <TrackList onAudioFilesUpdate={handleAudioFilesUpdate} />
      {audioFiles.length > 0 && (
        <View style={styles.mediaOverlay}>
          <MediaCC audioFiles={audioFiles} />
        </View>
      )}
    </KeyboardAvoidingView>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mediaOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});

export default App;