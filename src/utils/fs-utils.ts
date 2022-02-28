import fsPromises from "fs/promises";
import { pathToFileMapPath, rootPath } from "../utils/constant";
import join from "url-join";

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

/** 根据文件地址获取数据 */
export const queryPathDetail = (filePath: string) => {
  const completeFilePath = join(rootPath, filePath);

  return fsPromises
    .readFile(completeFilePath, "utf-8")
    .then((res) => JSON.parse(res))
    .catch((err) => {
      console.log(err);
      return {};
    });
};

/** 删除本地映射文件内容 */
export const cleanPathMap = () =>
  fsPromises.writeFile(pathToFileMapPath, "{}", "utf-8");
