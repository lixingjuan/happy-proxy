import { useMemo, useState } from 'react';
import { Empty } from 'antd';
import { useMount } from 'ahooks';

import AddUrl from './components/AddModal';
import ListItem from './components/ListItem';
import CloseAll from './components/SwtchAllStatus';
import OpenNewTabButton from './components/OpenNewTabButton';
import './style/index.less';

import type { LocalProxyItem } from 'src/types';
import * as dbUtils from './utils/dbUtils';
import { updateBackground } from './utils/updateBackground';

const App = () => {
  const [dataSource, setDataSource] = useState<LocalProxyItem[]>([]);

  const originalUrlSet = useMemo(
    () => dataSource.reduce((pre, cur) => pre.add(cur.originalUrl), new Set<string>()),
    [dataSource]
  );

  const updateDataSource = () => {
    dbUtils.getAll().then((res) => {
      const nextListData = res.reverse();
      setDataSource(nextListData as LocalProxyItem[]);
      updateBackground(nextListData);
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
      .then(() => {
        updateDataSource();
      });
  };

  const onDelete = (id: string) => {
    dbUtils.del(id).then(() => {
      updateDataSource();
    });
  };

  useMount(updateDataSource);

  return (
    <div className="px-10">
      <div style={{ position: 'sticky', top: 4, right: 10 }} className="flex justify-end gap-10">
        <AddUrl onOkCb={updateDataSource} originalUrlSet={originalUrlSet} />
        <CloseAll onOkCb={updateDataSource} />
        <OpenNewTabButton />
      </div>

      <div className="flex flex-col row-gap-5 mt-10">
        {(dataSource || []).map((it) => (
          <ListItem itemData={it} key={it.id} onDelete={onDelete} toggleStatus={onToggleItemOpen} />
        ))}
        {Array.isArray(dataSource) && !dataSource.length ? <Empty /> : null}
      </div>
    </div>
  );
};

export default App;
