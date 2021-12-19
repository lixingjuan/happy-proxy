import Koa from "koa";
import cors from "koa2-cors";
import bodyParser from "koa-bodyparser";
import { cwd } from "process";

// const { aa } = require("./utils/index.ts");
import { queryLocalJson } from "./utils/index";

// import Koa = require("koa");
// const { queryLocalJson } = require("./utils/index.js");

// const getKeys = require("../getKeys");

const app = new Koa();

const corsMiddleware = cors({
  origin: "*",
  credentials: true,
  allowMethods: ["GET", "POST", "DELETE"],
});

app.use(bodyParser());

app.use(corsMiddleware);

app.use((ctx) => {
  const { path, method } = ctx;
  console.log(path);

  ctx.body = {
    data: "hello world",
    code: 200,
    message: "Succeed",
    status: "Succeed",
  };
});

// app.use(async (ctx) => {
//   const { path, method } = ctx;
//   console.log(path);
//   const res = "queryLocalJson(path)";

//   ctx.body = {
//     data: res,
//     code: 304,
//     message: "查询成功",
//     status: "Succeed",
//   };
// });

app.listen(
  {
    port: 3000,
    // host: "www.taobao.com",
  },
  () => {
    console.log("SUCCESS, 监听在3000端口");
  }
);
