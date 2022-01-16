import React, { useState, useEffect } from "react";
import "./popup.styl";
import { Input } from "antd";
import ReactDOM from "react-dom";

import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";

const { TextArea } = Input;

const initSourceUrl =
  "https://gw.datayes-stg.com/ams_monitor_qa/web/industry/prosperity/comparison-chart/selection";
const initTargetUrl =
  "http://127.0.0.1:4000/ams_monitor_qa/web/industry/prosperity/comparison-chart/selection";

function Option() {
  const [sourceUrl, setSourceUrl] = useState(initSourceUrl);
  const [targetUrl, setTargetUrl] = useState(initTargetUrl);

  return (
    <div>
      <div
        style={{
          width: "100vw",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        <div style={{ textAlign: "center", padding: "20px" }}>
          <h2>sourceUrl</h2>
          <TextArea
            value={sourceUrl}
            style={{ width: "100%" }}
            onChange={(e) => setSourceUrl(e.target.value)}
          />
        </div>
        <div style={{ textAlign: "center", padding: "20px" }}>
          <h2>targetUrl</h2>
          <TextArea
            value={targetUrl}
            style={{ width: "100%" }}
            onChange={(e) => setTargetUrl(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

const antdConfig = {
  locale: zhCN,
};

ReactDOM.render(
  <ConfigProvider {...antdConfig}>
    <Option />
  </ConfigProvider>,
  document.getElementById("root")
);
