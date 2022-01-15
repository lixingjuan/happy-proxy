import { apiRequest } from "@/api";

const sourceUrl =
  "https://gw.datayes-stg.com/ams_monitor_qa/web/industry/prosperity/comparison-chart/selection";
const targetUrl =
  "http://127.0.0.1:4000/ams_monitor_qa/web/industry/prosperity/comparison-chart/selection";

chrome.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    console.log("onBeforeSendHeaders details", details);

    return {
      requestHeaders: details.requestHeaders,
      redirectUrl: targetUrl,
    };
  },
  {
    urls: [sourceUrl],
  },
  ["blocking", "requestHeaders", "extraHeaders"]
);
