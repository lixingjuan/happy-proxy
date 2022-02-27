import { Switch } from "antd";
import { useState } from "react";

const SwitchButton = () => {
  const [checked, setChecked] = useState(true);

  const onChange = () => {
    const nextStatus = !checked;
    setChecked(nextStatus);

    chrome.runtime.sendMessage(
      {
        action: "Update_Proxy_Disabled",
        value: nextStatus === true ? "on" : "disabled",
      },
      (response) => {
        if (response.message === "success") {
          console.log("Update_Proxy_Disabled", "更新成功");
        }
      }
    );
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
