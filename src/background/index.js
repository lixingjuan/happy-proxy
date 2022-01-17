export const demo = ({ sourceUrl, targetUrl, cookie, targetBaseUrl }) => {
  // if (sourceUrl || targetUrl || cookie) {
  //   console.error("输入有误");
  //   return;
  // }

  chrome.webRequest.onBeforeRequest.addListener(
    (details) => {
      console.log("onBeforeRequest", details);

      return {
        redirectUrl: targetUrl,
      };
    },
    {
      urls: [sourceUrl],
    },
    ["blocking", "requestBody"]
  );

  chrome.webRequest.onBeforeSendHeaders.addListener(
    (details) => {
      console.log("onBeforeSendHeaders", details);
      details.headers.push({
        name: "cookie",
        value: cookie,
      });

      return {
        requestHeaders: details.requestHeaders,
      };
    },
    {
      urls: [targetUrl],
    },
    ["blocking", "requestHeaders", "extraHeaders"]
  );
};
