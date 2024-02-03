import path from "path";

import merge from "webpack-merge";

import common from "./common.config.js";

const config = merge(common, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    static: path.resolve("./dist"),
    historyApiFallback: true,
  },
});

module.exports = config;
