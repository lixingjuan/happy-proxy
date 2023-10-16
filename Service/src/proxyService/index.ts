import Koa from 'koa';
import axios from 'axios';
import { getCompleteRequestUrl, getConfigUrlFromHeader, saveResponseToLocalNew } from '../utils';
import jsonfile from 'jsonfile';

/** 接口代理 */
const requestRealService = (request: Koa.Context['Request'], completeUrl: string) => {
  const { method, headers, body } = request;

  // 发送真实请求到后端需要删除该头字段, 根据情况作修改
  delete headers['happy-config-url'];
  delete headers['host'];
  delete headers['origin'];

  const queryParamsForAxios = {
    url: encodeURI(completeUrl),
    method,
    headers,
    data: body
  };

  return axios(queryParamsForAxios).then((res) => {
    // 根据项目情况可以做一下修改
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error(res?.data?.message);
    }
  });
};

const readHttpResponse = async (ctx: Koa.Context) => {
  const { url, method, body } = ctx.request;
  const happyConfigUrl = getConfigUrlFromHeader(ctx.request.headers);
  const completeUrl = getCompleteRequestUrl(url);
  try {
    const res = await requestRealService(ctx.request, completeUrl);
    // 将接口的返回存储在本地
    saveResponseToLocalNew(happyConfigUrl, {
      response: res,
      method: method,
      payload: body,
      proxyUrl: completeUrl
    });
    return (ctx.body = res);
  } catch (error) {
    return (ctx.body = { message: `happy-proxy,请求真实接口失败, ${(error as Error).message}` });
  }
};

/** 读取本地数据 */
const readLocalData = (ctx: Koa.Context, localFilePath: string) => {
  const content = jsonfile.readFileSync(localFilePath);
  return (ctx.body = content?.response);
};

export { readHttpResponse, readLocalData };
