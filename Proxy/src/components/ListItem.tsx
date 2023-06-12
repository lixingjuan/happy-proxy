import { Tag, Button, Popconfirm, Switch } from 'antd';

import Detail from './Detail';

import type { LocalProxyItem } from 'src/types';
import styled from 'styled-components';

const colors = ['cyan', 'green', 'geekblue', 'magenta', 'purple', 'blue'];

const StyledListItem = styled.div`
  border-bottom: 1px dotted #ddd;
  padding: 4px;
  .url-text {
    word-break: break-word;
  }
`;

const ListItem = ({
  itemData,
  onDelete,
  toggleStatus
}: {
  itemData: LocalProxyItem;
  onDelete: (id: string) => void;
  toggleStatus: (val: string) => void;
}) => {
  const { originalUrl, id } = itemData;

  return (
    <StyledListItem className="flex justify-between items-center">
      <span key={originalUrl} className="url-text">
        {originalUrl}
      </span>

      <div className="flex items-center">
        {(itemData.tags || []).map((it, index) => (
          <Tag key={it} color={colors[index]}>
            {it}
          </Tag>
        ))}

        <Switch
          size="small"
          checked={itemData.open}
          className="mr-10"
          onChange={() => toggleStatus(id)}
        />

        <Detail url={originalUrl} />

        <Popconfirm
          title="确认删除？"
          okText="Yes"
          cancelText="No"
          onConfirm={() => {
            onDelete(id);
          }}
        >
          <Button danger size="small">
            删除
          </Button>
        </Popconfirm>
      </div>
    </StyledListItem>
  );
};

export default ListItem;
