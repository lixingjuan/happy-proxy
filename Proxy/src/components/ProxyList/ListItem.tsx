import { Tag, Button, Popconfirm, Switch } from 'antd';

import Detail from '../Detail';

import type { LocalProxyItem } from 'src/types';
import styled from 'styled-components';
import { writeTextToClipboard } from 'src/utils/utils';

const colors = ['cyan', 'green', 'geekblue', 'magenta', 'purple', 'blue'];

const StyledItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 10px;
  .text {
    font-size: 14px;
    color: #000000eb;
    word-break: break-word;
  }
`;

const ListItem = ({
  it,
  onDelete,
  toggleItemStatus
}: {
  it: LocalProxyItem & { index: number };
  onDelete: (val: number) => void;
  toggleItemStatus: (val: string) => void;
}) => {
  const { index, original } = it;

  return (
    <StyledItem>
      <span key={original} className="text">
        {original}
      </span>
      <div className="flex items-center gap-10">
        {(it.tags || []).map((it, index) => (
          <Tag key={it} color={colors[index]}>
            {it}
          </Tag>
        ))}
        <Popconfirm
          title="确认删除？"
          okText="Yes"
          cancelText="No"
          onConfirm={() => onDelete(index)}
        >
          <Button danger size="small" type="link">
            删除
          </Button>
        </Popconfirm>
        <Switch size="small" checked={it.open} onChange={() => toggleItemStatus(original)} />
        <Detail url={original} />
      </div>
    </StyledItem>
  );
};

export default ListItem;
