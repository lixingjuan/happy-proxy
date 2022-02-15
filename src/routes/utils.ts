import fs from "fs";
import { pathToFileMapPath, responseBasePath } from "../utils/constant";
import cloneDeep from "lodash/cloneDeep";
import dayjs from "dayjs";

/**
 * @desc 保存接口返回数据到本地，并更新映射文件
 * @param {string} path 请求完整接口
 * @param {any} resData 接口响应数据
 */
const saveResponseToLocal = async (path: string, response: any) => {
  const { data: responseData } = response;
  let filePath = "";
  let newPathToFileMap = {};
  try {
    const fileName = `${dayjs().format("YYYY-MM-DD-hh-mm-ss")}.json`;
    console.log({ fileName });

    // 文件存储路径
    filePath = `${responseBasePath}/${fileName}`;

    const localPathToFileMap = fs.readFileSync(pathToFileMapPath, "utf-8")
      ? JSON.parse(fs.readFileSync(pathToFileMapPath, "utf-8"))
      : {};

    // 新的path to file 映射文件内容
    newPathToFileMap = {
      ...localPathToFileMap,
      [path]: filePath,
    };
  } catch (error: any) {
    console.error(`1.保存response到本地出错\nError: ${error?.message}`);
  }

  try {
    // 接口响应数据
    const resStr = JSON.stringify(cloneDeep(responseData), undefined, 2);
    // 写入接口响应
    fs.writeFileSync(filePath, resStr);
    // 更新 映射文件
    fs.writeFileSync(
      pathToFileMapPath,
      JSON.stringify(newPathToFileMap, undefined, 2)
    );
  } catch (error: any) {
    console.error(`2. 保存response到本地出错\nError: ${error?.message}`);
  }
};

export { saveResponseToLocal };
