import { useEffect } from "react";
import { Button, Table, Modal, message, Spin } from "antd";
import { TableRowSelection } from "antd/lib/table/interface.d";

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
      width: 600,
      key: "url",
      render: (text: string) => {
        return (
          <>
            <span style={{ color: "#333", paddingLeft: "10px" }}>{text}</span>
            <Button
              key="copy"
              type="link"
              size="small"
              onClick={() => writeTextToClipboard(text)}
            >
              copy
            </Button>
          </>
        );
      },
    },
    {
      title: "文件地址",
      width: 200,
      dataIndex: "filePath",
      key: "filePath",
      render: (text: string) => (
        <>
          <DetailModal filePath={text} />
          <Button
            key="copy"
            type="link"
            size="small"
            onClick={() => writeTextToClipboard(text)}
          >
            copy
          </Button>
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 60,
      fixed: "right" as TableRowSelection<string>["fixed"],
      render: (text: string, record: any) => (
        <Button
          danger
          size="small"
          type="link"
          onClick={() => onDelete(record.url)}
        >
          Delete
        </Button>
      ),
    },
  ];

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
