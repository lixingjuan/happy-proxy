import jsonfile from "jsonfile";
import { pathToFileMapPath } from "../utils/constant";
import { queryPathMapSync } from "../utils/fs-utils";

type RecordInfo = {
  url: string;
  filePath: string;
  tags: string[] | undefined;
  createTime: string;
};

/**
 * @desc 保存接口返回数据到本地，并更新映射文件
 * @param {string} path 请求完整接口
 * @param {any} resData 接口响应数据
 */
const saveResponseToLocal = (
  record: Record<string, RecordInfo>,
  response: any
) => {
  const { data: responseData } = response;

  // 更新 映射文件
  try {
    const newMap = {
      ...queryPathMapSync(),
      ...record,
    };

    jsonfile.writeFileSync(pathToFileMapPath, newMap, { spaces: 2 });
  } catch (error: any) {
    console.error(`1.保存response到本地出错\nError: ${error?.message}`);
  }

  // 更新本地数据
  try {
    const targetLocalResponseFilePath = Object.values(record)?.[0]?.filePath;

    jsonfile.writeFileSync(targetLocalResponseFilePath, responseData, {
      spaces: 2,
    });
  } catch (error: any) {
    console.error(`2.保存response到本地出错\nError: ${error?.message}`);
  }
};

export { saveResponseToLocal };
