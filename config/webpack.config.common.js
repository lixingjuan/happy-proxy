const path = require("path");
// 构造函数或者类，大写命名
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

// const toml = require("toml");

module.exports = {
  entry: {
    background: {
      import: ["./background/forward.js", "./background/index.js"],
      filename: "background.js",
    },

    popupLib: {
      import: ["./background/forward.js", "./background/index.js"],
      filename: "popupLib.js",
    },

    // popup: {
    //   import: [
    //     "./src/popup/lib/monaco-editor/min/vs/loader.js",
    //     "./src/popup/lib/strip-json-comments.js",
    //     "./src/popup/js/constants.js",
    //     "./src/popup/js/editor.js",
    //   ],
    //   filename: "popup.js",
    // },
  },

  output: {
    path: path.resolve(__dirname, "../dist"),
    clean: true,
    assetModuleFilename: "images/[contenthash][ext]",
  },

  plugins: [
    // new HtmlWebpackPlugin({
    //   title: "happy-req",
    //   template: "./popup/index.html",
    //   chunks: ["popup"],
    //   filename: "popup.html",
    // }),

    new MiniCssExtractPlugin({
      filename: "index.css",
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public/*",
          to: "[name][ext]",
        },
        {
          from: "popup/**/*",
          to: "[name][ext]",
        },
      ],
    }),
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
