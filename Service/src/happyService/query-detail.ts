import jsonfile from 'jsonfile';

import { getRelationMap } from '../utils';

const queryDetail = async (proxyUrl: string) => {
  const localMap = getRelationMap();
  try {
    const localFilePath = localMap[proxyUrl];

    if (!localFilePath) {
      throw new Error('');
    }

    const localFileContent = jsonfile.readFileSync(localFilePath);
    return {
      content: localFileContent,
      message: '查询成功',
      code: 1
    };
  } catch (error) {
    return {
      content: null,
      message: '查询失败',
      code: -1
    };
  }
};

export default queryDetail;
