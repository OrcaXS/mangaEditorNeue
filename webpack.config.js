/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
/* eslint-enable @typescript-eslint/no-var-requires */

const dev = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './src/index',
  devtool: 'source-map',
  mode: dev ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
          {
            loader: 'linaria/loader',
            options: { sourceMap: dev },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: dev, importLoaders: 1 },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src/'),
      'react-dom': '@hot-loader/react-dom',
    },
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    port: 9000,
    host: 'localhost',
    hotOnly: true,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: 'styles.css' }),
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv(),
  ],
};
