import { useState } from "react";
import { Switch } from "antd";
import toast from "react-hot-toast";

const getDefault = () => {
  return localStorage.getItem("ExtensionIsOpen") === "true";
};

const SwitchButton = () => {
  const [checked, setChecked] = useState(getDefault());

  const updateBackground = (nextStatus: boolean) => {
    if (chrome.runtime) {
      chrome.runtime.sendMessage(
        {
          action: "Update_Proxy_Disabled",
          value: !nextStatus,
        },
        (response) => {
          if (response.message === "success") {
            if (nextStatus) {
              toast.success("已打开");
            } else {
              toast.success("已关闭");
            }
          }
        }
      );
    }
  };

  const updateLocal = (nextStatus: boolean) => {
    localStorage.setItem("ExtensionIsOpen", nextStatus.toString());
  };

  const onChange = (nextStatus: boolean) => {
    setChecked(nextStatus);
    updateLocal(nextStatus);
    updateBackground(nextStatus);
  };

  return (
    <Switch
      checked={checked}
      onChange={onChange}
      checkedChildren="开启"
      unCheckedChildren="关闭"
      style={{ width: "60px" }}
    />
  );
};

export default SwitchButton;
