import React, { useEffect } from "react";
import "./popup.styl";
import ReactDOM from "react-dom";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";

function Popup() {
  return <div>POPUP</div>;
}

const antdConfig = {
  locale: zhCN,
};

ReactDOM.render(
  <ConfigProvider {...antdConfig}>
    <Popup />
  </ConfigProvider>,
  document.getElementById("root")
);
