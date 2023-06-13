import axios from 'axios';

export const backendName = 'happy-service';

/** 请求方式 */
export const MethodArr = ['GET', 'POST', 'DELETE', 'PUT'];
export type MethodType = typeof MethodArr[number];

export interface RecordItemType {
  hash: string;
  url: string;
  filePath: string;
  tags: string[];
  createTime: string;
  method?: MethodType;
}

const service = axios.create({
  // 设置baseUr地址,如果通过proxy跨域可直接填写base地址
  baseURL: 'http://127.0.0.1:4000/happy-service',
  // 配置请求超时时间
  timeout: 10000,
  // 如果用的JSONP，可以配置此参数带上cookie凭证，如果是代理和CORS不用设置
  withCredentials: true
});

interface Response<T> {
  code: 1 | -1;
  message: string;
  content: T;
}

type ApiPromise<T> = Promise<Response<T>>;

/* ****************************************************************************************************
 *                                    --分隔线--
 ************************************************************************************************* */

export interface DetailInterface {
  response: {
    code: number;
    message: string;
    data: Data;
  };
  method: string;
  payload: Record<string, string>;
  proxyUrl: string;
}

export interface Data {
  title: number;
  list: List[];
  pageNow: number;
  pageCount: number;
  pageSize: number;
  total: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  actualTotal: number;
}

export interface List {
  id: number;
  title: string;
  highlightTitle: string;
  downloadUrl: null;
  subTitle: null;
  zsAutoCategory: null;
  autoCategory: null;
  stockId: string;
  stockName: string;
  accountId: null;
  industry: null | string;
  isImportant: number;
  paragraphNum: number;
  paragraphs: any[];
  charts: any[];
  imgUrl: null | string;
  isCommented: null;
  starBoard: null;
  annoSecInfos: AnnoSECInfo[];
  scannedTimestamp: number;
}

export interface AnnoSECInfo {
  stockId: string;
  stockName: string;
}

/** 查询接口详情数据 */
export const getServiceStatus = (): ApiPromise<boolean> =>
  service.get('/test-service').then((res) => res.data);

/** 查询接口详情数据 */
export const getDetailByUrlApi = (proxyUrl: string): ApiPromise<DetailInterface> =>
  service
    .get('/query-detail', {
      params: {
        proxyUrl
      }
    })
    .then((res) => res.data);

/** 更新详情 */
export const updateDetailApi = (props: {
  method: string;
  response: any;
  payload: any;
  proxyUrl: string;
}): Promise<Response<string>> => service.post('/update-detail', props).then((res) => res.data);

/** 更新originalUrl */
export const updateOriginalUrlApi = (data: {
  oldUrl: string;
  newUrl: string;
}): Promise<Response<string>> => service.post('/modify-detail', data).then((res) => res.data);

/** 删除一条 record */
export const deleteRecordApi = (proxyUrl: string) =>
  service
    .delete('/delete-record', {
      params: {
        proxyUrl
      }
    })
    .then((res) => res.data);
