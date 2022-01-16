import Koa from "koa";
import cors from "koa2-cors";
import bodyParser from "koa-bodyparser";

import routeMiddleWare from "./routes";
import log from "./utils/log";

const app = new Koa();

/* 允许跨域 */
const corsMiddleware = cors({
  // TODO: 奇怪？为什么是null, 是chrome转发的时候丢失了么？
  origin: "null",
  credentials: true,
});

/* 路由信息 */
app.use(corsMiddleware);

/* body 解析中间件 */
app.use(bodyParser());

/* 路由信息 */
app.use(routeMiddleWare);

app.listen(4000, () => {
  console.log(
    "🌈🌈🌈🌈🌈 🦄🦄🦄🦄🦄 SUCCESS, 监听在4000端口 🦄🦄🦄🦄🦄 🌈🌈🌈🌈🌈"
  );
});
