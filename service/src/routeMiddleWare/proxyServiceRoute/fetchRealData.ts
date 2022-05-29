import Koa from "koa";
import axios from "axios";
import join from "url-join";
import qs from "query-string";
import jsonfile from "jsonfile";
import omit from "lodash/omit";

import { queryPathMap } from "../../utils/fs-utils";
import { saveResponseToLocal } from "../utils";
import { outputRecord } from "../../utils/build-up-record";

/**
 * @desc 向真正的接口发起请求
 * @param {string} path
 * @param {Koa} method
 */
const queryRealData = (props: {
  url: string;
  method: any;
  headers: any;
  body: any;
  payload: any;
}): Promise<any> => {
  const { url, method, headers, body, payload } = props;
  const queryParams = {
    url,
    method,
    headers,
    data: body,
  };

  return axios(queryParams)
    .then((res) => {
      const isOk = res.status === 200 && res.data.code >= 0;

      if (!isOk) {
        throw Error(res.data.message);
      }

      /** 获得一条记录 */
      const oneRecord = outputRecord({ url, method, body, payload });
      /** 保存该记录到本地 */
      saveResponseToLocal(oneRecord, res);
      return res.data;
    })
    .catch((err) => {
      console.error(
        `
        接口: ${url},
        error: ${err.message},
        headers: ${JSON.stringify(headers, undefined, 4)}`
      );
      return Promise.reject(err.message);
    });
};

export default queryRealData;
