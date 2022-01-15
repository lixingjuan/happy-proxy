import React, { useEffect } from "react";
import "./popup.styl";

function Popup() {
  useEffect(() => {
    // chrome.webRequest.onBeforeRequest(() => {}, "/demo", []);
  }, []);

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
