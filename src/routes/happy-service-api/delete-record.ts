import omit from "lodash/omit";
import jsonfile from "jsonfile";
import { pathToFileMapPath } from "../../utils/constant";

/** 删除全部，制作备份文件 */
const deleteAllRecord = async () => {
  // 更新 映射文件
  jsonfile.writeFileSync(pathToFileMapPath, "{}");

  return {
    data: {},
    message: "删除全部成功",
    code: 1,
  };
};

const deleteOneRecord = async (hash: string) => {
  if (!hash) {
    return {
      message: "删除失败, hash不能为空",
      code: -1,
    };
  }
  const localPathToFileMap = jsonfile.readFileSync(pathToFileMapPath);

  // 新的path to file 映射文件内容
  const newPathToFileMap = omit(localPathToFileMap, hash as string);

  // 更新 映射文件
  jsonfile.writeFileSync(pathToFileMapPath, newPathToFileMap);

  return {
    data: JSON.stringify(newPathToFileMap),
    message: "删除成功",
    code: 1,
  };
};

export { deleteOneRecord, deleteAllRecord };
