const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    overlay: true,
    port: 8081,
    hot: true,
  },
  resolve: {
    alias: {
      config$: path.resolve(__dirname, 'config.dev.js'),
    },
  },
});
