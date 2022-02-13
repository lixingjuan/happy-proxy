const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = {
  output: {
    filename: "scripts/[name].[contenthash].js",
  },

  mode: "production",

  optimization: {
    minimizer: [
      new CssMinimizerWebpackPlugin({
        // filename: "styles/[contenthash].css", // !! 自定义生成的css文件位置/名称
      }),

      // ! 代码压缩
      new TerserWebpackPlugin(),
    ],
  },

  performance: {
    // false, 取消文件超大提示
    hints: false,
  },
};
