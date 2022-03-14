import jsonfile from "jsonfile";
import fs from "fs";
import { toArray } from "json-function";

import { queryPathMapSync } from "../../utils/fs-utils";

/** query all path map */
export const queryAllRecordApi = async () => {
  try {
    const localMap = queryPathMapSync();
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
    const res = queryPathMapSync();
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
