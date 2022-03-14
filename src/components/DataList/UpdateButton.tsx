import { Tooltip, Button } from "antd";
import { SyncOutlined } from "@ant-design/icons";

interface Props {
  onUpdate: () => void;
  isLoading: boolean;
}
const UpdateButton = ({ onUpdate, isLoading }: Props) => {
  return (
    <Tooltip title="更新列表">
      <Button onClick={onUpdate} size="small">
        <SyncOutlined spin={isLoading} />
      </Button>
    </Tooltip>
  );
};

export default UpdateButton;
