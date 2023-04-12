import { message } from 'antd';
import type { LocalProxyItem } from 'src/types';

/** 更新background */
export const updateBackground = (proxyList: LocalProxyItem[], showMessage = true) => {
  if (!chrome?.runtime || !chrome.runtime.sendMessage) {
    return;
  }

  const proxyConfigMap = proxyList
    .filter((it) => it.open)
    .reduce(
      (tol, cur) => ({
        ...tol,
        [cur.beProxyUrl]: cur
      }),
      {}
    );

  chrome.runtime.sendMessage(
    {
      action: 'Update_Proxy_Config_Map',
      value: proxyConfigMap
    },
    (response) => {
      if (response?.message === 'success') {
        console.log({ proxyConfigMap });
        if (showMessage) {
          message.success('background proxyUrls 更新成功');
        }
      } else {
        if (showMessage) {
          message.error(`background 更新失败 ${response.message}`);
        }
      }
    }
  );
};
