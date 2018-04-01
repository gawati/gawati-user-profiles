const path = require('path');

module.exports = {
  entry: './client/src/index.js',
  output: {
    path: path.join(__dirname, 'client/public'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['env', 'react-app']
      }
    }]
  }
}