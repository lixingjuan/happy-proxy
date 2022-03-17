import { Space } from "antd";
import ConfigInput from "./ConfigInput";
import SwitchButton from "./SwitchButton";
import AlertError from "./AlertError";

const Buttons = () => {
  return (
    <Space size="small">
      <AlertError />
      <ConfigInput />
      <SwitchButton key="SwitchButton" />
    </Space>
  );
};

export default Buttons;
