import { fsyncSync, readFile } from "fs";
import { cwd } from "process";
import pathMap from "./pathMap";

/**
 * @desc
 * 1. 根据请求路由去寻找对应的文件路径
 */
export const queryLocalJson = (routePath: string) => {
  console.log({ routePath });
  const filePath = pathMap[routePath];
  const completePath = `${cwd()}${filePath}`;

  readFile(completePath, (error, res) => {
    console.log(res.toString());
  });
};

// module.exports = {
//   queryLocalJson,
// };
