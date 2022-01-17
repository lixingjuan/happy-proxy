import React, { useState, useEffect } from "react";
import "./options.less";
import { Input } from "antd";
import ReactDOM from "react-dom";
import { ConfigProvider } from "antd";

import zhCN from "antd/es/locale/zh_CN";
import { demo } from "../background";

const { TextArea } = Input;

const initSourceUrl =
  "https://gw.datayes-stg.com/ams_monitor_qa/web/industry/prosperity/comparison-chart/selection";
const initTargetUrl =
  "http://127.0.0.1:4000/ams_monitor_qa/web/industry/prosperity/comparison-chart/selection";

function Option() {
  const [sourceUrl, setSourceUrl] = useState(initSourceUrl);
  const [targetUrl, setTargetUrl] = useState(initTargetUrl);
  const [cookie, setCookie] = useState("");
  const [targetBaseUrl, setTargetBaseUrl] = useState("");

  useEffect(() => {
    demo({
      sourceUrl,
      targetUrl,
      cookie,
      targetBaseUrl,
    });
  }, [sourceUrl, targetBaseUrl]);

  return (
    <div className="wrapper">
      {/* <ul className="configs">
        <li>
          <span>cookie</span>
          <input value={cookie} onChange={(e) => setCookie(e.target.value)} />
        </li>

        <li>
          <span>targetBaseUrl(eg: http://example.com)</span>
          <input
            value={cookie}
            onChange={(e) => setTargetBaseUrl(e.target.value)}
          />
        </li>
      </ul> */}

      <div
        style={{
          width: "100vw",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
        className="urls"
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
