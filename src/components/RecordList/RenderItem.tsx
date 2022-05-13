import moment from "moment";
import { Popconfirm, List, Avatar } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import Tags from "./Tags";
import DrawerDetail from "./DrawerDetail";

const Description = ({ method, createTime, hash, filePath, tags }: any) => (
  <div className="flex gap-8 align-center">
    {method && <span>{method}</span>}
    {<span>{moment(createTime).format("YYYY-MM-DD HH:mm:ss")}</span>}
    <DrawerDetail hash={hash} filePath={filePath} />
    <Tags hash={hash} defaultTags={tags} />
  </div>
);

export const renderItem = (item: any, onDelete: any) => {
  const { url, hash, highlightUrl } = item;
  const avatarSrc = `https://joeschmoe.io/api/v1/random?${Math.random()}`;

  return (
    <List.Item
      key={hash}
      actions={[
        <Popconfirm
          okText="Yes"
          cancelText="No"
          title="确认删除?"
          placement="topRight"
          onConfirm={() => onDelete(hash)}
        >
          <DeleteOutlined className="margin-right-12 color-red font-14" />
        </Popconfirm>,
      ]}
    >
      <List.Item.Meta
        className="flex-align-center"
        avatar={<Avatar src={avatarSrc} />}
        title={
          <span
            className="color-666 font-weight-400"
            dangerouslySetInnerHTML={{ __html: highlightUrl || url }}
          />
        }
        description={<Description {...item} />}
      />
    </List.Item>
  );
};
