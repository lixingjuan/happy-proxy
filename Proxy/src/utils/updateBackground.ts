import { message } from 'antd';
import type { LocalProxyItem } from 'src/types';

/** 更新background */
export const updateBackground = (proxyList: LocalProxyItem[], showMessage = true) => {
  if (!chrome?.runtime || !chrome.runtime.sendMessage) {
    return;
  }

  const proxyConfigMap = proxyList.reduce((pre, cur) => {
    if (cur.open) {
      return {
        ...pre,
        [cur.originalUrl]: cur
      };
    }
    return pre;
  }, {});

  chrome.runtime.sendMessage(
    {
      action: 'Update_Proxy_Config_Map',
      value: proxyConfigMap
    },
    (response) => {
      if (response?.message === 'success') {
        console.log('更新后的', proxyConfigMap);
      }
    }
  );
};
