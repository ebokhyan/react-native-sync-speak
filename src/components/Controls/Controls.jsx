import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

const Controls = ({
  isPlaying,
  onPlay,
  onPause,
  onNextPhrase,
  onPrevPhrase,
}) => (
  <View style={styles.controlsContainer}>
    <TouchableOpacity onPress={onPrevPhrase}>
      <Image
        source={require('../../assets/icons/previous.png')}
        style={styles.nextPrevImage}
      />
    </TouchableOpacity>
    <TouchableOpacity onPress={isPlaying ? onPause : onPlay}>
      <Image
        source={
          isPlaying
            ? require('../../assets/icons/pause.png')
            : require('../../assets/icons/play.png')
        }
        style={styles.playPauseImage}
      />
    </TouchableOpacity>
    <TouchableOpacity onPress={onNextPhrase}>
      <Image
        source={require('../../assets/icons/next.png')}
        style={styles.nextPrevImage}
      />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  controlsContainer: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 10,
  },
  playPauseImage: {
    width: 50,
    height: 50,
  },
  nextPrevImage: {
    width: 30,
    height: 30,
  },
});

export default Controls;
