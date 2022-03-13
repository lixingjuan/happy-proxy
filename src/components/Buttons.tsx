import { Space } from "antd";
import AddButton from "./AddButton";
import ConfigInput from "./ConfigInput";
import SwitchButton from "./SwitchButton";
import UpdateButton from "./UpdateButton";
import DeleteAllButton from "./DeleteAllButton";

interface Props {
  onUpdate: () => void;
  isLoading: boolean;
}
const Buttons = ({ onUpdate, isLoading }: Props) => {
  return (
    <Space size="small">
      <ConfigInput />
      <DeleteAllButton key="DeleteAllButton" />
      <UpdateButton
        key="UpdateButton"
        onUpdate={onUpdate}
        isLoading={isLoading}
      />
      <AddButton key="AddButton" onUpdate={onUpdate} />
      <SwitchButton key="SwitchButton" />
    </Space>
  );
};

export default Buttons;
