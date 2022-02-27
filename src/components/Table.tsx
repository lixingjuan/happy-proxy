import { Button, Table, Modal, Space, message } from "antd";
import { useEffect } from "react";
import { writeTextToClipboard } from "../utils";
import { deleteItemApi } from "../service";

interface Props {
  onUpdate: () => void;
  dataSource: { url: string; filePath: string }[];
}
const Demo = (props: Props) => {
  const { onUpdate, dataSource } = props;

  const onDelete = (url: string) => {
    deleteItemApi(url)
      .then(() => {
        message.success("删除成功");
      })
      .catch((err) => message.error(err.message));
  };

  const columns = [
    {
      title: "接口",
      dataIndex: "url",
      key: "url",
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: "文件地址",
      dataIndex: "filePath",
      key: "filePath",
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      render: (text: string, record: any) => (
        <Space size="middle">
          <Button
            key="copy"
            type="link"
            onClick={() => writeTextToClipboard(record.filePath)}
          >
            Copy
          </Button>
          <Button onClick={() => onDelete(record.url)}>Delete</Button>
        </Space>
      ),
    },
  ];

  useEffect(() => onUpdate(), [onUpdate]);

  return (
    <div>
      <Table
        size="small"
        columns={columns}
        dataSource={dataSource}
        scroll={{ y: "calc(100vh - 150px)" }}
        pagination={false}
      />
      <Modal>确认删除？</Modal>
    </div>
  );
};

export default Demo;
