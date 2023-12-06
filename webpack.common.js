//@ts-ignore
const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

dotenv.config();

const webpackConfig = {
  entry: {
    main: ['./src/js/index.tsx'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(process.cwd(), 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {},
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['url-loader'],
      },
      {
        test: /\.svg$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './configs/resources.js', to: 'configuration.js' }, //TODO: this needs to be somehow dynamic
      ],
    }),
    new HtmlWebPackPlugin({
      // title: 'ArcGIS Template Application',
      template: path.join(__dirname, 'src/index.html'),
      filename: 'index.html',
      favicon: './src/assets/favicon.ico',
      // chunksSortMode: 'none',
      // inlineSource: '.(css)$',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
      chunkFilename: '[id].css',
    }),
  ],
  resolve: {
    alias: {
      js: path.join(__dirname, 'src/js'),
      css: path.join(__dirname, 'src/css'),
      images: path.join(__dirname, 'src/images'),
    },
    modules: [
      path.resolve(__dirname, '/src'),
      path.resolve(__dirname, '/configs'),
      path.resolve(__dirname, 'node_modules/'),
    ],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.css'],
  },
};

module.exports = webpackConfig;
