import { queryPathMap, cleanPathMap } from "../utils/fs-utils";

/**查询本地映射json文件 */
const ApiQueryPath = () => {};

/** 本服务自己的接口 */
const happyServiceApi = (req: any) => {
  const { method } = req;
  switch (method) {
    case "GET":
      return queryPathMap();
    case "DELETE":
      return cleanPathMap();
    default:
      return queryPathMap();
  }
};

export default happyServiceApi;
