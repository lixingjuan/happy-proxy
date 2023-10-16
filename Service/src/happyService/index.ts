import Koa from 'koa';
import queryString from 'query-string';

import testService from './test-service';
import queryDetail from './query-detail';
import modifyConfigUrl from './modify-config-url';
import deleteOneRecord from './delete-record';
import updateRecordDetailApi from './update-detail';

/** 本服务自己的接口 */
const happyServiceApi = (request: Koa.Context['request']) => {
  const { url: requestUrl, body } = request;
  const { proxyUrl } = body;

  switch (requestUrl) {
    case '/happy-service/query-detail': {
      return queryDetail(proxyUrl as string);
    }

    case '/happy-service/modify-detail': {
      const { oldUrl, newUrl } = body as any;
      return modifyConfigUrl(oldUrl, newUrl);
    }

    case '/happy-service/update-detail':
      return updateRecordDetailApi(body as any);

    case '/happy-service/delete-record':
      return deleteOneRecord(proxyUrl as string);

    case '/happy-service/test-service':
      return testService();

    default:
      return testService();
  }
};

const happyServiceDistribute = (ctx: Koa.Context) => {
  return happyServiceApi(ctx.request).then((res) => {
    ctx.body = res;
  });
};

export default happyServiceDistribute;
