const sourceUrl =
  "https://gw.datayes-stg.com/ams_monitor_qa/web/industry/prosperity/comparison-chart/selection";
const targetUrl =
  "http://127.0.0.1:4000/ams_monitor_qa/web/industry/prosperity/comparison-chart/selection";

// chrome.webRequest.onBeforeRequest.addListener(
//   (details) => {
//     console.log("onBeforeRequest", details);

//     return {
//       redirectUrl: targetUrl,
//     };
//   },
//   {
//     urls: [sourceUrl],
//   },
//   ["blocking", "requestBody"]
// );

// chrome.webRequest.onBeforeSendHeaders.addListener(
//   (details) => {
//     console.log("onBeforeSendHeaders", details);
//     details.headers.push({
//       name: "cookie",
//       value: cookie,
//     });

//     return {
//       requestHeaders: details.requestHeaders,
//     };
//   },
//   {
//     urls: [targetUrl],
//   },
//   ["blocking", "requestHeaders", "extraHeaders"]
// );

//   .addListener(
//   (details) => {
//     console.log("onBeforeSendHeaders", details);
//     details.headers.push({
//       name: "cookie",
//       value: cookie,
//     });

//     return {
//       requestHeaders: details.requestHeaders,
//     };
//   },
//   {
//     urls: [targetUrl],
//   },
//   ["blocking", "requestHeaders", "extraHeaders"]
// );

console.log("222");

const domain = new URL("http://roboams-ci.respool2.wmcloud-qa.com").hostname;

// const res = chrome.cookies.getAll({ domain });

// chrome.cookies.get({}, (res) => console.log({ res }));
// chrome.cookies.get({}, (res) => console.log({ res }));

chrome.cookies.getAllCookieStores((res) => console.log({ res }));
