import { message } from 'antd';
import type { LocalProxyItem } from 'src/types';

/** 更新background */
export const updateBackground = (proxyList: LocalProxyItem[]) => {
  if (!chrome?.runtime || !chrome.runtime.sendMessage) {
    return;
  }

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
