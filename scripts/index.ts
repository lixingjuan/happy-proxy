const chalk = require("chalk");
const fsPromises = require("fs/promises");

/** response  */
fsPromises
  .access("response")
  .then(() => {
    console.log("SUCCESS", "本地存在response文件夹");
  })
  .catch(() => fsPromises.mkdir("response"));

/** 接口字符串-接口response 映射文件 */
fsPromises
  .access("page/map.json")
  .catch(() => fsPromises.writeFile("page/map.json", JSON.stringify({})));
