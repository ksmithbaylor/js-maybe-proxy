module.exports = function karmaConfig(config) {
  config.set({
    plugins: [
      require('karma-tap'),
      require('karma-chrome-launcher'),
      require('karma-webpack')
    ],

    basePath: '',
    frameworks: ['tap'],
    files: [
      'tests.js'
    ],

    preprocessors: {
      'tests.js': ['webpack']
    },

    webpack: {
      node: {
        fs: 'empty'
      }
    },

    reporters: ['dots'],
    port: 8888,
    colors: true,
    logLevel: config.LOG_ERROR,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};
