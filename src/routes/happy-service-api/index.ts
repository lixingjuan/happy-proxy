import { queryPathMap, updateLocalPathMap } from "../../utils/fs-utils";
import queryString from "query-string";
import { addRecord } from "./add-record";
import { deleteOneRecord, deleteAllRecord } from "./delete-record";
import { queryAllRecordApi, queryRecordDetailApi } from "./query-record";
import { addTag, deleteTag } from "./tag";

/** 本服务自己的接口 */
const happyServiceApi = (req: any) => {
  const { url, body } = req;

  const { query, url: requestUrl } = queryString.parseUrl(url);

  const { hash } = query;

  switch (requestUrl) {
    case "/happy-service/query-all":
      return queryAllRecordApi();

    case "/happy-service/query-detail":
      return queryRecordDetailApi(hash as string);

    case "/happy-service/add-record":
      return addRecord(body);

    case "/happy-service/delete-record":
      return deleteOneRecord(hash as string);

    case "/happy-service/delete-all-record":
      return deleteAllRecord();

    case "/happy-service/add-tag":
      return addTag(body);

    case "/happy-service/delete-tag":
      return deleteTag(query as any);

    default:
      return queryAllRecordApi();
  }
};

export default happyServiceApi;
