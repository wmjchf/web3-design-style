import merge from "webpack-merge";

import common from "./common.config.js";

const config = merge(common, {
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: {
          name: `vendors`,
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          filename: "js/common/[name].[contenthash].js",
        },
      },
    },
  },
});

module.exports = config;
