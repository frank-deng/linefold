const path = require('path');
const nodeExternals = require('webpack-node-externals');
const RewirePlugin = require('rewire-webpack');
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
  externals: [nodeExternals()],
  plugins:[
    RewirePlugin
  ]
};
