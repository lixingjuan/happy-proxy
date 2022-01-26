chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    console.log("onBeforeRequest", details);

    console.log("ceeee", {
      filterUrls,
      targetUrls,
    });

    const { pathname } = new URL(details.url);
    const targetUrl = `${targetDomain}${pathname}`;

    return {};
    // return {
    //   redirectUrl: targetUrl,
    // };
  },
  { urls: filterUrls },
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
