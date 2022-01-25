/** 本地存储的urls的key */
const localUrlKey = "LOCAL_URLS";
const targetDomain = "http://127.0.0.1:4000";

function initBackground() {
  chrome.storage.sync.get(localUrlKey, function (val) {
    // TODO 这两个变量应该可以在页面配置
    let originalDomain = "https://gw.datayes-stg.com";
    const localUrls = val[localUrlKey];

    // 需要拦截的Urls列表
    const filterUrls = JSON.parse(localUrls);

    // 重定向后的urls列表
    const targetUrls = filterUrls.map((it) => {
      const { origin } = new URL(it);
      originalDomain = origin;
      return it.replace(origin, targetDomain);
    });

    console.log({
      filterUrls,
      targetUrls,
      originalDomain,
    });

    getCookie({
      filterUrls,
      targetUrls,
      originalDomain,
    });
  });
}

function getCookie({ filterUrls, targetUrls, originalDomain }) {
  chrome.cookies.getAll(
    {
      domain: ".datayes-stg.com",
      name: "cloud-sso-token",
    },
    (res) => {
      console.log({ res });
      cookie = res.find((it) => it.name === "cloud-sso-token")?.value;
      console.log({ cookie });
      initWebrequest({ filterUrls, targetUrls, originalDomain, cookie });
    }
  );
}

function initWebrequest({ filterUrls, targetUrls, originalDomain, cookie }) {
  chrome.webRequest.onBeforeRequest.addListener(
    (details) => {
      console.log("onBeforeRequest", details);
      const { pathname } = new URL(details.url);
      const targetUrl = `${targetDomain}${pathname}`;

      return {
        redirectUrl: targetUrl,
      };
    },
    {
      urls: filterUrls,
    },
    ["blocking", "requestBody"]
  );

  chrome.webRequest.onBeforeSendHeaders.addListener(
    (details) => {
      console.log("收到 onBeforeSendHeaders", details);

      const { requestHeaders = [] } = details;

      const filteredHeader = requestHeaders.filter(
        (it) => !["cookie"].includes(it.name.toLocaleLowerCase())
      );

      const customHeaders = [
        {
          name: "Domain",
          value: originalDomain,
        },
        {
          name: "Cookie",
          value: cookie,
        },
      ];

      const headers = [...filteredHeader, ...customHeaders];

      console.log("返回 onBeforeSendHeaders", details);

      return {
        requestHeaders: headers,
      };
    },
    {
      urls: targetUrls,
    },
    ["blocking", "requestHeaders", "extraHeaders"]
  );
}

initBackground();

chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    console.log(
      `Storage key "${key}" in namespace "${namespace}" changed.`,
      `Old value was "${oldValue}", new value is "${newValue}".`
    );
  }
});
