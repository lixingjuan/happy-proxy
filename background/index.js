window.proxyDisabled = "";
window.clearRunning = false;
chrome.storage.sync.get("config", (result) => {
  try {
    window.proxyConfig = JSON.parse(result.config);
  } catch (e) {
    console.warn("can not parse config", result.config);
    window.proxyConfig.proxy = [];
  }
});

/** 获取根据用户输入域名从本地获取的cookie */
chrome.storage.sync.get("happyCookie", (res) => {
  try {
    window.happyCookie = res.happyCookie;
  } catch (e) {}
});

/** 获取用户输入的真实请求域名 */
chrome.storage.sync.get("happyDomain", (res) => {
  try {
    window.happyDomain = res.happyDomain;
  } catch (e) {}
});

function setIcon() {
  let text = "";
  const cba = chrome.browserAction;
  if (
    window.proxyDisabled !== "disabled" &&
    window.proxyConfig.proxy &&
    window.proxyConfig.proxy.length
  ) {
    text = window.proxyConfig.proxy.length;
  }

  if (cba) {
    cba.setBadgeText({
      text: "" + text,
    });
  }
}

chrome.storage.onChanged.addListener((changes) => {
  if (changes.config) {
    try {
      window.proxyConfig = JSON.parse(changes.config.newValue);
    } catch (e) {
      console.warn("can not parse fresh config", changes.config.newValue);
      window.proxyConfig.proxy = [];
    }
  }
  if (changes.disabled) {
    window.proxyDisabled = changes.disabled.newValue;
  }
  setIcon();
});

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

chrome.storage.sync.get("disabled", (result) => {
  window.proxyDisabled = result.disabled;
  setIcon();
});

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
    const { requestHeaders = [] } = details;

    const customHeaders = [
      {
        name: "happyCookie",
        value: window.happyCookie,
      },
      {
        name: "happyDomain",
        value: window.happyDomain,
      },
    ];

    const headers = [...requestHeaders, ...customHeaders];

    return { requestHeaders: headers };
  },
  {
    urls: ["<all_urls>"],
  },
  ["blocking", "requestHeaders", "extraHeaders"]
);
