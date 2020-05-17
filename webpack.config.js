const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: {
    main: './src/pages/main/index.js',
    saved_news: './src/pages/saved_news/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'pages/[name]/[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: { loader: "babel-loader" },
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: [
          { loader: 'style-loader' },
          { loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '../../' }
          },
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|ico|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[hash].[ext]',
              esModule: false
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {}
          },
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=./vendor/fonts/[name].[ext]&publicPath=../../'
      }
    ]
  },
  plugins:
    [
      new MiniCssExtractPlugin({
        filename: 'pages/[name]/[name].[contenthash].css'
      }),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: ['default'],
        },
        canPrint: true
      }),
      new HtmlWebpackPlugin({
        inject: false,
        template: './src/pages/index.html',
        filename: 'index.html'
      }),
      new HtmlWebpackPlugin({
        inject: false,
        template: './src/pages/saved_news/index.html',
        filename: './saved_news/index.html'
      }),
      new WebpackMd5Hash()
    ]
};

