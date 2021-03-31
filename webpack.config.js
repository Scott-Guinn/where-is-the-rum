const path = require('path');

// const HtmlWebPackPlugin = require("html-webpack-plugin");
// const htmlPlugin = new HtmlWebPackPlugin({
//  template: "./src/index.html",
//  filename: "./index.html"
// });

module.exports = {
  entry: __dirname + '/src/index',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/public/',
    // path: __dirname + '/public'
  },
 mode: 'development',
 module: {
   rules: [
     {
       test: /\.js$/,
       exclude: /node_modules/,
       use: {
         loader: "babel-loader"
       }
     },
     {
       test: /\.css$/,
       use: ["style-loader", "css-loader"]
     }
   ]
 },
//  plugins: [htmlPlugin]
};