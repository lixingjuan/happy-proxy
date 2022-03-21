import { Button, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

interface Props {
  selected: string[];
}

const DataList = ({ selected }: Props) => {
  return (
    <Tooltip title="删除选中的记录">
      <Button
        danger
        size="small"
        // onClick={() => }
      >
        <DeleteOutlined />
      </Button>
    </Tooltip>
  );
};

export default DataList;
