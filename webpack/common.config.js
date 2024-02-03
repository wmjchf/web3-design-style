import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

/** @type {import('webpack').Configuration} */
const config = {
  entry: path.resolve("src/index.tsx"),
  output: {
    filename: "js/[name].[contenthash:8].js",
    path: path.resolve("dist"),
    publicPath: "/",
  },
  resolve: {
    extensions: [".ts", ".tsx", "..."],
    alias: {
      "@": path.resolve("src"),
    },
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.css/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
          },
        ],
      },
      {
        test: /\.less/,

        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[path]__[name]__[local]",
              },
            },
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|docx)$/,
        use: {
          loader: "file-loader",
          options: {
            esModule: false,
            outputPath: "images",
          },
        },
        type: "javascript/auto",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Dapp",
      template: path.resolve("public/index.html"),
      favicon: path.resolve("public/favicon.ico"),
    }),
    new MiniCssExtractPlugin({
      filename: "css/[contenthash].[name].css",
    }),
    new CleanWebpackPlugin(),
  ],
};

module.exports = config;
