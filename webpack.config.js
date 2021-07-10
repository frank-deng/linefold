var path = require('path');
module.exports = {
  mode: 'production',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname),
    filename: 'linefold.js',
    library:{
      name:'linefold',
      type:'umd'
    }
  },
  devServer: {
    contentBase: path.join(__dirname, 'test'),
    compress: true,
    port: 9000,
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
