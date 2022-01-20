const chalk = require("chalk");
const env = require("dotenv/config");
const fsPromises = require("fs/promises");

const { exit } = require("process");

const { cookie = "", targetBaseUrl = "" } = process.env;

if (!cookie) {
  console.log(
    chalk.hex("#DEADED").bold(`
\n\n***********************************************************\n
*    请到根目录下文件 .env 中配置 cookie, 否则项目无法使用    *\n
***************************************************************\n
    `)
  );
  exit(1);
}

if (!targetBaseUrl) {
  console.log(
    chalk.hex("#DEADED").bold(`
\n\n***********************************************************\n
*    请到根目录下文件 .env 中配置 targetBaseUrl, 否则项目无法使用   *\n
***************************************************************\n
`)
  );
  exit(1);
}

/**
 * 依次检查以下 文件/文件夹是否存在，若不存在，则创建
 *    logs
 *    response
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
  .catch(() => fsPromises.mkdir("path_map"))
  .then(() => fsPromises.access("path_map/index.json"))
  .then(() => {
    console.log("SUCCESS", "本地存在path_map文件");
  })
  .catch(() => fsPromises.writeFile("path_map/index.json", JSON.stringify({})))
  .then(() => {
    console.log("SUCCESS", "path_map/index.json文件创建成功");
  });
