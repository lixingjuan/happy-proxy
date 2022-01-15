const fs = require("fs");
const fsPromises = require("fs/promises");

const initSettingStr = `// TODO 以下两个配置暂时无法从转发请求获取, 需手动配置
const configs = {
  cookie: "",
  targetBaseUrl: ""
};

export default configs;
`;

/**
 * 依次检查以下 文件/文件夹是否存在，若不存在，则创建
 *    response
 *    logs
 *    settings/index.ts
 *    path_map/index.ts
 */

/** logs */
fsPromises
  .access("logs")
  .then(() => {
    console.log("SUCCESS", "本地存在logs文件夹");
  })
  .catch(() => fsPromises.mkdir("logs"));

/** response  */
fsPromises
  .access("response")
  .then(() => {
    console.log("SUCCESS", "本地存在response文件夹");
  })
  .catch(() => fsPromises.mkdir("response"));

/** path_map  */
fsPromises
  .access("path_map")
  .catch(() => {
    return fsPromises.mkdir("path_map");
  })
  .then(() => {
    return fsPromises.access("path_map/index.json");
  })
  .then(() => {
    console.log("SUCCESS", "本地存在path_map文件");
  })
  .catch(() => fsPromises.writeFile("path_map/index.json", JSON.stringify({})))
  .then(() => {
    console.log("SUCCESS", "path_map/index.json文件创建成功");
  });

/** settings/index.ts */
fsPromises
  .access("settings")
  .catch(() => fs.mkdirSync("settings"))
  .then(() => {
    return fsPromises.access("settings/index.ts");
  })
  .catch(() => fsPromises.writeFile("settings/index.ts", initSettingStr));
