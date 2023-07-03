import { getRelationMap, updateOneKeyRelationMap } from '../utils';

const modifyDetail = async (oldUrl: string, newUrl: string) => {
  const localMap = getRelationMap();
  try {
    const localFilePath = localMap[oldUrl];

    if (!localFilePath) {
      throw new Error('');
    }

    updateOneKeyRelationMap(oldUrl, newUrl);

    return {
      content: null,
      message: '修改成功',
      code: 1
    };
  } catch (error) {
    return {
      content: null,
      message: '修改失败',
      code: -1
    };
  }
};

export default modifyDetail;
