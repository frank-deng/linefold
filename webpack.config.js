var path = require('path');
module.exports = {
  mode: 'production',
  entry: './src/linefold.js',
  output: {
    path: path.resolve(__dirname,'dist'),
    publicPath: "/dist/",
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
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        },
        exclude: /node_modules/
      },
    ],
  },
  devServer:{
    static:__dirname,
    liveReload:false,
    open:true,
    port:8082
  }
};
