import jsonfile from "jsonfile";
import { pathToFileMapPath } from "../utils/constant";

/**
 * @desc 保存接口返回数据到本地，并更新映射文件
 * @param {string} path 请求完整接口
 * @param {any} resData 接口响应数据
 */
const saveResponseToLocal = (
  record: Record<
    string,
    {
      url: string;
      filePath: string;
      tags: string[] | undefined;
    }
  >,
  response: any
) => {
  const { data: responseData } = response;

  let filePath = Object.values(record)?.[0]?.filePath;

  try {
    const localPathToFileMap = jsonfile.readFileSync(pathToFileMapPath) || {};

    // 更新 映射文件
    jsonfile.writeFileSync(
      pathToFileMapPath,
      {
        ...localPathToFileMap,
        ...record,
      },
      { spaces: 2 }
    );

    // 更新本地数据
    jsonfile.writeFileSync(filePath, responseData, { spaces: 2 });
  } catch (error: any) {
    console.error(`2. 保存response到本地出错\nError: ${error?.message}`);
  }
};

export { saveResponseToLocal };
