import jsonfile from "jsonfile";
import { toArray } from "json-function";

import { queryPathMap } from "../../utils/fs-utils";

/** query all path map */
export const queryAllRecordApi = async () => {
  try {
    const localMap = await queryPathMap();
    const data = toArray(localMap, { key: "hash" });
    return {
      data: data,
      message: "查询成功",
      code: 1,
    };
  } catch (error) {
    return {
      data: {},
      message: "查询失败",
      code: -1,
    };
  }
};

/** query all path map */
export const queryRecordDetailApi = async (hash: string) => {
  try {
    const res = await queryPathMap();
    const filePath = res[hash].filePath;
    const data = jsonfile.readFileSync(filePath);
    return {
      data: data,
      message: "查询成功",
      code: 1,
    };
  } catch (error) {
    return {
      data: {},
      message: "查询失败",
      code: -1,
    };
  }
};
