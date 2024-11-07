const fs = require('node:fs');
const path = require('node:path');

const jsconfigPath = path.join(__dirname, 'jsconfig.json');
const jsconfigContent = fs
  .readFileSync(jsconfigPath, {
    encoding: 'utf-8',
  })
  .replace(/\/\/.+/g, '');

const jsconfigData = JSON.parse(jsconfigContent);

const { baseUrl, paths } = jsconfigData.compilerOptions;
const aliases = Object.keys(paths).reduce(function (acc, name) {
  const aliasName = name.replace('/*', '');
  const aliasPaths = paths[name].map(function (pathItem) {
    return './' + path.join(baseUrl, pathItem.replace('/*', ''));
  });

  acc[aliasName] = aliasPaths;
  return acc;
}, {});

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: aliases,
        extensions: [
          '.ios.js',
          '.ios.jsx',
          '.android.js',
          '.android.jsx',
          '.js',
          '.jsx',
          '.json',
        ],
      },
    ],
  ],
};
