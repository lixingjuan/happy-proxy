import { Tag, Button, Popconfirm, Switch, Input, message } from 'antd';

import Detail from './Detail';

import type { LocalProxyItem } from 'src/types';
import styled from 'styled-components';
import { useCallback, useMemo, useState } from 'react';
import { getErrorMsg, getProxyTarget } from 'src/utils';
import TagsGroup from './TagsGroup';

const colors = ['cyan', 'green', 'geekblue', 'magenta', 'purple', 'blue'];

const StyledListItem = styled.div`
  border-bottom: 1px dotted #ddd;
  padding: 4px;
  .url-text {
    word-break: break-word;
  }
  .buttons {
    white-space: nowrap;
  }
`;

const ListItem = ({
  itemData,
  onDelete,
  toggleStatus,
  originalUrlSet,
  isEditingProxyItem,
  setIsEditingProxyItem,
  onConfirm
}: {
  itemData: LocalProxyItem;
  isEditingProxyItem: LocalProxyItem | null;
  onDelete: () => void;
  toggleStatus: (val: string) => void;
  originalUrlSet: Set<string>;
  setIsEditingProxyItem: React.Dispatch<React.SetStateAction<LocalProxyItem | null>>;
  onConfirm: () => void;
}) => {
  const { originalUrl, id } = itemData;

  const [errorMsg, setErrorMsg] = useState('');

  const innerOriginalUrlSet = useMemo(
    () => new Set([...originalUrlSet].filter((it) => it !== originalUrl)),
    [originalUrl, originalUrlSet]
  );

  const onSave = useCallback(() => {
    if (errorMsg) {
      message.error(errorMsg);
      return;
    }
    onConfirm();
  }, [errorMsg, onConfirm]);

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const originalUrl = e.target.value;
      console.log({ originalUrl });
      let targetUrl = '';

      const innerErrorMsg = getErrorMsg(originalUrl, innerOriginalUrlSet);
      if (innerErrorMsg) {
        setErrorMsg(innerErrorMsg);
      } else {
        targetUrl = getProxyTarget(originalUrl);
        setErrorMsg('');
      }

      if (isEditingProxyItem) {
        setIsEditingProxyItem({
          ...isEditingProxyItem,
          originalUrl,
          targetUrl
        });
      }
    },
    [innerOriginalUrlSet, isEditingProxyItem, setIsEditingProxyItem]
  );

  if (isEditingProxyItem && isEditingProxyItem?.id === id) {
    return (
      <StyledListItem className="flex justify-between items-center">
        <div className="flex-1">
          <Input
            className="mr-5 w-full"
            onChange={onInputChange}
            value={isEditingProxyItem.originalUrl}
          />
          {errorMsg && <span className="font-12 color-red pl-12">{errorMsg}</span>}
        </div>

        <div className="buttons">
          <TagsGroup
            canDelete
            value={isEditingProxyItem.tags || []}
            onChange={(nextTags) => {
              setIsEditingProxyItem({
                ...isEditingProxyItem,
                tags: nextTags
              });
            }}
          />
          <Button onClick={onSave}>保存</Button>
          <Button
            onClick={() => {
              setIsEditingProxyItem(null);
            }}
          >
            取消
          </Button>
        </div>
      </StyledListItem>
    );
  }

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
          className="mr-5"
          onChange={() => toggleStatus(id)}
        />

        <Detail url={originalUrl} />

        <Button
          size="small"
          className="mr-5"
          onClick={() => {
            setIsEditingProxyItem(itemData);
          }}
        >
          编辑
        </Button>

        <Popconfirm title="确认删除？" okText="Yes" cancelText="No" onConfirm={onDelete}>
          <Button danger size="small">
            删除
          </Button>
        </Popconfirm>
      </div>
    </StyledListItem>
  );
};

export default ListItem;
