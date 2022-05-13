import fsPromises from "fs/promises";
import { pathToFileMapPath, rootPath } from "../constant";
import join from "url-join";
import jsonfile from "jsonfile";

/** 获取本地映射文件内容 */
export const queryPathMap = () => {
  return jsonfile.readFile(pathToFileMapPath) || {};
};

/** 同步获取本地映射文件内容 */
export const queryPathMapSync = () => {
  return jsonfile.readFileSync(pathToFileMapPath) || {};
};

/** 更新本地映射文件内容 */
export const updateLocalPathMap = (
  newMap: Map<string, { url: string; filePath: string; tags: string[] }>
) => {
  jsonfile.writeFileSync(pathToFileMapPath, newMap, { spaces: 2 });
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
