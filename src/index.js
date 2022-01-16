import React from "react";
import ReactDOM from "react-dom";
import Popup from "./popup/index.tsx";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";

const antdConfig = {
  locale: zhCN,
};

ReactDOM.render(
  <ConfigProvider {...antdConfig}>
    <Popup />
  </ConfigProvider>,
  document.getElementById("root")
);
