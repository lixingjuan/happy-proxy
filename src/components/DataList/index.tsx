import { useEffect } from "react";
import { Button, Table, Modal, Space, message, Spin } from "antd";
import DetailModal from "./DetailModal";

import { writeTextToClipboard } from "../../utils";
import { deleteItemApi } from "../../service";

interface Props {
  onUpdate: () => void;
  isLoading: boolean;
  dataSource: { url: string; filePath: string }[];
}

const DataList = (props: Props) => {
  const { onUpdate, dataSource, isLoading } = props;

  const onDelete = (url: string) => {
    deleteItemApi(url)
      .then(() => {
        message.success("删除成功");
      })
      .catch((err: any) => message.error(err.message));
  };

  const columns = [
    {
      title: "接口",
      dataIndex: "url",
      key: "url",
      width: 500,
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: "文件地址",
      width: 300,
      dataIndex: "filePath",
      key: "filePath",
      render: (text: string) => <DetailModal filePath={text} />,
    },
    {
      title: "Action",
      key: "url",
      width: 120,
      render: (text: string, record: any) => (
        <Space size="small">
          <Button
            key="copy"
            type="link"
            size="small"
            onClick={() => writeTextToClipboard(record.filePath)}
          >
            复制文件地址
          </Button>
          <Button
            danger
            size="small"
            type="link"
            onClick={() => onDelete(record.url)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => onUpdate(), [onUpdate]);

  return (
    <Spin spinning={isLoading}>
      <Table
        size="small"
        columns={columns}
        pagination={false}
        dataSource={dataSource}
        scroll={{ y: "calc(100vh - 150px)" }}
      />
      <Modal>确认删除？</Modal>
    </Spin>
  );
};

export default DataList;