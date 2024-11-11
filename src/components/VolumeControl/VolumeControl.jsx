import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { colors } from '../../theme';

const VolumeControl = ({ onChange }) => {
  const [volume, setVolume] = useState(1);

  const onVolumeChange = (value) => {
    setVolume(value);
    if (typeof onChange === 'function') {
      onChange(value);
    }
  };

  return (
    <View style={styles.volumeWrapper}>
      <Image
        source={require('../../assets/icons/volume-down.png')}
        style={styles.volumeImage}
      />
      <Slider
        style={styles.volumeSlider}
        minimumValue={0}
        maximumValue={1}
        value={volume}
        tapToSeek={true}
        minimumTrackTintColor={colors.primary['100']}
        maximumTrackTintColor={colors.secondary['100']}
        thumbTintColor={colors.gray['300']}
        onValueChange={onVolumeChange}
      />
      <Image
        source={require('../../assets/icons/volume-up.png')}
        style={styles.volumeImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  volumeWrapper: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  volumeSlider: {
    width: '80%',
  },
  volumeImage: {
    width: 20,
    height: 20,
  },
});

export default VolumeControl;
