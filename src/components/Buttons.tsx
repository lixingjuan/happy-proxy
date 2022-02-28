import { Space } from "antd";
import AddButton from "./AddButton";
import ConfigInput from "./ConfigInput";
import SwitchButton from "./SwitchButton";
import UpdateButton from "./UpdateButton";
import DeleteAllButton from "./DeleteAllButton";

const Buttons = ({ onUpdate }: any) => {
  return (
    <Space size="small">
      <ConfigInput />
      <DeleteAllButton key="DeleteAllButton" />
      <UpdateButton key="UpdateButton" onUpdate={onUpdate} />
      <AddButton key="AddButton" onUpdate={onUpdate} />
      <SwitchButton key="SwitchButton" />
    </Space>
  );
};

export default Buttons;
