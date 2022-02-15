import { Switch } from "antd";
import { useState } from "react";

const SwitchButton = () => {
  const [checked, setChecked] = useState(true);

  const onChange = () => {
    const nextStatus = !checked;
    setChecked(nextStatus);

    if (chrome?.storage?.sync?.set) {
      chrome.storage.sync.set({
        disabled: nextStatus ? "" : "disabled",
      });
    }
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
