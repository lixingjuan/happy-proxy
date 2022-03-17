import Koa from "koa";
import axios from "axios";
import jsonfile from "jsonfile";
import join from "url-join";
import omit from "lodash/omit";
import qs from "query-string";
import happyServiceApi from "./happy-service-api/index";
import { outputRecord } from "../utils/build-up-record";

import { happyServiceFlag } from "../utils/constant";
import { queryPathMap } from "../utils/fs-utils";
import { generateHashKey } from "../utils/build-up-record";
import { saveResponseToLocal } from "./utils";

/** 根据请求路由去寻找对应的文件路径 */
const queryLocalJson = (hash: string) =>
  queryPathMap()
    .then((res) => {
      const responseFilePath = res[hash]?.filePath;
      if (!responseFilePath) {
        throw new Error("path empty");
      }
      return responseFilePath;
    })
    .then((path) => jsonfile.readFileSync(path, "utf8"))
    .then((data) => {
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
      const isOk = res.status === 200 && res.data.code >= 0;

      if (!isOk) {
        throw Error(res.data.message);
      }

      /** 获得一条记录 */
      const oneRecord = outputRecord({ url, method, body });
      /** 保存该记录到本地 */
      saveResponseToLocal(oneRecord, res);
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
 */
const routeMiddleWare = async (ctx: Koa.Context) => {
  const { url, method, headers: reqHeaders, body } = ctx.request;

  const headers = omit({ ...reqHeaders }, "host");

  if (url.includes(happyServiceFlag)) {
    return happyServiceApi(ctx.request)
      .then((res) => {
        ctx.body = res;
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  const { query } = qs.parseUrl(url);

  const happyDomain = query?.happyDomain || "";

  const tempUrl = join(happyDomain as string, url);

  const completeUrl = qs.exclude(tempUrl, ["happyDomain"]);

  /** 先找到该接口对应的hash值 */
  const hash = generateHashKey({ url: completeUrl, method, body });

  return queryLocalJson(hash)
    .then((res) => {
      console.log(`本地响应: ${url}`);
      return res;
    })
    .catch((err) => {
      console.log(`接口响应: ${url}, 接口响应原因: ${err.message}`);
      return queryRealData({ method, url: completeUrl, headers, body });
    })
    .then((res: any) => (ctx.body = res));
};

export default routeMiddleWare;
