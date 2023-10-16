import {
  ErrorRes,
  SuccessRes,
  setRelationMap,
  getRelationMap,
  getLocalFilePath,
  deleteOneResposneByFilePath
} from '../utils';

/** 删除一条记录 & 本地response-data */
const deleteOneRecord = async (proxyUrl: string) => {
  if (!proxyUrl) return new ErrorRes(null, 'proxyUrl不能为空');

  const filePath = getLocalFilePath(proxyUrl);
  if (!filePath) return new ErrorRes(null, '未找到');

  const relationMap = getRelationMap();
  relationMap.delete(proxyUrl);
  setRelationMap(relationMap);
  deleteOneResposneByFilePath(filePath);
  return new SuccessRes();
};

export default deleteOneRecord;
