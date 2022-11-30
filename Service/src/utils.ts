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
export const deleteOneResposne = (filePath: string) => {
  if (!filePath) {
    return;
  }

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

  updateRelationMap({ [proxyUrl]: localFilePath });
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
