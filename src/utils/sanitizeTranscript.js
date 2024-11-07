function sanitizeTranscript(transcriptData) {
  const { pause, speakers } = transcriptData;
  const result = [];
  let startCursor = 0;

  const maxPhrases = Math.max(
    ...speakers.map((speaker) => speaker.phrases.length)
  );

  for (let i = 0; i < maxPhrases; i++) {
    speakers.forEach((speaker) => {
      if (i < speaker.phrases.length) {
        const phrase = speaker.phrases[i];

        result.push({
          speaker: speaker.name,
          phrase: phrase.words,
          time: phrase.time,
          startTime: startCursor,
          endTime: startCursor + phrase.time,
        });

        startCursor += phrase.time + pause;
      }
    });
  }

  return result;
}

export default sanitizeTranscript;
