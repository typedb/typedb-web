const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.config.js");

module.exports = merge(common, {
  mode: "development",
  devtool: 'inline-source-map',
  plugins: [
    new webpack.NormalModuleReplacementPlugin(
      /config\/config\.ts/,
      "./config.serve.ts"
    )
  ],
  devServer: {
    port: 4200,
    historyApiFallback: true,
  },
  watchOptions: {
    ignored: /node_modules/
  },
});
