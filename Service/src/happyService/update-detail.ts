import { getRelationMap, updateOneResposne } from '../utils';

/** update detail */
const updateRecordDetailApi = async (newFileContent: any) => {
  try {
    const relationMap = getRelationMap();

    const filePath = relationMap[newFileContent.proxyUrl];

    if (!filePath) {
      throw new Error('本地没有该文件');
    }

    updateOneResposne(filePath, newFileContent);

    return {
      content: newFileContent,
      message: '更新成功',
      code: 1
    };
  } catch (error: any) {
    return {
      content: {},
      message: `更新失败, ${error.message}`,
      code: -1
    };
  }
};

export default updateRecordDetailApi;
