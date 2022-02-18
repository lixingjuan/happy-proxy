import fs from "fs";
import { queryPathMap } from "../utils/fs-utils";
import { saveResponseToLocal } from "./utils";
import queryString from "query-string";
import omit from "lodash/omit";
import { pathToFileMapPath } from "../utils/constant";

/** add one mock item */
const addItem = async (targetKey: string, body: any) => {
  const { url, mockBody } = body;
  try {
    saveResponseToLocal(url, { data: mockBody });
    return Promise.resolve({
      code: 1,
      message: "successfully",
      data: null,
    });
  } catch (error) {
    return Promise.reject({
      code: -1,
      message: "error",
      data: null,
    });
  }
};

/** query all path map */
const getAllApi = async () => {
  try {
    const data = await queryPathMap();
    return {
      data,
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
const deleteOneOrAllApi = async (toDeleteKey: string) => {
  if (toDeleteKey) {
    // 删除一条

    const localPathToFileMap = fs.readFileSync(pathToFileMapPath, "utf-8")
      ? JSON.parse(fs.readFileSync(pathToFileMapPath, "utf-8"))
      : {};

    // 新的path to file 映射文件内容
    const newPathToFileMap = omit(localPathToFileMap, toDeleteKey as string);
    // 更新 映射文件
    fs.writeFileSync(
      pathToFileMapPath,
      JSON.stringify(newPathToFileMap, undefined, 2)
    );
    return {
      data: {},
      message: "删除成功",
      code: 1,
    };
  } else {
    // 更新 映射文件
    fs.writeFileSync(pathToFileMapPath, "{}");
    return {
      data: {},
      message: "删除全部成功",
      code: 1,
    };
  }
};

/** 本服务自己的接口 */
const happyServiceApi = (req: any) => {
  const { method, url, body, querystring } = req;

  const { query } = queryString.parseUrl(url);
  const targetUrl = query.url || "";

  switch (method) {
    case "GET":
      return getAllApi();
    case "DELETE":
      return deleteOneOrAllApi(targetUrl as string);
    case "POST":
      console.warn("add item");
      return addItem(targetUrl as string, body);
    default:
      return queryPathMap();
  }
};

export default happyServiceApi;
