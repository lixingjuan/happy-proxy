import chalk from "chalk";
import Koa from "koa";
import fs from "fs";
import _ from "lodash";
import fsPromises from "fs/promises";
import axios from "axios";
import join from "url-join";

import log from "../utils/log";
import { pathToFileMapPath, responseBasePath } from "../utils/constant";

const { cookie = "", targetBaseUrl = "" } = process.env;

/**
 * 根据请求路由去寻找对应的文件路径
 */
const queryLocalJson = (routePath: string) => {
  const pathToFileStr = fs.readFileSync(pathToFileMapPath, "utf-8");
  const pathToFileMap = pathToFileStr ? JSON.parse(pathToFileStr) : {};

  if (!Object.keys(pathToFileMap).length) {
    return Promise.reject("empty");
  }

  const responseFilePath = pathToFileMap[routePath];

  if (!responseFilePath) {
    return Promise.reject("empty");
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
const saveResponseToLocal = (path: string, response: any) => {
  const { data: responseData } = response;
  let filePath = "";
  let newPathToFileMap = {};
  try {
    // 去除 / . : 等符号后做为文件名称
    const fileName = `${(path || "").replace(/[\/|\.|:]/g, "__")}.json`;

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
      `保存response到本地出错 \n 错误原因: ${(error as Error).message}`
    );
  }

  try {
    // 接口响应数据
    const resStr = JSON.stringify(_.cloneDeep(responseData), undefined, 2);
    // 写入接口响应
    fs.writeFileSync(filePath, resStr);
    // 更新 映射文件
    fs.writeFileSync(
      pathToFileMapPath,
      JSON.stringify(newPathToFileMap, undefined, 2)
    );
  } catch (error) {
    log.error(
      `保存response到本地出错 \n 错误原因: ${(error as Error).message}`
    );
  }
};

/**
 * @desc 向真正的接口发起请求
 * @param {string} path
 * @param {Koa} method
 */
const queryRealData = (props: {
  url: string;
  method: any;
  headers: any;
  body: any;
}): Promise<any> => {
  const { url, method, headers, body } = props;
  const queryParams = {
    url,
    method,
    data: body,
    headers: {
      cookie,
    },
  };

  return axios(queryParams)
    .then((res) => {
      // TODO 这里的成功条件需要根据自己项目实际情况自定义 仅请求成功才将结果写入本地
      const isRequestOk = res.status === 200 && res.data.code > 0;

      if (!isRequestOk) {
        const errMsg = `请求出错, \n 错误原因=> ${res.data.message} \n URL=> ${url}`;
        throw Error(errMsg);
      }

      saveResponseToLocal(url, res);
      return res.data;
    })
    .catch((err) => {
      const errMsg = `请求出错, \n 错误原因=> ${err.message} \n URL=> ${url}`;
      log.error(errMsg);
      return Promise.reject(errMsg);
    });
};

const checkEnv = () => {
  if (!cookie || !targetBaseUrl) {
    console.log(
      chalk
        .hex("#DEADED")
        .bold("请到根目录下文件 .env 中配置 cookie & targetBaseUrl")
    );
    return false;
  }
  return true;
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
  if (!checkEnv()) {
    return;
  }

  log(`\n\n--------------------------🌧🌧🌧-----------------------------`);

  const { url, method, headers, body } = ctx.request;

  const completeUrl = join(targetBaseUrl, url);

  return queryLocalJson(completeUrl)
    .then((localContent) => (ctx.body = localContent))
    .catch((err) => queryRealData({ method, url: completeUrl, headers, body }))
    .then((res: any) => {
      ctx.body = res;
    });
};

export default routeMiddleWare;
