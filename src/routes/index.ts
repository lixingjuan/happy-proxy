import Koa from "koa";
import fs from "fs";
import omit from "lodash/omit";
import cloneDeep from "lodash/cloneDeep";
import axios from "axios";
import join from "url-join";
import fsPromises from "fs/promises";

import { pathToFileMapPath, responseBasePath } from "../utils/constant";

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
  } catch (error: any) {
    console.error(`1.保存response到本地出错\nError: ${error?.message}`);
  }

  try {
    // 接口响应数据
    const resStr = JSON.stringify(cloneDeep(responseData), undefined, 2);
    // 写入接口响应
    fs.writeFileSync(filePath, resStr);
    // 更新 映射文件
    fs.writeFileSync(
      pathToFileMapPath,
      JSON.stringify(newPathToFileMap, undefined, 2)
    );
  } catch (error: any) {
    console.error(`2. 保存response到本地出错\nError: ${error?.message}`);
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
    headers,
    data: body,
  };

  return axios(queryParams)
    .then((res) => {
      // TODO 这里的成功条件需要根据自己项目实际情况自定义 仅请求成功才将结果写入本地
      const isOk = res.status === 200 && res.data.code > 0;

      if (!isOk) {
        const errMsg = `请求出错, \n 错误原因=> ${res.data.message} \n URL=> ${url}`;
        throw Error(errMsg);
      }

      saveResponseToLocal(url, res);
      return res.data;
    })
    .catch((err) => {
      console.error(`网络请求出错`, `接口: ${url}`, `error: ${err.message}`);
      return Promise.reject(err.message);
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
  const { url, method, headers: reqHeaders, body } = ctx.request;
  const domain = reqHeaders["b-domain"];
  const cookie = reqHeaders["b-cookie"];
  const headers = omit({ ...reqHeaders, cookie, domain }, "host");

  const completeUrl = join(domain as string, url);

  console.log("URL:", completeUrl);

  return queryLocalJson(completeUrl)
    .then((localContent) => (ctx.body = localContent))
    .catch(() => queryRealData({ method, url: completeUrl, headers, body }))
    .then((res: any) => {
      ctx.body = res;
    });
};

export default routeMiddleWare;
