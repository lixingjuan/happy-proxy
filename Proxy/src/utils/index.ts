import { LocalProxyItem } from 'src/types';

export const isUrl = (val: string) =>
  /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/.test(
    val
  );

export const getLocalProxy = (): LocalProxyItem[] => {
  try {
    const local = localStorage.getItem('proxyConfig');

    const parseLocal = local ? JSON.parse(local) : '';

    if (local && Array.isArray(parseLocal) && parseLocal.length > 0) {
      return parseLocal;
    }

    return [];
  } catch (error) {
    return [];
  }
};

export const setLocalProxy = (val: LocalProxyItem[]) => {
  try {
    localStorage.setItem('proxyConfig', JSON.stringify(val));
  } catch (error) {
    localStorage.setItem('proxyConfig', '[]');
  }
};

/**
 * 获取二级域名
 * "gw.datayes-stg.com" => '.datayes-stg.com'
 */
export const getCookieDomain = (url: string): string => {
  try {
    const origin = new URL(url).origin;
    return `.${origin.split('.').slice(-2).join('.')}`;
  } catch {
    return '';
  }
};
