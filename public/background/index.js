window.proxyDisabled = false; // 打开：on, 关闭：disabled
window.proxyConfig = [];
window.clearRunning = false;

window.happyCookie = "";
window.happyCookieDomain = "";
window.happyCookieDomains = [];

/* ****************************************************************************************************
 *                                    工具函数
 ************************************************************************************************* */

/** 当前拦截规则的数量 */
function setIcon() {
  let text = "";
  const cba = chrome.browserAction;

  const showIconNumber =
    window.proxyDisabled === false && window?.proxyConfig?.length;

  if (showIconNumber) {
    text = window.proxyConfig.length;
  }

  if (cba) {
    cba.setBadgeText({
      text: "" + text,
    });
  }
}

function clearCache() {
  if (!window.clearRunning) {
    window.clearRunning = true;
    const millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
    const oneWeekAgo = new Date().getTime() - millisecondsPerWeek;
    chrome.browsingData.removeCache(
      {
        since: oneWeekAgo,
      },
      () => {
        window.clearRunning = false;
      }
    );
  }
}

/* ****************************************************************************************************
 *                                    初始化监听前台发送的信息
 ************************************************************************************************* */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { action, value } = request;
  console.log({ action, value });

  /** 更新cookie对应的域名 */
  if (action === "Update_Happy_Cookie_Domain") {
    window.happyCookieDomain = value;
    console.log("window.happyCookieDomain", value);

    sendResponse({
      message: "success",
    });
  }

  /** 更新cookie对应的域名列表 */
  // if (action === "Update_Happy_Cookie_Domains") {
  //   window.happyCookieDomain = value;
  //   console.log("window.happyCookieDomains", value);

  //   sendResponse({
  //     message: "success",
  //   });
  // }

  /** 更新cookie */
  if (action === "Update_Happy_Cookie") {
    window.happyCookie = value;
    console.log("Update_Happy_Cookie", value);
    sendResponse({
      message: "success",
    });
  }

  /** 更新转发配置 */
  if (action === "Update_Proxy_Config") {
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
  }

  /** 禁止/开启 */
  if (action === "Update_Proxy_Disabled") {
    window.proxyDisabled = value;
    console.log("Update_Proxy_Disabled", value);
    setIcon();
    sendResponse({
      message: "success",
    });
  }
});

/* ****************************************************************************************************
 *                                    监听cookie & cookieDomain 变化，实时更新happyCookie的值
 ************************************************************************************************* */

chrome.cookies.getAll({ domain: happyCookieDomain }, (res) => {
  const httpOnlyItems = res.find((it) => it.httpOnly && it.domain === val);

  if (httpOnlyItems) {
    const { name, value } = httpOnlyItems;
    const happyCookie = `${name}=${value}`;
    console.log("happyCookie update", { domain: val, happyCookie });
    window.happyCookie = happyCookie;
  }
});

chrome.cookies.onChanged.addListener((res) => {
  const { cookie } = res;
  const { domain, name, value, httpOnly } = cookie;

  const updateNotMine = domain !== happyCookieDomain || !httpOnly;
  if (updateNotMine) {
    return;
  }

  const newHappyCookie = `${name}=${value}`;
  window.console.log("happyCookie onChanged", {
    happyCookieDomain,
    newHappyCookie,
  });
  window.happyCookie = newHappyCookie;
});

/* ****************************************************************************************************
 *                                    监听事件
 ************************************************************************************************* */
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    if (window.proxyDisabled === true) {
      return {};
    }
    clearCache();
    return window.onBeforeRequestCallback(details);
  },
  {
    urls: ["<all_urls>"],
  },
  ["blocking"]
);

chrome.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    const happyCookieDomain = window.happyCookieDomain;

    let headers = [...(details.requestHeaders || [])];

    let happyCookie = window.happyCookie;

    const { happyDomain } = new URL(details.url).search
      .slice(1)
      .split("&")
      .reduce((tol, cur) => {
        const [key, value] = cur.split("=");
        Object.assign(tol, { [key]: value });
        return tol;
      }, {});

    const needHappyCookie =
      happyDomain &&
      happyDomain.includes(happyCookieDomain) &&
      details.url.startsWith("http://127.0.0.1:4000");

    if (needHappyCookie) {
      const currentItemCookie = headers.find(
        (h) => h.name.toLocaleLowerCase() === "cookie"
      );
      if (currentItemCookie) {
        happyCookie += currentItemCookie.value;
      }

      headers = [
        ...headers,
        {
          name: "Cookie",
          value: happyCookie || "",
        },
      ];
    }

    return { requestHeaders: headers };
  },
  {
    urls: ["<all_urls>"],
  },
  ["blocking", "requestHeaders", "extraHeaders"]
);
