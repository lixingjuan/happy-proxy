import {
  SuccessRes,
  ErrorRes,
  getLocalFilePath,
  checkDBFolder,
  getRelationMap,
  setRelationMap,
  saveResponseToLocalNew
} from '../utils';
import jsonfile from 'jsonfile';

/** 修改映射文件的key */
export const updateOneKeyRelationMap = (
  oldProxyUrl: string,
  newProxyUrl: string,
  localFilePath: string
) => {
  checkDBFolder();

  // 从映射文件中删除旧的，加上新的
  const relationMap = getRelationMap();
  relationMap.delete(oldProxyUrl);
  relationMap.set(newProxyUrl, localFilePath);

  try {
    // 更新local data
    const localData = jsonfile.readFileSync(localFilePath);
    const newLocalData = { ...localData, proxyUrl: newProxyUrl };
    jsonfile.writeFileSync(localFilePath, newLocalData, { spaces: 2 });

    // 更新 映射文件
    setRelationMap(relationMap);
    return new SuccessRes();
  } catch (error) {
    return new ErrorRes(null, (error as Error).message);
  }
};

/** 修改配置的url */
const modifyConfigUrl = async (oldUrl: string, newUrl: string) => {
  const localFilePath = getLocalFilePath(oldUrl);
  if (!oldUrl || !newUrl) return new ErrorRes(null, 'url不能为空');

  // 本地如果已有url对应的文件，则需要修改relationMap 和 对应的本地数据
  if (localFilePath) return updateOneKeyRelationMap(oldUrl, newUrl, localFilePath);

  // ，则创建
  const localFileContent = {
    response: {},
    method: 'GET',
    payload: null,
    proxyUrl: newUrl
  };
  saveResponseToLocalNew(newUrl, localFileContent);
  return new SuccessRes();
};

export default modifyConfigUrl;
