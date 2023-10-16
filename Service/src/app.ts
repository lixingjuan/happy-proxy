import Koa from 'koa';

import { happyServiceFlag } from './constant';
import happyServiceDistribute from './happyService';
import { validateUrl, getLocalFilePathByHeader } from './utils';
import { readHttpResponse, readLocalData } from './proxyService';

const routeMiddleWare = (ctx: Koa.Context) => {
  const { url: encodeUrl, headers } = ctx.request;
  const url = decodeURIComponent(encodeUrl);
  console.log('url', url);
  console.log('headers', headers);

  // 1. 接口合法性校验
  if (!validateUrl(url)) {
    return (ctx.body = { message: 'url 无效' });
  }

  // 2. 本服务自己的请求
  if (url.includes(happyServiceFlag)) {
    return happyServiceDistribute(ctx);
  }

  const localFilePath = getLocalFilePathByHeader(headers);
  /** 3. 若本地有该urlresponse-data，从本地读取 */
  if (localFilePath) {
    return readLocalData(ctx, localFilePath);
  }

  /** 4. 本地未缓存过相关结果，需要请求真实的接口 */
  return readHttpResponse(ctx);
};

export default routeMiddleWare;
