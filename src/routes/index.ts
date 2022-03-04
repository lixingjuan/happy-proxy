import Koa from "koa";
import axios from "axios";
import join from "url-join";
import omit from "lodash/omit";
import qs from "query-string";
import fsPromises from "fs/promises";
import happyServiceApi from "./happy-service-api";

import { happyServiceFlag } from "../utils/constant";
import { queryPathMap } from "../utils/fs-utils";
import { saveResponseToLocal } from "./utils";

/** 根据请求路由去寻找对应的文件路径 */
const queryLocalJson = (completeUrl: string) =>
  queryPathMap()
    .then((res) => {
      const responseFilePath = res[completeUrl];
      if (!responseFilePath) {
        throw new Error("path empty");
      }
      return responseFilePath;
    })
    .then((path) => fsPromises.readFile(path, "utf8"))
    .then((data) => JSON.parse(data))
    .then((data) => {
      console.log(`本地响应: ${completeUrl}`);
      return data;
    });

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
      const isOk = res.status === 200 && res.data.code > 0;
      console.log(`接口响应: ${url}, res.data: ${res.data}`);

      if (!isOk) {
        throw Error(res.data.message);
      }

      saveResponseToLocal(url, res);
      return res.data;
    })
    .catch((err) => {
      console.error(
        `
        接口: ${url},
        error: ${err.message},
        headers: ${JSON.stringify(headers, undefined, 4)}`
      );
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

  const headers = omit({ ...reqHeaders }, "host");

  if (url.includes(happyServiceFlag)) {
    return happyServiceApi(ctx.request).then((res) => {
      ctx.body = res;
    });
  }

  const { query } = qs.parseUrl(url);

  const happyDomain = query?.happyDomain || "";

  const tempUrl = join(happyDomain as string, url);

  const completeUrl = qs.exclude(tempUrl, ["happyDomain"]);

  return queryLocalJson(completeUrl)
    .catch(() => queryRealData({ method, url: completeUrl, headers, body }))
    .then((res: any) => (ctx.body = res));
};

export default routeMiddleWare;
