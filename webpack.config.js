var path = require('path');
module.exports = {
  mode: 'production',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname),
    filename: 'linefold.js',
    library:'linefold',
    libraryExport:'default',
    libraryTarget:'umd'
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: "babel-loader"
        },
        exclude: /node_modules/
      },
    ],
  }
};
