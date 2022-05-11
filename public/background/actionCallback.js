const actionCallback = {
  /** 更新cookie对应的域名 */
  Update_Happy_Cookie_Domain: (value, sendResponse) => {
    window.happyCookieDomain = value;
    console.log("window.happyCookieDomain", value);
    sendResponse({ message: "success" });
  },

  /** 更新cookie */
  Update_Happy_Cookie: (value, sendResponse) => {
    window.happyCookie = value;
    console.log("Update_Happy_Cookie", value);
    sendResponse({ message: "success" });
  },

  /** 更新转发配置 */
  Update_Proxy_Config: (value, sendResponse) => {
    try {
      window.proxyConfig = JSON.parse(value);
      console.log("Update_Proxy_Config", value);
      sendResponse({ message: "success" });
      setIcon();
    } catch (error) {
      window.proxyConfig = [];
      sendResponse({
        message: "fail",
      });
    }
  },

  /** 禁止/开启 */
  Update_Proxy_Disabled: (value, sendResponse) => {
    window.proxyDisabled = value;
    console.log("Update_Proxy_Disabled", value);
    setIcon();
    sendResponse({
      message: "success",
    });
  },

  /** 更新cookie对应的域名列表 */
  Update_Happy_Cookie_Domains: (value, sendResponse) => {
    window.happyCookieDomain = value;
    console.log("window.happyCookieDomains", value);
    sendResponse({ message: "success" });
  },
};

window.actionCallback = actionCallback;
