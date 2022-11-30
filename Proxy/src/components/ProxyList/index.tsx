import { useState } from 'react';
import { FloatButton, message } from 'antd';

import AddUrl from './AddModal';
import CloseAll from './CloseAll';
import ListItem from './ListItem';

import type { LocalProxyItem } from './utils';
import { getLocalProxy, updateLocalProxy, updateBackground } from './utils';

const ProxyList = () => {
  const [dataSource, setDataSource] = useState<LocalProxyItem[]>(getLocalProxy);

  const updateDataSource = (nextDataSoutce: LocalProxyItem[]) => {
    setDataSource(nextDataSoutce);
    updateLocalProxy(nextDataSoutce);
    updateBackground(nextDataSoutce);
    console.log('更新 dataSource', nextDataSoutce);
  };

  const onAddSuccess = () => {
    const local = getLocalProxy();
    updateDataSource(local);
  };

  const onToggleItemOpen = (url: string) => {
    const nextDataSoutce = dataSource.map((inner) => {
      if (inner.original === url) {
        return {
          ...inner,
          open: !inner.open
        };
      }
      return inner;
    });
    updateDataSource(nextDataSoutce);
  };

  const onDelete = (index: number) => {
    const tempDataSource = getLocalProxy();
    tempDataSource.splice(index, 1);
    updateDataSource(tempDataSource);
    message.success('删除成功');
  };

  return (
    <>
      <FloatButton.Group shape="square" open={false}>
        <AddUrl onOkCb={onAddSuccess} />
        <CloseAll onOkCb={onAddSuccess} />
      </FloatButton.Group>

      <div className="flex flex-col row-gap-10 mt-10">
        {dataSource.map((it, index) => (
          <ListItem
            it={{ ...it, index }}
            key={it.original}
            onDelete={onDelete}
            toggleItemStatus={onToggleItemOpen}
          />
        ))}
      </div>
    </>
  );
};

export default ProxyList;
