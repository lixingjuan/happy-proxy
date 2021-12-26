import Koa from "koa";
import fs from "fs";
import _ from "lodash";
import axios from "axios";
import {
  rootPath,
  pathToFileMapPath,
  responseBasePath,
} from "../configs/index";

const targetBaseUrl = "api.juejin.cn";
const protocal = "https:";

const filePath = `${rootPath}/src/response/juejin.json`;

/**
 * @desc
 * 1. 根据请求路由去寻找对应的文件路径
 */
const queryLocalJson = (routePath: string) => {
  console.log({ routePath });

  const pathMap = JSON.parse(fs.readFileSync(pathToFileMapPath, "utf8"));
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

const saveResponseToLocal = (path: string, resData: any) => {
  const fileName = `${path.replace(/[\/|\.|:]/g, "")}.json`;

  const filePath = `${responseBasePath}/${fileName}`;

  console.log("新的文件地址", fileName);

  const newPathToFileMapPath = {
    ...JSON.parse(fs.readFileSync(pathToFileMapPath, "utf-8")),
    [path]: filePath,
  };

  console.log("新的映射文件内容", newPathToFileMapPath);

  const resStr = JSON.stringify(_.cloneDeep(resData));
  // 写入接口响应
  fs.writeFileSync(filePath, resStr);
  // 更新 映射文件
  fs.writeFileSync(pathToFileMapPath, JSON.stringify(newPathToFileMapPath));
};

/**
 * @desc 像真正的接口发起请求
 * @param {string} path
 * @param {Koa} method
 */
const queryRealData = async (props: { url: string; method: any }) => {
  const { url, method } = props;

  console.log("queryRealData 请求接口", url);

  try {
    const res = await axios({
      url,
      method,
    });

    console.log("真实接口请求成功，返回数据", res.data);
    saveResponseToLocal(url, res.data);
    return res;
  } catch (err) {
    /* @ts-ignore */
    console.log("err.message", err?.message);
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
  console.log("--------------------------分割线-----------------------------");

  console.log("来自网页的请求 ctx.request", ctx.request);
  const { url, method } = ctx.request;
  const completeUrl = `${protocal}//${targetBaseUrl}${url}`;

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

    const res = await queryRealData({ method, url: completeUrl });
    console.log("将要响应给前端的数据", res);
    /* @ts-ignore */
    ctx.body = res.data;
  }

  // 此时仅测试 /demo
  // console.log(path);

  // console.log("localMock", localMock);

  // localMock
  //   .then((res) => {
  //     ctx.body = res;
  //   })
  //   .catch((err: Error) => {
  //     console.log("本地mock查询出错, 错误原因=>", err);
  //     // 发起真实的请求
  //     return queryRealData(path, method);
  //   });
};

export default routeMiddleWare;

/* 测试请求掘金 */
// const juejinIp = "180.97.251.22";

// const options = {
//   hostname: juejinIp,
//   port: 80,
//   path: "/extension/banner",
//   method: "GET",
// };

// console.log({ options });
// const req = http.request(options, (res) => {
//   console.log("statusCode:", res.statusCode);
//   console.log("headers:", res.headers);

//   res.on("data", (d) => {
//     console.log(d.toString());
//     // process.stdout.write(d);
//   });
// });

// console.log({ req });
// req.on("error", (e) => {
//   console.error(e);
// });
// req.end();
