# SyncSpeak

SyncSpeak is a React Native app designed for playing audio alongside an interactive transcript. The app highlights phrases in real-time as the audio progresses and offers user-friendly playback controls.

## Features
- **Interactive Transcripts**: Displays phrases with speaker names, highlighting each in sync with the audio playback.
- **Playback Controls**:
   - **Play/Pause**: Start: or pause the audio at any point.
   - **Next Phrase**: Skip: to the beginning of the next phrase.
   - **Previous Phrase**: Return to the beginning of the current phrase, or the previous one if already at the start.
- **Volume Control Slider**: Adjust the playback volume.
- **Audio Progress Bar**: Displays current playback progress and supports manual sliding to different positions.
- **Phrase Jump**: Click on a phrase to jump directly to that part of the audio.

## Demo
You can access the deployed web version of the app here: [Deployed Web Version](https://sync-speak-xi.vercel.app/)

**Note:** For the best experience, use a desktop browser with responsive mode enabled.

## Installation
Follow these steps to set up the project locally:

## Prerequisites
Ensure you have the following installed:
1. **Node.js** (v18 or later)
2. **npm or yarn**: Comes with Node.js, or install separately.
3. **Java Development Kit (JDK)**: Required for Android development. Install JDK
4. **Android Studio**: For Android emulator and tools. Install Android Studio
5. **Xcode** (macOS only): Required for iOS development on macOS. Install Xcode
6. **CocoaPods** (macOS only): Required for managing iOS native dependencies. Install it with:
```
sudo gem install cocoapods
```
7. **React Native CLI**: Install globally:
```
npm install -g react-native-cli
```

## Clone the Repository
```
git clone https://github.com/ebokhyan/react-native-sync-speak.git SyncSpeak
cd SyncSpeak
```

## Install Dependencies
Run the following command to install all necessary dependencies:
```
npm install
```

**iOS-Specific Step**: Install CocoaPods Dependencies:
```
cd ios
pod install
```

Return to the root project directory after installation:
```
cd ..
```

## Running the App
**For Android:**

1. Start the Metro bundler:
```
npm start
```
2. Run the app on an Android device or emulator:
```
npm run android
```

**For iOS:**
1. Start the Metro bundler:
```
npm start
```
2. Run the app on an iOS device or simulator:
```
npm run ios
```