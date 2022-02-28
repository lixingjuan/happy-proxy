import axios from "axios";

const apiQueryPathMap = "http://127.0.0.1:4000/happy-service";

interface Response<T> {
  code: 1 | -1;
  message: string;
  data: T;
}

/** 查询全部 */
export const getAllApi = (): Promise<Response<Record<string, string>>> =>
  axios.get(apiQueryPathMap).then((res) => res.data);

/** 查询接口详情数据 */
export const getDetailApi = (
  filePath: string
): Promise<Response<Record<string, string>>> =>
  axios
    .get(apiQueryPathMap, {
      params: {
        filePath,
      },
    })
    .then((res) => res.data);

/** 删除全部 */
export const deleteAllApi = () =>
  axios.delete(apiQueryPathMap).then((res) => res.data);

/** 删除一条 */
export const deleteItemApi = (urlPath: string) =>
  axios
    .delete(`${apiQueryPathMap}`, {
      params: {
        urlPath,
      },
    })
    .then((res) => res.data);

/** 增加一条mock */
export const addItemApi = (data: { url: string; mockBody: any }) =>
  axios.post(`${apiQueryPathMap}`, data).then((res) => res.data);
