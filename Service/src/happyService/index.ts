import type { Context } from 'koa';
import queryString from 'query-string';

import testService from './test-service';
import queryDetail from './query-detail';
import deleteOneRecord from './delete-record';
import updateRecordDetailApi from './update-detail';

/** 本服务自己的接口 */
const happyServiceApi = (request: Context['request']) => {
  const { url, body } = request;

  const { query, url: requestUrl } = queryString.parseUrl(url);

  const { proxyUrl } = query;

  switch (requestUrl) {
    case '/happy-service/query-detail':
      return queryDetail(proxyUrl as string);

    case '/happy-service/update-detail':
      return updateRecordDetailApi(body as Parameters<typeof updateRecordDetailApi>[0]);

    case '/happy-service/delete-record':
      return deleteOneRecord(proxyUrl as string);

    case '/happy-service/test-service':
      return testService();

    default:
      return testService();
  }
};

export default happyServiceApi;
