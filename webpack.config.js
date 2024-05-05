const path = require('path');
const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: path.join(__dirname, '/src/js/', 'index.js'),
    login: path.join(__dirname, '/src/js/', 'login.js'),
    goodsDetails: path.join(__dirname, '/src/js/', 'goodsDetails.js'),
  },
  watch: true,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "js/[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /(\.png|\.jpe?g|\.gif|\.svg|\.eot|\.ttf|\.wot|\.ttf2|\.woff|\.woff2)$/,
        type: "asset/resource",
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/'
            }
          }
        ]
      },
    ]
  },
  resolve: {
    extensions: ['.json', '.js',]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/pages/index.html',
      chunks: ['index'],
      inject: true,
    }),
    new HtmlWebpackPlugin({
      filename: 'login.html',
      template: './src/pages/login.html',
      chunks: ['login'],
      inject: true,
    }),
    new HtmlWebpackPlugin({
      filename: 'goodsDetails.html',
      template: './src/pages/goodsDetails.html',
      chunks: ['goodsDetails'],
      inject: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'),
    host: 'localhost',
    port: 8080,
    open: true,
    hot: true,
  }
};