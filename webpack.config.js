var path = require('path');
module.exports = {
  mode: 'production',
  entry: './src/linefold.js',
  output: {
    path: path.resolve(__dirname,'dist'),
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
