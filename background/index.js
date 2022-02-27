window.proxyDisabled = "";
window.proxyConfig = [];
window.clearRunning = false;

window.happyCookie = "";
window.happyCookieDomain = "";

/* ****************************************************************************************************
 *                                    监听前台发送的信息
 ************************************************************************************************* */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { action, value } = request;

  /** 更新cookie对应的域名 */
  if (action === "Update_Happy_Cookie_Domain") {
    window.happyCookieDomain = value;
    console.log("window.happyCookieDomain", window.happyCookieDomain);

    sendResponse({
      message: "success",
    });
  }

  /** 更新cookie */
  if (action === "Update_Happy_Cookie") {
    window.happyCookie = value;
    console.log("Update_Proxy_Config", Update_Happy_Cookie);
    sendResponse({
      message: "success",
    });
  }

  /** 转发配置 */
  if (action === "Update_Proxy_Config") {
    window.proxyConfig = JSON.parse(value);
    console.log("Update_Proxy_Config", value);
    sendResponse({
      message: "success",
    });
  }

  /** 禁止/开启 */
  if (action === "Update_Proxy_Disabled") {
    window.proxyDisabled = value;
    setIcon();
    sendResponse({
      message: "success",
    });
  }
});

/* ****************************************************************************************************
 *                                    监听cookie & cookieDomain 变化，实时更新happyCookie的值
 ************************************************************************************************* */

chrome.cookies.getAll({ domain: val }, (res) => {
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
 *                                    工具函数
 ************************************************************************************************* */

/** 当前拦截规则的数量 */
function setIcon() {
  let text = "";
  const cba = chrome.browserAction;

  const icon =
    window.proxyDisabled !== "disabled" &&
    window.proxyConfig.proxy &&
    window.proxyConfig.proxy.length;

  if (icon) {
    text = window.proxyConfig.proxy.length;
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
 *                                    监听事件
 ************************************************************************************************* */
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    if (window.proxyDisabled !== "disabled") {
      clearCache();
      return window.onBeforeRequestCallback(details);
    }
    return {};
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
