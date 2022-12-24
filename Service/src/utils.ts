import fs from 'fs';
import dayjs from 'dayjs';
import jsonfile from 'jsonfile';
import qs from 'query-string';
import { happyServiceFlag } from './constant';

import { pathToFileMapPath, pathToFileMapFolder, responseBasePath } from './constant';

/** 检查DB文件夹 */
const checkDBFolder = () => {
  try {
    fs.accessSync(pathToFileMapFolder);
  } catch (error) {
    fs.mkdirSync(pathToFileMapFolder);
  }
};

/** 检查并修复DB文件夹 */
const checkAndRepairDBFolder = () => {
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

/** 同步获取本地映射文件内容 */
export const getRelationMap = () => {
  try {
    return jsonfile.readFileSync(pathToFileMapPath);
  } catch (err) {
    checkDBFolder();
    jsonfile.writeFileSync(pathToFileMapPath, {}, { spaces: 2 });
    return {};
  }
};

/** 保存map文件 */
export const setRelationMap = (content: Record<string, string>) => {
  checkDBFolder();
  try {
    jsonfile.writeFileSync(pathToFileMapPath, content, { spaces: 2 });
  } catch {}
};

/** 增加一条映射内容 */
export const updateRelationMap = (newRecord: Record<string, string>) => {
  checkDBFolder();

  // 更新 映射文件
  const newMap = {
    ...getRelationMap(),
    ...(newRecord || {})
  };
  setRelationMap(newMap);
};

/** add One Response */
export const addOneResposne = (filePath: string, content: Record<string, any>) => {
  if (!filePath) {
    return;
  }

  checkAndRepairDBFolder();

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

  checkAndRepairDBFolder();

  try {
    fs.accessSync(filePath);
  } catch {
    fs.mkdirSync(filePath);
  }

  jsonfile.writeFileSync(filePath, fileContent, { spaces: 2 });
};

/** delete One Response */
export const deleteOneResposne = (filePath: string) => {
  if (!filePath) {
    return;
  }

  checkAndRepairDBFolder();

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
  updateRelationMap({ [proxyUrl]: localFilePath });
  addOneResposne(localFilePath, responseAndRequest);
};

/** 获取路径拼接的 originalUrl 参数 */
export const getCompleteUrlByUrl = (url: string) => {
  const { query } = qs.parseUrl(url);

  return (query?.originalUrl || '') as string;
};

/** 请求url合法校验：拼接了originalUrl 或者是 本服务自己的请求 */
export const validateUrl = (url: string) =>
  getCompleteUrlByUrl(url) || url.includes(happyServiceFlag);

/** 获取url指定的本地response文件地址 */
export const getLocalFilePathByUrl = (url: string): string | undefined => {
  const localMap = getRelationMap();
  const completeUrl = getCompleteUrlByUrl(url);
  return localMap[completeUrl];
};
