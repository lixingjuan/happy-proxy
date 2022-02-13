const commonConfig = require("./webpack.config.common");
const developmentConfig = require("./webpack.config.dev");
const productionConfig = require("./webpack.config.prod");

const { merge } = require("webpack-merge");

module.exports = (env) => {
  switch (true) {
    case env.development:
      return merge(commonConfig, developmentConfig);
    case env.production:
      return merge(commonConfig, productionConfig);
    default:
      return new Error("No matching configuation was found");
  }
};
