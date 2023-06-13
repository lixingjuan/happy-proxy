import { happyService } from 'src/constants';

export const isUrl = (val: string) =>
  /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/.test(
    val
  ) || /^((https?):\/\/)?(localhost:\d)/.test(val);

/** 根据提供的url, 获取目标url */
export const getProxyTarget = (originalUrl: string) => {
  let target = happyService;
  try {
    const theOrigin = originalUrl && new URL(originalUrl).origin;
    target = originalUrl.replace(theOrigin, happyService);
  } catch (error) {}

  return target;
};

export const getErrorMsg = (originalUrl: string, hasAddedOriginalUrlSet: Set<string>) => {
  if (!originalUrl) {
    return '不能为空';
  }

  if (!isUrl(originalUrl)) {
    return '非合法url';
  }

  if (hasAddedOriginalUrlSet.has(originalUrl)) {
    return '该配置已存在！';
  }

  return '';
};
