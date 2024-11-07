import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import SoundPlayer from '../../utils/SoundPlayer';
import { colors } from '../../theme';
import audioTranscriptJson from '../../assets/data/audio-transcript.json';
import sanitizeTranscript from '../../utils/sanitizeTranscript';

import Transcript from '../../components/Transcript';
import ProgressSlider from '../../components/ProgressSlider';
import Controls from '../../components/Controls';
import VolumeControl from '../../components/VolumeControl';

const audioFile = {
  web: '/sound.mp3',
  ios: 'sound.mp3',
}[Platform.OS];

export default function PlayerScreen() {
  const transcript = sanitizeTranscript(audioTranscriptJson);

  const soundPlayerInitCallback = (duration) => {
    if (duration) {
      setDuration(duration);
    }
  };

  const player = useMemo(() => {
    const sound = new SoundPlayer(audioFile, soundPlayerInitCallback);
    return sound;
  }, []);

  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);

  const activePhraseIndex = transcript.findIndex((phrase, index) => {
    const phraseStartTime = index === 0 ? 0 : transcript[index - 1].startTime;
    const phraseEndTime = phrase.endTime;
    return currentTime >= phraseStartTime && currentTime < phraseEndTime;
  });

  const onPlay = () => {
    setIsPlaying(true);
    player.play(() => {
      setIsPlaying(false);
      setCurrentTime(0); // Reset to start after completion
    });
  };

  const onPause = () => {
    setIsPlaying(false);
    player.pause();
  };

  const onSliderValueChange = (value) => {
    setCurrentTime(value);
    player.setCurrentTime(value / 1000);
  };

  const onPrevPhrase = () => {
    const activePhraseStartTime = transcript[activePhraseIndex].startTime;

    if (currentTime > activePhraseStartTime + 100) {
      player.setCurrentTime(activePhraseStartTime / 1000); // Convert to seconds
      setCurrentTime(activePhraseStartTime);
    } else {
      const prevPhraseIndex = Math.max(0, activePhraseIndex - 1);
      const prevPhraseStartTime =
        prevPhraseIndex === 0 ? 0 : transcript[prevPhraseIndex].startTime;
      player.setCurrentTime(prevPhraseStartTime / 1000); // Convert to seconds
      setCurrentTime(prevPhraseStartTime);
    }
  };

  const onNextPhrase = () => {
    const nextPhraseIndex = Math.min(
      transcript.length - 1,
      activePhraseIndex + 1
    );
    const nextPhraseStartTime = transcript[nextPhraseIndex].startTime;
    player.setCurrentTime(nextPhraseStartTime / 1000);
    setCurrentTime(nextPhraseStartTime);
  };

  const onJumpToPhrase = (index) => {
    const phraseStartTime = transcript[index].startTime;
    player.setCurrentTime(phraseStartTime / 1000);
    setCurrentTime(phraseStartTime);
  };

  useEffect(() => {
    let interval;

    if (isPlaying) {
      interval = setInterval(() => {
        player.getCurrentTime((seconds) => {
          setCurrentTime(seconds * 1000);
        });
      }, 100);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [player, isPlaying]);

  useEffect(() => {
    let interval;

    if (isPlaying) {
      interval = setInterval(() => {
        player.getCurrentTime((seconds) => {
          setCurrentTime(seconds * 1000);
        });
      }, 100);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [player, isPlaying]);

  return (
    <View style={styles.container}>
      <Transcript
        transcript={transcript}
        activePhraseIndex={activePhraseIndex}
        onJumpToPhrase={onJumpToPhrase}
      />
      <View style={styles.bottomSection}>
        <ProgressSlider
          currentTime={currentTime}
          duration={duration}
          onSliderValueChange={onSliderValueChange}
        />
        <Controls
          isPlaying={isPlaying}
          onPlay={onPlay}
          onPause={onPause}
          onNextPhrase={onNextPhrase}
          onPrevPhrase={onPrevPhrase}
        />
        <VolumeControl player={player} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: '100vh',
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
