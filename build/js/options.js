// TODO 这两个变量应该可以在页面配置
const originalDomain = "https://gw.datayes-stg.com";
const targetDomain = "http://127.0.0.1:4000";

chrome.cookies.getAll(
  {
    domain: ".datayes-stg.com",
    name: "cloud-sso-token",
  },
  (res) => {
    console.log({ res });
    cookie = res.find((it) => it.name === "cloud-sso-token")?.value;
    console.log({ cookie });
    demo(cookie);
  }
);

const demo = async function (cookie) {
  const sourceUrl =
    "https://gw.datayes-stg.com/ams_monitor_qa/web/industry/prosperity/comparison-chart/selection";
  const targetUrl =
    "http://127.0.0.1:4000/ams_monitor_qa/web/industry/prosperity/comparison-chart/selection";

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
      urls: [sourceUrl],
    },
    ["blocking", "requestBody"]
  );

  chrome.webRequest.onBeforeSendHeaders.addListener(
    (details) => {
      console.log("收到 onBeforeSendHeaders", details);

      const { requestHeaders = [], initiator = "" } = details;

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
      urls: [targetUrl],
    },
    ["blocking", "requestHeaders", "extraHeaders"]
  );
};
