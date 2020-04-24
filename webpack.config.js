const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "/src/index.js"),
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "[name]-[hash].min.js",
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: "babel-loader" },
      { test: /\.(css)$/, use: ["style-loader", "css-loader"] },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|pdf|ico)$/,
        use: "file-loader",
      },
    ],
  },
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "/src/index.html"),
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "disabled",
      generateStatsFile: true,
      statsOptions: { source: true },
    }),
    new MiniCssExtractPlugin(),
    new CopyWebpackPlugin([
      { from: path.join(__dirname, "src/images"), to: "assets/images" },
    ]),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
