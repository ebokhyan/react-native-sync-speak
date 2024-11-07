import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App.jsx';
import { name as appName } from './app.json';

// Register the app for the web platform
AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById('root'),
});
