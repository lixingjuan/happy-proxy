import { LocalProxyItem } from 'src/types';

export const isUrl = (val: string) =>
  /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/.test(
    val
  ) || /^((https?):\/\/)?(localhost:\d)/.test(val);

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
