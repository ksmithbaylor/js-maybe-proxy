module.exports = function karmaConfig(config) {
  config.set({
    plugins: [
      require('karma-tap'),
      require('karma-chrome-launcher'),
      require('karma-webpack'),
      require('karma-sourcemap-loader')
    ],

    basePath: '',
    frameworks: ['tap'],
    files: [
      'tests.js'
    ],

    preprocessors: {
      'tests.js': ['webpack', 'sourcemap']
    },

    webpack: {
      node: {
        fs: 'empty'
      },
      devtool: 'inline-source-map'
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
