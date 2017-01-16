'use strict';

const webpack = require('webpack');

module.exports = {
  entry: './app/origin.jsx',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  context: __dirname,
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
};
