import Koa from "koa";

import { happyServiceFlag } from "../constant";
import proxyRoute from "./proxyServiceRoute";
import happyServiceApi from "./happyServiceRoute";

const routeMiddleWare = (ctx: Koa.Context) => {
  const { url } = ctx.request;

  const isHappyServiceRoute = url.includes(happyServiceFlag);

  if (isHappyServiceRoute) {
    return happyServiceApi(ctx.request)
      .then((res) => {
        ctx.body = res;
      })
      .catch((err) => {
        console.log(err.message);
      });
  } else {
    return proxyRoute(ctx);
  }
};

export default routeMiddleWare;
