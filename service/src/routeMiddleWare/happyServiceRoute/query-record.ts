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

/** query detail */
export const queryRecordDetailApi = async (hash: string) => {
  const res = queryPathMapSync();
  const { filePath, url, method, payload } = res[hash];
  try {
    const data = jsonfile.readFileSync(filePath);
    return {
      data: {
        url,
        method,
        payload,
        data,
      },
      message: "查询成功",
      code: 1,
    };
  } catch (error) {
    return {
      data: {
        url,
        method,
        payload,
        data: {},
      },
      message: "查询失败",
      code: -1,
    };
  }
};

/** update detail */
export const updateRecordDetailApi = async (hash: string, newResponse: any) => {
  try {
    const res = queryPathMapSync();

    const filePath = res[hash]?.filePath;

    if (!filePath) {
      throw new Error("本地没有该文件");
    }

    jsonfile.writeFileSync(filePath, newResponse, { spaces: 2 });

    return {
      data: newResponse,
      message: "更新成功",
      code: 1,
    };
  } catch (error: any) {
    return {
      data: {},
      message: `更新失败, ${error.message}`,
      code: -1,
    };
  }
};
