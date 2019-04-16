const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const autoprefixer = require('autoprefixer');

const stylesheetsPlugin = new ExtractTextPlugin('bundle.css');
const htmlWebpackPlugin = new HtmlWebpackPlugin({ template: 'index.html' });
const definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.NODE_ENV === 'development' || 'false')),
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
    BROWSER: false,
  }
});
const uglifyPlugin = new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } });

const lodashModulePlugin = new LodashModuleReplacementPlugin({
  shorthands: true,
  paths: true,
});

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: './index',
  output: {
    publicPath: '/',
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  plugins: [
    lodashModulePlugin,
    stylesheetsPlugin,
   htmlWebpackPlugin,
    definePlugin,
    uglifyPlugin,
    new CopyWebpackPlugin([
      {
        context: path.join(__dirname, 'src'),
        from: './sitemap.xml',
        to: path.join(__dirname, 'dist'),
      }
    ])
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
        use: stylesheetsPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  autoprefixer(['last 2 versions']),
                ],
              },
            },
            'sass-loader',
          ]
        })
      },
      { test: /\.html$/, loader: 'html-loader' }
    ]
  }
};
