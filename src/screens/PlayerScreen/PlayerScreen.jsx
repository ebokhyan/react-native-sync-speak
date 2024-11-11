import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../theme';
import audioTranscriptJson from '../../assets/data/audio-transcript.json';
import sanitizeTranscript from '../../utils/sanitizeTranscript';

import Transcript from '../../components/Transcript';
import ProgressSlider from '../../components/ProgressSlider';
import Controls from '../../components/Controls';
import VolumeControl from '../../components/VolumeControl';

import useAudioPlayer from '../../hooks/useAudioPlayer';

export default function PlayerScreen() {
  const transcript = sanitizeTranscript(audioTranscriptJson);
  const {
    currentTime,
    duration,
    isPlaying,
    play,
    pause,
    seekTo,
    setVolume,
    activePhraseIndex,
    jumpToPhrase,
    prevPhrase,
    nextPhrase,
  } = useAudioPlayer('sound.mp3', transcript);

  return (
    <View style={styles.container}>
      <Transcript
        transcript={transcript}
        activePhraseIndex={activePhraseIndex}
        onJumpToPhrase={jumpToPhrase}
      />
      <View style={styles.bottomSection}>
        <ProgressSlider
          currentTime={currentTime}
          duration={duration}
          onSliderValueChange={seekTo}
        />
        <Controls
          isPlaying={isPlaying}
          onPlay={play}
          onPause={pause}
          onNextPhrase={nextPhrase}
          onPrevPhrase={prevPhrase}
        />
        <VolumeControl player={{ setVolume }} onChange={setVolume} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white['100'],
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopWidth: 1,
    paddingVertical: 10,
    borderTopColor: colors.gray['200'],
  },
});
