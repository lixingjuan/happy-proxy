import Koa from "koa";
import axios from "axios";
import join from "url-join";
import qs from "query-string";
import jsonfile from "jsonfile";
import omit from "lodash/omit";

import { saveResponseToLocal } from "../utils";
import fetchRealData from "./fetchRealData";
import { queryPathMap } from "../../utils/fs-utils";
import { generateHashKey, outputRecord } from "../../utils/build-up-record";

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

const proxyRoute = (ctx: Koa.Context) => {
  const {
    url,
    method,
    headers: reqHeaders,
    body,
    query: payload,
  } = ctx.request;

  // TODO host 存在会导致请求出错
  const headers = omit({ ...reqHeaders }, "host");

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
      return fetchRealData({
        method,
        url: completeUrl,
        headers,
        body,
        payload,
      });
    })
    .then((res: any) => (ctx.body = res));
};

export default proxyRoute;
