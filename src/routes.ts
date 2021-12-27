import Koa from "koa";
import fs from "fs";
import _ from "lodash";
import axios from "axios";
import { pathToFileMapPath, responseBasePath } from "../constant";
import configs from "../my-configs";

const { targetBaseUrl, cookie } = configs;

/**
 * @desc
 * 1. 根据请求路由去寻找对应的文件路径
 */
const queryLocalJson = (routePath: string) => {
  console.log({ routePath });

  const pathMap = fs.readFileSync(pathToFileMapPath, "utf8")
    ? JSON.parse(fs.readFileSync(pathToFileMapPath, "utf8"))
    : {};

  const responseFilePath = pathMap[routePath];

  if (!responseFilePath) {
    return "";
  }
  // const localFilePath = `${responseBasePath}${responseFilePath}`;
  const localFilePath = responseFilePath;

  console.log("localFilePath--->", localFilePath);

  const localContent = fs.readFileSync(localFilePath, "utf-8");

  return localContent || "";
};

/**
 * @desc 保存接口返回数据到本地，并更新映射文件
 * @param {string} path 请求完整接口
 * @param {any} resData 接口响应数据
 */
const saveResponseToLocal = (path: string, resData: any) => {
  // 去除 / . : 等符号后做为文件名称
  const fileName = `${path.replace(/[\/|\.|:]/g, "")}.json`;

  // 文件存储路径
  const filePath = `${responseBasePath}/${fileName}`;

  console.log("新的文件地址", fileName);

  // 新的path to file 映射文件内容
  const newPathToFileMapPath = {
    ...(JSON.parse(fs.readFileSync(pathToFileMapPath, "utf-8")) || {}),
    [path]: filePath,
  };

  console.log("新的映射文件内容", newPathToFileMapPath);

  // 接口响应数据
  const resStr = JSON.stringify(_.cloneDeep(resData), undefined, 2);
  // 写入接口响应
  fs.writeFileSync(filePath, resStr);
  // 更新 映射文件
  fs.writeFileSync(
    pathToFileMapPath,
    JSON.stringify(newPathToFileMapPath, undefined, 4)
  );
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
}) => {
  const { url, method, headers } = props;
  const queryParams = {
    url,
    method,
    headers: { cookie },
  };

  console.log("queryRealData 请求参数 =>", queryParams);

  try {
    const res = await axios(queryParams);

    console.log("真实接口请求成功，返回数据", res.data);
    saveResponseToLocal(props.url, res.data);
    return res;
  } catch (err) {
    /* @ts-ignore */
    console.log("真实接口请求成功，返回数据 失败原因", err?.message);
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
  console.clear();
  console.log("--------------------------分割线-----------------------------");

  console.log("来自网页的请求 ctx.request", ctx.request);

  const { url, method, headers } = ctx.request;

  const completeUrl = `${targetBaseUrl}${url}`;

  console.log("目标URl", completeUrl);

  const localContent = queryLocalJson(completeUrl);

  if (localContent) {
    ctx.body = localContent;
  } else {
    /**
     * 接下来发起真正的请求，
     * 1. 域名
     * 2. 路径
     * 3. header
     */

    const res = await queryRealData({ method, url: completeUrl, headers });
    console.log("将要响应给前端的数据", res);
    /* @ts-ignore */
    ctx.body = res.data;
  }
};

export default routeMiddleWare;
