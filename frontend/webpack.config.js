const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: path.join(__dirname, '/../api/GardenThymeApi/wwwroot'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  resolve: {
    alias: {
      config$: path.resolve(__dirname, 'config.prod.js'),
    },
  },
});
