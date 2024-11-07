import { Platform } from 'react-native';

let SoundPlayer;
console.log('>>> PLATFORM', Platform.OS);
if (Platform.OS === 'web') {
  const { Howl } = require('howler');

  SoundPlayer = class {
    constructor(file, callback) {
      this.sound = new Howl({
        src: [file],
        html5: true,
      });

      this.sound.once('load', () => {
        callback(this.sound.duration() * 1000); // Returns duration in milliseconds
      });
    }

    play(onEnd) {
      this.sound.play();

      this.sound.on('end', () => {
        onEnd();
      });
    }

    stop() {
      this.sound.stop();
    }

    pause() {
      this.sound.pause();
    }

    setVolume(volume) {
      this.sound.volume(volume);
    }

    getCurrentTime(callback) {
      // Howler does not provide `getCurrentTime`, so we approximate:
      callback(this.sound.seek()); // Returns current position in seconds
    }

    setCurrentTime(seconds) {
      this.sound.seek(seconds); // Seek to position in seconds
    }

    getDuration() {
      this.sound.duration();
    }
  };
} else {
  const Sound = require('react-native-sound');

  SoundPlayer = class {
    constructor(file, callback) {
      this.sound = new Sound(file, Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('Failed to load sound', error);
        } else {
          callback(this.sound.getDuration() * 1000); // Returns duration in milliseconds
        }
      });
    }

    play() {
      this.sound.play();
    }

    stop() {
      this.sound.stop();
    }

    pause() {
      this.sound.pause();
    }

    setVolume(volume) {
      this.sound.setVolume(volume);
    }

    getCurrentTime(callback) {
      this.sound.getCurrentTime(callback);
    }

    setCurrentTime(seconds) {
      this.sound.setCurrentTime(seconds);
    }
  };
}

export default SoundPlayer;
