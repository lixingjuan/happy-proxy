import fs from 'fs';
import dayjs from 'dayjs';
import jsonfile from 'jsonfile';
import qs from 'query-string';
import { happyServiceFlag } from './constant';

import { pathToFileMapPath, pathToFileMapFolder, responseBasePath } from './constant';

/** 检查DB文件夹 */
export const checkDBFolder = () => {
  try {
    fs.accessSync(pathToFileMapFolder);
  } catch (error) {
    fs.mkdirSync(pathToFileMapFolder);
  }
};

/** 检查DB/response文件夹 */
const checkDBResponseFolder = () => {
  try {
    fs.accessSync(responseBasePath);
  } catch (error) {
    fs.mkdirSync(responseBasePath);
  }
};

/** 生成文件地址 */
export const generateLocalFilePath = () => {
  const fileName = `${dayjs().format('YYYY-MM-DD-HH-mm-ss')}.json`;
  return `${responseBasePath}/${fileName}`;
};

/** 获取配置url对应的本地数据地址 */
export const getLocalFilePath = (proxyUrl: string) => {
  console.log({ proxyUrl });
  if (!proxyUrl) return null;
  const relationMap = getRelationMap();

  // 先找精准匹配的
  const filePath = relationMap.get(proxyUrl);
  if (filePath) return filePath;

  // 再找模糊匹配的
  let result = null;
  relationMap.forEach((filePath, urlConfig) => {
    if (urlToRegExp(urlConfig).test(proxyUrl)) {
      result = filePath;
    }
  });

  return result;
};

/** 同步获取本地映射文件内容 */
export const getRelationMap = (): Map<string /* originalUrl */, string /* responsePath */> => {
  try {
    return new Map(Object.entries(jsonfile.readFileSync(pathToFileMapPath)));
  } catch (err) {
    checkDBFolder();
    jsonfile.writeFileSync(pathToFileMapPath, {}, { spaces: 2 });
    return new Map();
  }
};

export const setRelationMap = (content: Map<string, string>) => {
  checkDBFolder();
  try {
    const formatContent = Object.fromEntries(content);
    jsonfile.writeFileSync(pathToFileMapPath, formatContent, { spaces: 2 });
  } catch {}
};

/** 增加一条映射内容 */
export const updateRelationMap = (proxyUrl: string, filePath: string) => {
  checkDBFolder();
  const nextRelationMap = getRelationMap();
  nextRelationMap.set(proxyUrl, filePath);
  setRelationMap(nextRelationMap);
};

/** add One Response */
export const addOneResposne = (filePath: string, content: Record<string, any>) => {
  if (!filePath) {
    return;
  }

  checkDBResponseFolder();

  try {
    jsonfile.writeFileSync(filePath, content, { spaces: 2 });
  } catch (error: any) {
    console.log('addOneResposne', error.message);
  }
};

/** update One Response */
export const updateOneResposne = (filePath: string, fileContent: Record<string, any>) => {
  if (!filePath) {
    return;
  }

  checkDBResponseFolder();

  try {
    fs.accessSync(filePath);
  } catch {
    fs.mkdirSync(filePath);
  }

  jsonfile.writeFileSync(filePath, fileContent, { spaces: 2 });
};

/** delete One Response */
export const deleteOneResposneByFilePath = (filePath: string) => {
  if (!filePath) return;

  checkDBResponseFolder();

  // 删除对应的本地数据文件
  if (filePath) {
    try {
      fs.rmSync(filePath);
    } catch {}
  }
};

/**
 * @desc 保存接口返回数据到本地，并更新映射文件
 * @param {string} path 请求完整接口
 * @param {any} resData 接口响应数据
 */
export const saveResponseToLocalNew = (
  proxyUrl: string,
  responseAndRequest: {
    response: any;
    method: string;
    payload: any;
    proxyUrl: string;
  }
) => {
  if (!proxyUrl) {
    return;
  }
  const localFilePath = generateLocalFilePath();

  // updateRelationMap({ [proxyUrl]: localFilePath });
  updateRelationMap(proxyUrl, localFilePath);
  addOneResposne(localFilePath, responseAndRequest);
};

export const getCompleteRequestUrl = (url: string) => {
  const { query } = qs.parseUrl(url);

  return (query?.originalUrl || '') as string;
};

export const validateUrl = (url: string) => {
  // 合法校验
  const completeUrl = getCompleteRequestUrl(url);
  if (completeUrl || url.includes(happyServiceFlag)) {
    return true;
  }
  return false;
};

/** 转换url为正则表达式 */
export const urlToRegExp = (target: string) => {
  const formatInput = target
    .replaceAll('/', '/')
    .replaceAll('?', '\\?')
    .replace(/\.([a-zA-Z0-9])/g, '\\.$1');

  return new RegExp(`^${formatInput}$`);
};

/** 从header中获取配置url */
export const getConfigUrlFromHeader = (headers: Record<string, any>) => {
  const happyConfigUrl = headers['happy-config-url'] as string;
  console.log({ happyConfigUrl });
  return happyConfigUrl;
};

/** 根据header, 读取headr中happy-config-url对应的本地存储数据 */
export const getLocalFilePathByHeader = (headers: Record<string, any>): string | null => {
  const happyConfigUrl = getConfigUrlFromHeader(headers);
  if (!happyConfigUrl) return null;

  const localFilePath = getLocalFilePath(decodeURIComponent(happyConfigUrl));
  return localFilePath;
};

/** error response */
export class ErrorRes {
  content: string | null;
  message: string;
  code: -1;
  constructor(content: any = null, message: string = 'failed') {
    this.content = content;
    this.message = message;
    this.code = -1;
  }
}

/** success response */
export class SuccessRes {
  content: string | null;
  message: string;
  code: 1;
  constructor(content: any = null) {
    this.content = content;
    this.message = 'successful';
    this.code = 1;
  }
}
