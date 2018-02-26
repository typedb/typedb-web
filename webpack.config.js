const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const autoprefixer = require('autoprefixer');

const htmlWebpackPlugin = new HtmlWebpackPlugin({ template: 'index.html' });
const definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.NODE_ENV === 'development' || 'true')),
  'process.env': {
    BROWSER: true,
  }
});

const lodashModulePlugin = new LodashModuleReplacementPlugin({
  shorthands: true,
  paths: true,
});
module.exports = {
  context: path.join(__dirname, 'src'),
  entry: './index',
  output: {
    filename: '[hash].js',
  },
  plugins: [
    lodashModulePlugin,
    htmlWebpackPlugin, 
    definePlugin
  ],
  resolve: {
    modules: ['node_modules', path.join(__dirname, 'src')]
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(png|svg)$/,
        loader: 'url-loader?limit=100000',        
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true,
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: () => [
                autoprefixer(['last 2 versions']),
              ],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }
          },
        ],
      },
      { test: /\.html$/, loader: 'html-loader' }
    ]
  },
  devServer: {
    historyApiFallback: true,
    port: 3000,
    disableHostCheck: true,    
  }
};
