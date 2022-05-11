import React from "react";
import ReactDOM from "react-dom/client";
import "./style/index.less";
import "./assets/font/iconfont";
import App from "./App";
import { Toaster } from "react-hot-toast";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container as HTMLElement);

root.render(
  <React.StrictMode>
    <Toaster />
    <App />
  </React.StrictMode>
);
