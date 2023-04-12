import { useState } from 'react';
import { FloatButton, message, Empty } from 'antd';
import { useMount } from 'ahooks';

import AddUrl from '../AddModal';
import AddNew from '../AddNew';
import ListItem from './ListItem';
import CloseAll from '../SwtchAllStatus';
import OpenNewTabButton from '../OpenNewTabButton';

import { updateBackground } from './utils';
import { deleteRecordApi } from 'src/service';
import type { LocalProxyItem } from 'src/types';
import { getLocalProxy, setLocalProxy } from 'src/utils';
import { databaseName, tableUrls } from 'src/utils/indexDB';

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
  const [dataSource, setDataSource] = useState<LocalProxyItem[]>(getLocalProxy);

  /** 更新state、local、background */
  const updateDataSource = (nextDataSoutce: LocalProxyItem[], showMessage = true) => {
    setDataSource(nextDataSoutce);
    setLocalProxy(nextDataSoutce);
    updateBackground(nextDataSoutce, showMessage);
    console.log('更新 dataSource', nextDataSoutce);
  };

  const onAddSuccess = () => {
    let request = indexedDB.open(databaseName, 1);

    request.onupgradeneeded = function (event: any) {
      let db = event.target.result;
      let objectStore = db.createObjectStore(tableUrls, { keyPath: 'beProxyUrl' });
    };

    let getRequest = indexedDB.open(databaseName, 1);
    getRequest.onsuccess = function (event: any) {
      let db = event.target.result;
      let transaction = db.transaction([tableUrls], 'readonly');
      let objectStore = transaction.objectStore(tableUrls);
      let getRequest = objectStore.getAll();
      getRequest.onsuccess = function () {
        updateDataSource(getRequest.result);
      };
    };
  };

  const onToggleItemOpen = (url: string) => {
    const nextDataSoutce = dataSource.map((inner) => {
      if (inner.beProxyUrl === url) {
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

    const url = toBeDeleteItem?.beProxyUrl;
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

  useMount(onAddSuccess);

  return (
    <>
      <div className="flex flex-col row-gap-5 mt-10">
        {dataSource.map((it, index) => (
          <>
            <ListItem
              it={{ ...it, index }}
              key={it.beProxyUrl}
              onDelete={onDelete}
              toggleItemStatus={onToggleItemOpen}
            />
            <HrLine />
          </>
        ))}
        {dataSource.length === 0 ? <Empty /> : null}
      </div>
      <div style={{ position: 'fixed', top: 2, right: 20, display: 'flex', columnGap: 5 }}>
        <AddNew onOkCb={onAddSuccess} />
        <AddUrl onOkCb={onAddSuccess} />
        <CloseAll onOkCb={onAddSuccess} />
        {showOpenTabButton && <OpenNewTabButton />}
      </div>
    </>
  );
};

export default ProxyList;
