/** 当前拦截规则的数量 */
function setIcon() {
  let text = '';
  const cba = chrome.browserAction;

  const showIconNumber = window.proxyDisabled === false && window?.proxyConfig?.length;

  if (showIconNumber) {
    text = window.proxyConfig.length;
  }

  if (cba) {
    cba.setBadgeText({
      text: '' + text
    });
  }
}

const actionCallback = {
  /** 更新转发配置 */
  Update_Proxy_Config_Map: (value, sendResponse) => {
    try {
      window.proxyConfigMap = value;
      console.log('Update_Proxy_Config_Map', value);
      sendResponse({ message: 'success' });
      setIcon();
    } catch (error) {
      window.proxyConfigMap = {};
      sendResponse({ message: error.message });
    }
  },

  /** 禁止/开启 */
  Update_Proxy_Disabled: (value, sendResponse) => {
    window.proxyDisabled = value;
    console.log('Update_Proxy_Disabled', value);
    setIcon();
    sendResponse({
      message: 'success'
    });
  }
};

window.actionCallback = actionCallback;
