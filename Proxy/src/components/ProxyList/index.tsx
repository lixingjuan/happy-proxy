import { useState } from 'react';
import { FloatButton, message, Empty } from 'antd';
import { useMount } from 'ahooks';

import AddUrl from '../AddModal';
import ListItem from './ListItem';
import CloseAll from '../SwtchAllStatus';
import OpenNewTabButton from '../OpenNewTabButton';

import { updateBackground } from './utils';
import { deleteRecordApi } from 'src/service';
import type { LocalProxyItem } from 'src/types';
import { getLocalProxy, setLocalProxy } from 'src/utils';

const HrLine = () => (
  <hr
    style={{
      border: 'none',
      height: '0px',
      width: '100%',
      borderBottom: '1px dotted #ddd'
    }}
  />
);

const ProxyList = ({ showOpenTabButton = false }: { showOpenTabButton: boolean }) => {
  const [open, setOpen] = useState(false);
  const [dataSource, setDataSource] = useState<LocalProxyItem[]>(getLocalProxy);

  /** 更新state、local、background */
  const updateDataSource = (nextDataSoutce: LocalProxyItem[], showMessage = true) => {
    setDataSource(nextDataSoutce);
    setLocalProxy(nextDataSoutce);
    updateBackground(nextDataSoutce, showMessage);
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
    const [toBeDeleteItem] = tempDataSource.splice(index, 1);

    const url = toBeDeleteItem?.original;
    if (url) {
      deleteRecordApi(url)
        .then((res) => {
          updateDataSource(tempDataSource);
          message.success('删除成功');
        })
        .catch((err) => message.error(`删除失败${err.message}`));
    } else {
      message.error(`删除失败original为空`);
    }
  };

  useMount(() => updateDataSource(getLocalProxy(), false));

  return (
    <>
      <div className="flex flex-col row-gap-5 mt-10">
        {dataSource.map((it, index) => (
          <>
            <ListItem
              it={{ ...it, index }}
              key={it.original}
              onDelete={onDelete}
              toggleItemStatus={onToggleItemOpen}
            />
            <HrLine />
          </>
        ))}
        {dataSource.length === 0 ? <Empty /> : null}
      </div>
      <div style={{ position: 'fixed', bottom: 10, right: 20, display: 'flex', columnGap: 5 }}>
        <AddUrl onOkCb={onAddSuccess} />
        <CloseAll onOkCb={onAddSuccess} />
        {showOpenTabButton && <OpenNewTabButton />}
      </div>
    </>
  );
};

export default ProxyList;
