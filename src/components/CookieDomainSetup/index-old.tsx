import { Form, Button, Popover } from "antd";
import toast from "react-hot-toast";
import styled from "styled-components";
import Content from "./Content";

type ValueItem = {
  original: string;
  target: string;
  open: boolean;
};

/** 更新background */
const updateBackground = (config: string) => {
  if (chrome?.runtime) {
    chrome.runtime.sendMessage(
      {
        action: "Update_Proxy_Config",
        value: config,
      },
      (response) => {
        if (response.message === "success") {
          toast.success("proxy urls 更新成功");
        } else {
          toast.error(response.message);
        }
      }
    );
  }
};

/** 更新本地 */
const updateLocal = (val: string) => {
  localStorage.setItem("proxyConfig", val);
};

const Demo = () => {
  return (
    <Popover
      placement="topLeft"
      content={<Content />}
      trigger="click"
      overlayStyle={{ width: "500px" }}
    >
      <Button style={{ position: "absolute", left: "10px", top: "60px", zIndex: 5 }}>
        需要携带http-only的domain
      </Button>
    </Popover>
  );
};

export default Demo;
