import { Space, message, Popconfirm } from "antd";
import { List, Avatar } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Tags from "./Tags";
import moment from "moment";

import DrawerDetail from "./DrawerDetail";
import { deleteItemApi } from "../../service";
import { RecordItemType } from "../../types";

const DataList = ({
  dataSource,
  updateList,
  isLoading,
}: {
  dataSource: RecordItemType[];
  updateList: any;
  isLoading: boolean;
}) => {
  /** 删除一条记录 */
  const onDelete = (hash: string) => {
    if (!hash) {
      message.error("hash不能为空");
      return;
    }

    deleteItemApi(hash)
      .then(() => {
        message.success("删除成功");
        updateList();
      })
      .catch((err: any) => message.error(err.message));
  };

  return (
    <List
      style={{ height: "90vh", overflow: "auto" }}
      itemLayout="horizontal"
      dataSource={dataSource}
      loading={isLoading}
      renderItem={(item) => {
        const title = (
          <div className="flex justify-between">
            <span className="color-666 font-weight-400">{item.url}</span>
            <Popconfirm
              okText="Yes"
              cancelText="No"
              title="Are you sure to delete this record?"
              placement="topRight"
              onConfirm={() => onDelete(item.hash)}
            >
              <DeleteOutlined className="margin-right-12 red" />
            </Popconfirm>
          </div>
        );

        const description = (
          <Space size={8}>
            <span>{item.method}</span>
            <span>{moment(item.createTime).format("YYYY-MM-DD HH:mm:ss")}</span>
            <DrawerDetail hash={item.hash} filePath={item.filePath} />
            <Tags hash={item.hash} defaultTags={item.tags} />
          </Space>
        );

        return (
          <List.Item key={item.hash}>
            <List.Item.Meta
              className="flex-align-center"
              avatar={
                <Avatar
                  src={`https://joeschmoe.io/api/v1/random?${Math.random()}`}
                />
              }
              title={title}
              description={description}
            />
          </List.Item>
        );
      }}
    />
  );
};

export default DataList;
