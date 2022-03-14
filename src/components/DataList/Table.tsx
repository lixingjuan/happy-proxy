import { useEffect, useState } from "react";
import {
  Row,
  Table,
  Space,
  Button,
  Tooltip,
  message,
  Checkbox,
  Popconfirm,
} from "antd";
import moment from "moment";
import { TableRowSelection } from "antd/lib/table/interface.d";
import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";

import DetailDrawer from "./DrawerDetail";
import EditableTagGroup from "./Tags";
import { writeTextToClipboard } from "../../utils";
import { deleteItemApi } from "../../service";
import AddButton from "./AddButton";
import UpdateButton from "./UpdateButton";
// import DeleteSelected from "./DeleteSelected";

interface Props {
  onUpdate: () => void;
  isLoading: boolean;
  dataSource: { url: string; filePath: string }[];
}

const DataList = (props: Props) => {
  const { onUpdate, dataSource, isLoading } = props;
  const [selected, setSelected] = useState<string[]>([]);

  /** 删除一条记录 */
  const onDelete = (hash: string) => {
    if (!hash) {
      message.error("hash不能为空");
      return;
    }

    deleteItemApi(hash)
      .then(() => {
        message.success("删除成功");
        onUpdate();
      })
      .catch((err: any) => message.error(err.message));
  };

  /** 选中一条记录 */
  const onSelect = (nextStatus: boolean, hash: string) => {
    if (nextStatus) {
      setSelected((pre) => [...pre, hash]);
    } else {
      setSelected((pre) => pre.filter((it) => it !== hash));
    }
  };

  const columns = [
    {
      title: () => (
        <Row justify="center" align="middle">
          <span style={{ marginRight: "8px" }}>接口</span>
          <Tooltip title="点击文本即可复制">
            <QuestionCircleOutlined />
          </Tooltip>
        </Row>
      ),
      dataIndex: "url",
      key: "url",
      width: 800,
      render: (text: string) => {
        return (
          <>
            <span
              style={{
                color: "#333",
                wordBreak: "break-all",
              }}
              onClick={() => writeTextToClipboard(text)}
            >
              {text}
            </span>
          </>
        );
      },
      sorter: (a: any, b: any) => (a?.url || "").length - (b?.url || "").length,
    },
    {
      title: "文件地址",
      width: 340,
      dataIndex: "filePath",
      key: "filePath",
      render: (text: string, record: any) => (
        <>
          <DetailDrawer hash={record.hash} filePath={text} />
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
      title: "tags",
      width: 150,
      dataIndex: "tags",
      key: "tags",
      render: (text: string[], record: any) => (
        <EditableTagGroup defaultTags={text} hash={record.hash} />
      ),
      sorter: (a: any, b: any) =>
        (a?.tags || []).length - (b?.tags || []).length,
    },
    {
      title: "createTime",
      width: 150,
      dataIndex: "createTime",
      key: "createTime",
      sorter: (a: any, b: any) => +moment(a.createTime) - +moment(b.createTime),
    },
    {
      title: "method",
      width: 80,
      dataIndex: "method",
      key: "method",
      align: "center" as any,
      sorter: (a: any, b: any) =>
        (a?.method || "").length - (b?.method || "").length,
    },
    {
      title: () => {
        return (
          <div>
            <Space
              size="small"
              style={{
                width: "100%",
                justifyContent: "center",
              }}
            >
              <span>Action</span>

              <AddButton />

              <UpdateButton
                key="UpdateButton"
                onUpdate={onUpdate}
                isLoading={isLoading}
              />
              {/* <DeleteSelected selected={selected} /> */}
            </Space>
          </div>
        );
      },
      key: "hash",
      width: 180,
      dataIndex: "hash",
      align: "center" as any,
      fixed: "right" as TableRowSelection<string>["fixed"],
      render: (hash: string) => (
        <Space size="large">
          <Checkbox
            onChange={(e) => onSelect(e.target.checked, hash)}
            checked={selected.includes(hash)}
          />

          <Popconfirm
            title="Are you sure to delete this record?"
            onConfirm={() => onDelete(hash)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger size="small">
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => onUpdate(), [onUpdate]);

  return (
    <Table
      style={{
        width: "calc(100vw - 24px)",
        margin: "0px auto",
      }}
      bordered
      loading={isLoading}
      size="small"
      rowKey="hash"
      columns={columns}
      pagination={false}
      dataSource={dataSource}
      scroll={{ y: "calc(100vh - 108px)", x: "80%" }}
    />
  );
};

export default DataList;
