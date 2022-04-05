import { message, Popconfirm } from "antd";
import { List, Avatar } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Tags from "./Tags";
import moment from "moment";

import DrawerDetail from "./DrawerDetail";
import { deleteItemApi } from "../../service";
import { RecordItemType } from "../../types";

interface Props {
  dataSource: RecordItemType[];
  updateList: any;
  isLoading: boolean;
}

const Title = ({ url, hash, onDelete }: any) => (
  <div className="flex justify-between">
    <span className="color-666 font-weight-400">{url}</span>
    <Popconfirm okText="Yes" cancelText="No" title="确认删除?" placement="topRight" onConfirm={() => onDelete(hash)}>
      <DeleteOutlined className="margin-right-12 color-red font-14" />
    </Popconfirm>
  </div>
);

const Description = ({ method, createTime, hash, filePath, tags }: any) => (
  <div className="flex gap-8 align-center">
    {method && <span>{method}</span>}
    {<span>{moment(createTime).format("YYYY-MM-DD HH:mm:ss")}</span>}
    <DrawerDetail hash={hash} filePath={filePath} />
    <Tags hash={hash} defaultTags={tags} />
  </div>
);

const RecordList = ({ dataSource, updateList, isLoading }: Props) => {
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

  const renderItem = (item: any) => {
    const { url, hash } = item;
    const avatarSrc = `https://joeschmoe.io/api/v1/random?${Math.random()}`;

    return (
      <List.Item key={hash}>
        <List.Item.Meta
          className="flex-align-center"
          avatar={<Avatar src={avatarSrc} />}
          title={<Title url={url} hash={hash} onDelete={onDelete} />}
          description={<Description {...item} />}
        />
      </List.Item>
    );
  };

  return (
    <List
      loading={isLoading}
      dataSource={dataSource}
      itemLayout="horizontal"
      renderItem={renderItem}
      style={{ height: "90vh", overflow: "auto" }}
    />
  );
};

export default RecordList;
