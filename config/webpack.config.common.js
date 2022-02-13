const path = require("path");
// 构造函数或者类，大写命名
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

// const toml = require("toml");

module.exports = {
  entry: {
    like_button: {
      import: ["./like_button.js"],
      filename: "like_button.js",
    },
  },

  output: {
    path: path.resolve(__dirname, "../dist"),
    clean: true,
    assetModuleFilename: "images/[contenthash][ext]",
  },

  plugins: [
    // new HtmlWebpackPlugin({
    //   title: "happy-req",
    //   template: "./public/index.html",
    //   chunks: ["popup"],
    //   filename: "popup.html",
    // }),
    // new MiniCssExtractPlugin({
    //   filename: "index.css",
    // }),
  ],

  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },

      {
        test: /\.(jpg|png)$/,
        type: "asset/resource",
        generator: {
          filename: "images/lxj.[name][ext]",
        },
      },

      // {
      //   test: /\.toml$/,
      //   type: "json",
      //   parser: {
      //     parse: toml.parse,
      //   },
      //   generator: {
      //     filename: "images/[name][ext]",
      //   },
      // },
    ],
  },

  optimization: {
    splitChunks: {
      // 将node_modules 中的文件都打包到一个文件中
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
};
