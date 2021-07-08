var path = require('path');
var nodeExternals = require('webpack-node-externals');
module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname),
    filename: 'linefold.test.js',
    library: 'linefold',
    libraryTarget: 'umd'
  },
  target: 'node',
  externals: [nodeExternals()]
};
