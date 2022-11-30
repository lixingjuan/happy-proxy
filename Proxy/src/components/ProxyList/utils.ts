import { message } from 'antd';

export type LocalProxyItem = {
  original: string;
  target: string;
  open: boolean;
  tags: string[];
  cookiesMap: Record<string, string>;
};

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

/** 更新本地 proxy-config */
export const updateLocalProxy = (val: LocalProxyItem[]) => {
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

/** 更新background */
export const updateBackground = (proxyList: LocalProxyItem[]) => {
  if (!chrome?.runtime || !chrome.runtime.sendMessage) {
    return;
  }

  // 过滤当前为真的
  const formattedValues = (proxyList || []).reduce((tol, cur) => {
    if (cur.open) {
      tol.push([cur.original, cur.target, cur.cookiesMap]);
    }
    return tol;
  }, [] as [string, string, Record<string, string>][]);

  chrome.runtime.sendMessage(
    {
      action: 'Update_Proxy_Config',
      value: formattedValues
    },
    (response) => {
      if (response.message === 'success') {
        message.success('proxy urls 更新成功');
      } else {
        message.error(`更新失败${response.message}`);
      }
    }
  );

  // FIXME:
  const proxyConfigMap = proxyList.reduce(
    (tol, cur) => ({
      ...tol,
      [cur.original]: cur
    }),
    {}
  );

  chrome.runtime.sendMessage(
    {
      action: 'Update_Proxy_Config_Map',
      value: proxyConfigMap
    },
    (response) => {
      if (response.message === 'success') {
        message.success('proxy urls 更新成功');
      } else {
        message.error(`更新失败${response.message}`);
      }
    }
  );
};
