/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import PlayerScreen from './screens/PlayerScreen';

function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <PlayerScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'blue',
    padding: 100,
    displayL: 'none',
  },
});

export default App;
