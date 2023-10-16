import { updateOneResposne, saveResponseToLocalNew, SuccessRes, getLocalFilePath } from '../utils';

/** update url对应的本地数据 */
const updateRecordDetailApi = async (newFileContent: {
  proxyUrl: string;
  response: Record<string, any>;
  method: string;
}) => {
  const { proxyUrl, response, method } = newFileContent;
  const filePath = getLocalFilePath(proxyUrl);

  // 如果本地有，则更新
  if (filePath) {
    updateOneResposne(filePath, newFileContent);
    return new SuccessRes();
  }

  // 如果没有该条数据，则创建
  const localFileContent = {
    response,
    method,
    payload: null,
    proxyUrl: proxyUrl
  };
  saveResponseToLocalNew(proxyUrl, localFileContent);
  return new SuccessRes({
    content: localFileContent,
    message: '本地无该接口对应response文件，已创建'
  });
};

export default updateRecordDetailApi;
