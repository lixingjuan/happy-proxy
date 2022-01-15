import React, { useEffect } from "react";
import "./popup.styl";

const sourceUrl =
  "https://gw.datayes-stg.com/ams_monitor_qa/web/industry/prosperity/comparison-chart/selection";
const targetUrl =
  "http://127.0.0.1:4000/ams_monitor_qa/web/industry/prosperity/comparison-chart/selection";

const filter = `*://*/*`;

function Popup() {
  chrome.webRequest.onBeforeRequest.addListener(
    (details) => {
      console.log("onBeforeRequest", details);

      return {
        redirectUrl: sourceUrl,
      };
    },
    {
      urls: [sourceUrl],
    },
    ["blocking", "requestBody", "extraHeaders"]
  );

  return (
    <div>
      <div>Hello, World!</div>
      <ol>
        <li>拦截</li>
        <li>拦截</li>
      </ol>
    </div>
  );
}

export default Popup;
