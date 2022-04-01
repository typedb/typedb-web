const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "pages/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: '/',
    filename: "bundle.[hash].js",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "pages/index.html",
      favicon: "common/assets/logos/favicon.png",
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "assets/images/vaticle-preview.png", to: "vaticle-preview.png" },
        { from: "assets/files/Accelerating_Drug_Discovery_with_a_TypeDB_Knowledge_Graph.pdf", to: "files/Accelerating_Drug_Discovery_with_a_TypeDB_Knowledge_Graph.pdf" },
      ],
    }),
  ],
  resolve: {
    modules: [__dirname, "node_modules"],
    extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.s?css$/,
        use: [
          { loader: "style-loader" }, "css-loader", "sass-loader"],
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpe?g|gif|otf)$/,
        use: 'file-loader',
      },
    ],
  },
};
