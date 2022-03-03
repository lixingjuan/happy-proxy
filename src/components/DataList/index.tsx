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

  /** 删除一条记录 */
  const onDelete = (url: string) => {
    if (!url) {
      message.error("url不能为空");
      return;
    }

    deleteItemApi(url)
      .then(() => {
        message.success("删除成功");
        onUpdate();
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
      width: 250,
      fixed: "right",
      render: (text: string, record: any) => (
        <Space size="small" align="center">
          <Button
            danger
            size="small"
            type="link"
            onClick={() => onDelete(record.url)}
          >
            Delete
          </Button>
          <Button
            key="copy"
            type="link"
            size="small"
            onClick={() => writeTextToClipboard(record.filePath)}
          >
            复制文件地址
          </Button>
          <Button
            key="copy"
            type="link"
            size="small"
            onClick={() => writeTextToClipboard(record.url)}
          >
            复制url
          </Button>
        </Space>
      ),
    },
  ] as any;

  useEffect(() => onUpdate(), [onUpdate]);

  return (
    <Spin spinning={isLoading}>
      <Table
        bordered
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
