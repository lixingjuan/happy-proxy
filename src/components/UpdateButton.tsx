import { Button } from "antd";
import { SyncOutlined } from "@ant-design/icons";

interface Props {
  onUpdate: () => void;
  isLoading: boolean;
}
const UpdateButton = ({ onUpdate, isLoading }: Props) => {
  return (
    <Button onClick={onUpdate} size="small" title="更新列表数据">
      <SyncOutlined spin={isLoading} />
    </Button>
  );
};

export default UpdateButton;
