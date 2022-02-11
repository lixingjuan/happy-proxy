import fsPromises from "fs/promises";
import { pathToFileMapPath } from "../utils/constant";

/** 获取本地映射文件内容 */
export const queryPathMap = () => {
  return fsPromises
    .readFile(pathToFileMapPath, "utf-8")
    .then((res) => JSON.parse(res))
    .catch((err) => {
      console.log(err);
      return {};
    });
};

/** 删除本地映射文件内容 */
export const cleanPathMap = () =>
  fsPromises.writeFile(pathToFileMapPath, "{}", "utf-8");
