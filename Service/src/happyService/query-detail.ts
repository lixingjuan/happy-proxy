import jsonfile from 'jsonfile';

import { ErrorRes, getLocalFilePath, SuccessRes } from '../utils';

const queryDetail = async (configUrl: string) => {
  if (!configUrl) return new ErrorRes(null, 'not exist');

  const localFilePath = getLocalFilePath(configUrl);
  if (!localFilePath) return new ErrorRes(null, 'no local data');

  try {
    const localFileContent = jsonfile.readFileSync(localFilePath);
    return new SuccessRes(localFileContent);
  } catch (error) {
    return new ErrorRes(null, (error as Error).message);
  }
};

export default queryDetail;
