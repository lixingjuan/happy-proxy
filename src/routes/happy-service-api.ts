import fs from "fs";
import { queryPathMap, queryPathDetail } from "../utils/fs-utils";
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
const queryAllApi = async (filePath?: string) => {
  try {
    if (filePath) {
      const data = await queryPathDetail(filePath);
      return {
        data,
        message: "查询成功",
        code: 1,
      };
    }

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
      data: newPathToFileMap,
      message: "删除成功",
      code: 1,
    };
  }

  // 更新 映射文件
  fs.writeFileSync(pathToFileMapPath, "{}");
  return {
    data: {},
    message: "删除全部成功",
    code: 1,
  };
};

/** 本服务自己的接口 */
const happyServiceApi = (req: any) => {
  const { method, url, body, querystring } = req;

  const { query } = queryString.parseUrl(url);

  /** 要查询的文件路径 */
  const filePath = query?.filePath || "";
  /** 要删除/增加的url路径 */
  const urlPath = query?.urlPath || "";

  switch (method) {
    case "GET":
      return queryAllApi(filePath as string);
    case "DELETE":
      return deleteOneOrAllApi(urlPath as string);
    case "POST":
      console.warn("add item");
      return addItem(urlPath as string, body);
    default:
      return queryPathMap();
  }
};

export default happyServiceApi;
