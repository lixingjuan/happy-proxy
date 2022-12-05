import Koa from 'koa';
import axios from 'axios';

/** 接口代理 */
const proxyRoute = (request: Koa.Context['Request'], completeUrl: string) => {
  const { method, headers, body } = request;

  const queryParamsForAxios = {
    url: encodeURI(completeUrl),
    method,
    headers: { cookie: headers.cookie },
    data: body
  };

  return axios(queryParamsForAxios).then((res) => {
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error(res?.data?.message);
    }
  });
};

export default proxyRoute;
