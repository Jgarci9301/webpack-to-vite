const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js', //this is where the program starts
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js', //[name] and [contenthash] are placeholders
    clean: true, // Cleans old files in the dist folder
  },
  mode: 'development',
  module: {
    rules: [ 
      {//LOADER NOTES: so loaders basically tell webpack how to handle any other files besides javascript ones, and how to turn them into js modules
        test: /\.(js|jsx)$/, //match all the the js and jsx files and...
        exclude: /node_modules/,
        use: 'babel-loader', //... use the babel loader
      },
      {
        test: /\.css$/, //match all the css files and ...
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'], //... use the postcss-loader
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf|otf)$/i, //grab all the image files and...
        type: 'asset/resource', //treat them as resources, don't include them in the output folder
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], //you can do imports for these types of files without having to include the file extensions
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin(), //this seperates css from the bundles, provides better performance links them with html later, allows caching better loading
  ],
  devServer: {
    static: './dist', //this is the directory from where the bundled files will be served from
    hot: true, //hot reload
    port: 3000, //this is the port that where the server will be running on
  }
};
