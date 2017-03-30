const webpack = require('./webpack.config.js');

module.exports = function (config) {
  config.set({
    browsers: ['Chrome'],
    frameworks: ['mocha', 'chai'],
    basePath: __dirname,
    // defines app's starting point; files to load in browser
    files: [
      // 'public/bundle.js',
      './tests/**/*.spec.js'
    ],
    preprocessors: {
      // files we want to be precompiled with webpack
      './app/origin.jsx': ['webpack', 'babel'],
      './tests/**/*.spec.js': ['webpack']
    },
    reporters: ['mocha'],
    webpack: webpack,
    webpackServer: {
      noInfo: true
    },
    // plugins: [
    //   'karma-webpack'
    // ]
  });
};
