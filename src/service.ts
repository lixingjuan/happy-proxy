import axios from "axios";

const service = axios.create({
  // 设置baseUr地址,如果通过proxy跨域可直接填写base地址
  baseURL: "http://127.0.0.1:4000/happy-service",
  // 配置请求超时时间
  timeout: 10000,
  // 如果用的JSONP，可以配置此参数带上cookie凭证，如果是代理和CORS不用设置
  withCredentials: true,
});

interface Response<T> {
  code: 1 | -1;
  message: string;
  data: T;
}

/** 查询全部 */
export const getAllApi = (): Promise<
  Response<{ url: string; filePath: string; hash: string; tags: string[] }[]>
> => service.get("/query-all").then((res) => res.data);

/** 查询接口详情数据 */
export const getDetailApi = (
  hash: string
): Promise<Response<Record<string, string>>> =>
  service
    .get("/query-detail", {
      params: {
        hash,
      },
    })
    .then((res) => res.data);

/** 删除全部 record */
export const deleteAllApi = () =>
  service.delete("/delete-all-record").then((res) => res.data);

/** 删除一条 record */
export const deleteItemApi = (hash: string) =>
  service
    .delete("/delete-record", {
      params: {
        hash,
      },
    })
    .then((res) => res.data);

/** 删除tag */
export const deleteTagsApi = (params: { hash: string; tag: string }) =>
  service.delete(`/delete-tag`, { params }).then((res) => res.data);

/** 增加tag */
export const addTagsApi = (data: { hash: string; tag: string }) =>
  service.post(`/add-tag`, data).then((res) => res.data);

/** 增加一条mock record */
export const addItemApi = (data: { url: string; mockBody: any }) =>
  service.post("/add-record", data).then((res) => res.data);
