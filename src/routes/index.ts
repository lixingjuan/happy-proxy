import Koa from "koa";
import _ from "lodash";
import axios from "axios";
import fs from "fs";
import fsPromises from "fs/promises";
import join from "url-join";

import log from "../utils/log";
import configs from "../../settings";
import { pathToFileMapPath, responseBasePath } from "../utils/constant";

const { targetBaseUrl, cookie } = configs;

/**
 * @desc
 * 1. 根据请求路由去寻找对应的文件路径
 */
const queryLocalJson = async (routePath: string) => {
  const pathToFileStr = fs.readFileSync(pathToFileMapPath, "utf-8");
  const pathToFileMap = pathToFileStr ? JSON.parse(pathToFileStr) : {};

  const responseFilePath = pathToFileMap[routePath];

  if (!responseFilePath) {
    return "";
  }

  return fsPromises
    .readFile(responseFilePath, "utf8")
    .then((res) => JSON.parse(res));
};

/**
 * @desc 保存接口返回数据到本地，并更新映射文件
 * @param {string} path 请求完整接口
 * @param {any} resData 接口响应数据
 */
const saveResponseToLocal = (path: string, resData: any) => {
  let filePath = "";
  let newPathToFileMap = {};
  try {
    // 去除 / . : 等符号后做为文件名称
    const fileName = `${(path || "").replace(/[\/|\.|:]/g, "")}.json`;

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
  } catch (error) {
    log.error(
      `函数saveResponseToLocal(1)， 错误原因:  ${(error as Error).message}`
    );
  }

  try {
    // 接口响应数据
    const resStr = JSON.stringify(_.cloneDeep(resData), undefined, 2);
    // 写入接口响应
    fs.writeFileSync(filePath, resStr);
    // 更新 映射文件
    fs.writeFileSync(
      pathToFileMapPath,
      JSON.stringify(newPathToFileMap, undefined, 4)
    );
  } catch (error) {
    log.error(
      `函数saveResponseToLocal(2)，
      错误原因: ${(error as Error).message},
      接口返回: ${resData}`
    );
  }
};
const demo = (url: string) => {
  console.log(1, url);
};

/**
 * @desc 向真正的接口发起请求
 * @param {string} path
 * @param {Koa} method
 */
const queryRealData = async (props: {
  url: string;
  method: any;
  headers: any;
}): Promise<any> => {
  const { url, method, headers } = props;
  const queryParams = {
    url,
    method,
    headers: {
      cookie,
    },
  };

  return axios(queryParams)
    .then((res) => {
      saveResponseToLocal(url, res.data);
      return res;
    })
    .catch((err) => {
      log.error(`请求真实接口出错, ${err.message}}`);
      return err;
    });
};

/**
 * @desc 路由
 * 1. 收到请求
 * 2. 拼接完整的请求地址
 * 3. 查到本地的映射文件, 根据请求地址判断找到对应的response json文件存储地址
 *    3-1. 若本地有该文件&该文件内容非空，则读取该内容后返回
 *    3-2. 否则，发起真正的请求，请求成功后
 *         3-2-1. 在本地映射文件新增该条pathMap
 *         3-2-2. 将响应内容写入该地址
 */
const routeMiddleWare = async (ctx: Koa.Context) => {
  log(`\n\n--------------------------🌧🌧🌧-----------------------------`);

  const { url, method, headers } = ctx.request;

  log(`header: ${JSON.stringify(headers, undefined, 4)}`);

  const completeUrl = join(targetBaseUrl, url);

  return queryLocalJson(completeUrl)
    .then((localContent) => {
      if (!localContent) {
        throw new Error("local is empty!");
      }

      log(`🌼响应来自本地, URL 👉🏻 ${url}🌼`);
      return localContent;
    })
    .catch((err) => queryRealData({ method, url: completeUrl, headers }))
    .then((res: any) => {
      console.log(2);
      ctx.body = res;
    });
};

export default routeMiddleWare;
