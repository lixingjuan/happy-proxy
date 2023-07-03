import { useMemo, useState } from 'react';
import { Empty, message } from 'antd';
import { useMount } from 'ahooks';

import AddUrl from './components/AddModal';
import ListItem from './components/ListItem';
import CloseAll from './components/SwtchAllStatus';
import OpenNewTabButton from './components/OpenNewTabButton';
import './style/index.less';

import type { LocalProxyItem } from 'src/types';
import * as dbUtils from './utils/dbUtils';
import { updateBackground } from './utils/updateBackground';
import { deleteRecordApi, updateOriginalUrlApi } from './service';

import ErrorTip from './components/ErrorTip';
import styled from 'styled-components';

const StyledApp = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  .operator {
    display: flex;
    justify-content: flex-end;
    column-gap: 8px;
    position: sticky;
    top: 0px;
    padding: 4px 12px;
    background: #eaf1fb;
    z-index: 1;
    text-align: right;
    border-radius: 0 0 8px 8px;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 3%), 0 1px 6px -1px rgb(0 0 0 / 2%),
      0 2px 4px 0 rgb(0 0 0 / 2%);
  }
  .list-container {
    background: #fff;
    flex-grow: 1;
  }
`;

const App = () => {
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState<LocalProxyItem[]>([]);

  const [isEditingProxyItem, setIsEditingProxyItem] = useState<LocalProxyItem | null>(null);

  const originalUrlSet = useMemo(
    () => dataSource.reduce((pre, cur) => pre.add(cur.originalUrl), new Set<string>()),
    [dataSource]
  );

  const updateDataSourceAndBg = () => {
    setLoading(true);
    return dbUtils
      .getAll()
      .then((res) => {
        const nextListData = res.reverse();
        setDataSource(nextListData as LocalProxyItem[]);
        updateBackground(nextListData);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onToggleItemOpen = (id: string) => {
    dbUtils
      .get(id)
      .then((itemDetail) =>
        dbUtils.set(id, {
          ...itemDetail,
          open: !itemDetail.open
        })
      )
      .then(updateDataSourceAndBg);
  };

  const onDelete = (id: string, proxyUrl: string) => {
    dbUtils.del(id).then(() => {
      updateDataSourceAndBg();
      deleteRecordApi(proxyUrl);
    });
  };

  useMount(updateDataSourceAndBg);

  const onConfirm = async (oldOriginalUrl: string) => {
    if (!isEditingProxyItem) {
      return;
    }

    await dbUtils.set(isEditingProxyItem.id, isEditingProxyItem);

    updateOriginalUrlApi({
      oldUrl: oldOriginalUrl,
      newUrl: isEditingProxyItem?.originalUrl || ''
    })
      .then(updateDataSourceAndBg, () => {
        message.error('更新失败');
      })
      .then(() => {
        message.success('更新成功');
        setIsEditingProxyItem(null);
      });
  };

  return (
    <StyledApp>
      <ErrorTip />
      <div className="operator">
        <AddUrl onOkCb={updateDataSourceAndBg} originalUrlSet={originalUrlSet} />
        <CloseAll updateDataSourceAndBg={updateDataSourceAndBg} />
        <OpenNewTabButton />
      </div>

      <div className="list-container p-12">
        {(dataSource || []).map((it) => (
          <ListItem
            itemData={it}
            key={it.id}
            onDelete={() => onDelete(it.id, it.originalUrl)}
            onConfirm={() => onConfirm(it.originalUrl)}
            toggleStatus={onToggleItemOpen}
            originalUrlSet={originalUrlSet}
            isEditingProxyItem={isEditingProxyItem}
            setIsEditingProxyItem={setIsEditingProxyItem}
          />
        ))}
        {Array.isArray(dataSource) && !dataSource.length && loading === false ? <Empty /> : null}
      </div>
    </StyledApp>
  );
};

export default App;
