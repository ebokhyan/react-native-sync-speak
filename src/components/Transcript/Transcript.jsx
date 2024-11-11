import React, { useEffect, useRef } from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { colors } from '../../theme';

const Transcript = ({ transcript, activePhraseIndex, onJumpToPhrase }) => {
  const transcriptRef = useRef();

  const getOpacityForIndex = (index, activeIndex) => {
    const distance = Math.abs(index - activeIndex);
    const baseOpacity = 1;
    const opacityDecreasePerStep = 0.2;

    return Math.max(baseOpacity - distance * opacityDecreasePerStep, 0.3);
  };

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTo({
        y: activePhraseIndex * 50,
        animated: true,
      });
    }
  }, [activePhraseIndex]);

  return (
    <ScrollView
      ref={transcriptRef}
      contentContainerStyle={styles.transcriptContainer}
    >
      {transcript.map((row, index) => (
        <TouchableOpacity
          key={row.phrase}
          onPress={() => onJumpToPhrase(index)}
        >
          <View
            style={[
              styles.phraseContainer,
              ...[activePhraseIndex === index && styles.activePhraseContainer],
              { opacity: getOpacityForIndex(index, activePhraseIndex) },
            ]}
          >
            <Text style={styles.speakerLabel}>{row.speaker}:</Text>
            <Text
              style={[
                styles.phraseText,
                ...[activePhraseIndex === index && styles.activePhrase],
              ]}
            >
              {row.phrase}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  transcriptContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  phraseContainer: {
    marginVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white['100'],
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: colors.gray['100'],
  },
  activePhraseContainer: {
    backgroundColor: colors.secondary['100'],
  },
  speakerLabel: {
    fontSize: 12,
    color: '#888',
  },
  phraseText: {
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 6,
    paddingLeft: 10,
  },
  activePhrase: {
    fontWeight: '600',
    color: colors.primary['100'],
  },
});

export default Transcript;
