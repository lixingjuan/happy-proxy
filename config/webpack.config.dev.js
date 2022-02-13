module.exports = {
  output: {
    filename: "scripts/[name].[contenthash].js",
  },

  mode: "development",

  devtool: "inline-source-map",

  devServer: {
    static: "../dist",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        /* !! node_modules 中的js文件不使用babel-loader 进行编译 */
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [["@babel/plugin-transform-runtime"]],
          },
        },
      },
    ],
  },
};
