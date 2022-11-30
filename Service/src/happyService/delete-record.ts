import { deleteOneResposne, getRelationMap, setRelationMap } from '../utils';

const deleteOneRecord = async (proxyUrl: string) => {
  if (!proxyUrl) {
    return {
      message: '删除失败, proxyUrl不能为空',
      code: -1
    };
  }
  const relationMap = getRelationMap();

  deleteOneResposne(relationMap[proxyUrl]);

  delete relationMap[proxyUrl];

  setRelationMap(relationMap);

  return {
    message: '删除成功',
    code: 1
  };
};

export default deleteOneRecord;
