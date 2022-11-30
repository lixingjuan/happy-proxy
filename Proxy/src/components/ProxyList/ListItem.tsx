import { Button, Popconfirm, Switch } from 'antd';
import Detail from '../Detail';
import type { LocalProxyItem } from './utils';

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
    <div className="flex justify-between">
      <span key={original} className="line-clamp-1" title={original}>
        {original}
      </span>
      <div className="flex items-center gap-10">
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
    </div>
  );
};

export default ListItem;
