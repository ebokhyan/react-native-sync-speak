const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Add JSON loader
  config.module.rules.push({
    test: /\.json$/,
    type: 'json', // Specify JSON loader
  });

  return config;
};
