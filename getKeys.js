const axios = require("axios");

const getKeys = (code) => {
  return axios
    .get(
      `https://api.weixin.qq.com/sns/jscode2session?appid=wxf3413e6ae1f35286&secret=696d3af35bda905f401160c4e3fad327&js_code=${code}`
    )
    .then((result) => {
      console.log(result.data);
      return result.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = getKeys;
