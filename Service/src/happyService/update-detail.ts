import { getRelationMap, saveResponseToLocalNew, updateOneResposne } from '../utils';

/** update detail */
const updateRecordDetailApi = async (newFileContent: {
  proxyUrl: string;
  response: Record<string, any>;
  method: string;
}) => {
  const { proxyUrl, response, method } = newFileContent;
  try {
    const relationMap = getRelationMap();

    const filePath = relationMap[proxyUrl];

    if (!filePath) {
      const localFileContent = {
        response,
        method,
        payload: null,
        proxyUrl: proxyUrl
      };
      saveResponseToLocalNew(proxyUrl, localFileContent);

      return {
        content: localFileContent,
        message: '本地无该接口对应response文件，已创建',
        code: 1
      };
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
