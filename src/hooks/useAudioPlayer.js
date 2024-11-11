import { useEffect, useMemo, useState } from 'react';
import Sound from 'react-native-sound';

export default function useAudioPlayer(audioFile, transcript) {
  const player = useMemo(() => {
    const sound = new Sound(audioFile, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Error loading sound:', error);
      } else {
        setDuration(sound.getDuration() * 1000); // Set duration in milliseconds
      }
    });

    return sound;
  }, [audioFile]);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        player.getCurrentTime((seconds) => setCurrentTime(seconds * 1000));
      }, 100);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, player]);

  const play = () => {
    setIsPlaying(true);
    player.play(() => {
      setIsPlaying(false);
      setCurrentTime(0);
    });
  };

  const pause = () => {
    setIsPlaying(false);
    player.pause();
  };

  const seekTo = (time) => {
    setCurrentTime(time);
    player.setCurrentTime(time / 1000);
  };

  const setVolume = (volume) => {
    player.setVolume(volume);
  };

  const activePhraseIndex = transcript.findIndex((phrase, index) => {
    const phraseStartTime = index === 0 ? 0 : transcript[index - 1].startTime;
    const phraseEndTime = phrase.endTime;
    return currentTime >= phraseStartTime && currentTime < phraseEndTime;
  });

  const jumpToPhrase = (index) => {
    const phraseStartTime = transcript[index].startTime;
    seekTo(phraseStartTime);
  };

  const prevPhrase = () => {
    const activePhraseStartTime = transcript[activePhraseIndex].startTime;
    if (currentTime > activePhraseStartTime + 100) {
      seekTo(activePhraseStartTime);
    } else {
      const prevPhraseIndex = Math.max(0, activePhraseIndex - 1);
      const prevPhraseStartTime = transcript[prevPhraseIndex].startTime;
      seekTo(prevPhraseStartTime);
    }
  };

  const nextPhrase = () => {
    const nextPhraseIndex = Math.min(
      transcript.length - 1,
      activePhraseIndex + 1
    );
    const nextPhraseStartTime = transcript[nextPhraseIndex].startTime;
    seekTo(nextPhraseStartTime);
  };

  return {
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
  };
}
