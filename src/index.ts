import Koa from "koa";
import cors from "koa2-cors";
import bodyParser from "koa-bodyparser";

import routeMiddleWare from "./routes";

const app = new Koa();

const corsMiddleware = cors({
  // 奇怪？为什么是null
  origin: "null",
  credentials: true,
});

/* 路由信息 */
app.use(corsMiddleware);

app.use(bodyParser());

/* 路由信息 */
app.use(routeMiddleWare);

app.use((ctx) => {
  console.log("ceeee", ctx);
});

app.listen(4000, () => {
  console.log("SUCCESS, 监听在4000端口");
});
