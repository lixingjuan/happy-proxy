import Koa from "koa";
import _ from "lodash";
import axios from "axios";
import { readFileSync, writeFileSync } from "fs";

import { pathToFileMapPath, responseBasePath } from "../utils/constant";
import log from "../utils";
import configs from "../../settings";

const { targetBaseUrl, cookie } = configs;

/**
 * @desc
 * 1. 根据请求路由去寻找对应的文件路径
 */
const queryLocalJson = (routePath: string) => {
  try {
    const pathMap = readFileSync(pathToFileMapPath, "utf8")
      ? JSON.parse(readFileSync(pathToFileMapPath, "utf8"))
      : {};

    const responseFilePath = pathMap[routePath];

    if (!responseFilePath) {
      return "";
    }

    const localFilePath = responseFilePath;

    const localContent = readFileSync(localFilePath, "utf-8");

    return localContent || "";
  } catch (error) {
    log.error(`函数queryLocalJson， 错误原因: ${(error as Error).message}`);
    return "";
  }
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
    const fileName = `${path.replace(/[\/|\.|:]/g, "")}.json`;

    // 文件存储路径
    filePath = `${responseBasePath}/${fileName}`;

    const localPathToFileMap = readFileSync(pathToFileMapPath, "utf-8")
      ? JSON.parse(readFileSync(pathToFileMapPath, "utf-8"))
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
    writeFileSync(filePath, resStr);
    // 更新 映射文件
    writeFileSync(
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

/**
 * @desc 像真正的接口发起请求
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
    headers: { cookie },
  };

  try {
    const res = await axios(queryParams);
    return res;
  } catch (err) {
    /* @ts-ignore */
    log.error(`🚗🚗🚗真实接口请求错误,
              失败原因 => ${(err as Error)?.message}
              请求参数 => ${JSON.stringify(queryParams, undefined, 4)}
    `);
    return err;
  }
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

  // log(`🚗请求参数${ctx.request}`);
  log(`🚗请求参数${JSON.stringify(ctx.request, undefined, 4)}`);

  const { url, method, headers } = ctx.request;

  const completeUrl = `${targetBaseUrl}${url}`;

  const localContent = (await queryLocalJson(completeUrl)) as any;

  if (localContent) {
    ctx.body = localContent;
    // log(`🌼响应来自本地, URL 👉🏻 ${url}🌼`);
    return;
  }

  /**
   * 接下来发起真正的请求，
   * 1. 域名
   * 2. 路径
   * 3. header
   */
  const res = await queryRealData({ method, url: completeUrl, headers });

  ctx.body = res?.data;

  // log(`🌳响应来自接口, URL 👉🏻 ${url}🌳`);

  /* @ts-ignore */
  saveResponseToLocal(completeUrl, res.data);
};

export default routeMiddleWare;
