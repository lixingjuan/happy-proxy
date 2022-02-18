window.proxyDisabled = "";
window.clearRunning = false;
if (chrome) {
  chrome.storage.sync.get("config", (result) => {
    try {
      window.proxyConfig = JSON.parse(result.config);
    } catch (e) {
      console.warn("can not parse config", result.config);
      window.proxyConfig.proxy = [];
    }
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

      if (
        happyDomain &&
        happyDomain.includes(happyCookieDomain) &&
        details.url.startsWith("http://127.0.0.1:4000")
      ) {
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
}
