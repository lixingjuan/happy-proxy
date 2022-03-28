import { useState, useEffect, useCallback } from "react";
import { message, Switch } from "antd";

const SwitchButton = () => {
  const [checked, setChecked] = useState(true);

  const updateBackground = useCallback(() => {
    if (chrome.runtime) {
      chrome.runtime.sendMessage(
        {
          action: "Update_Proxy_Disabled",
          value: !checked,
        },
        (response) => {
          if (response.message === "success") {
            message.success("关闭成功！");
          }
        }
      );
    }
  }, [checked]);

  useEffect(() => {
    updateBackground();
  }, [checked, updateBackground]);

  return (
    <Switch
      checked={checked}
      onChange={setChecked}
      checkedChildren="开启"
      unCheckedChildren="关闭"
      style={{ width: "60px" }}
    />
  );
};

export default SwitchButton;
