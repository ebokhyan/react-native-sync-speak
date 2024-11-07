import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { colors } from '../../theme';

export default function ProgressSlider({
  currentTime,
  duration,
  onSliderValueChange,
}) {
  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <View style={styles.progressWrapper}>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={currentTime}
        tapToSeek={true}
        minimumTrackTintColor={colors.primary['100']}
        maximumTrackTintColor={colors.secondary['100']}
        thumbTintColor={colors.gray['300']}
        onSlidingComplete={onSliderValueChange}
      />
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressWrapper: {
    marginVertical: 10,
  },
  slider: {
    width: '90%',
    alignSelf: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  timeText: {
    fontSize: 12,
  },
});
