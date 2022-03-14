import { Space } from "antd";
import ConfigInput from "./ConfigInput";
import SwitchButton from "./SwitchButton";

const Buttons = () => {
  return (
    <Space size="small">
      <ConfigInput />

      <SwitchButton key="SwitchButton" />
    </Space>
  );
};

export default Buttons;
