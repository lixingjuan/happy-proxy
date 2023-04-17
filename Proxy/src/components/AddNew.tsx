import { useEffect, useMemo, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Tooltip } from 'antd';

import { happyService } from 'src/constants';
import { ProxyItem } from '../types';
import { isUrl, getLocalProxy } from '../utils';
import TagsGroup from './TagsGroup';
import styled from 'styled-components';
import { databaseName, tableUrls } from 'src/utils/indexDB';

const defaultObj = {
  beProxyUrl: '',
  targetUrl: '',
  tags: [],
  open: true,
  responseBody: {}
};

const StyledFormItem = styled.div`
  display: flex;
  column-gap: 10;
  margin-bottom: 10px;

  > :first-child {
    width: 70px;
    flex-shrink: 0;
  }
  > :nth-child(2) {
    flex-grow: 1;
  }

  input,
  span {
    word-break: break-all;
  }
`;

const getErrorMsg = (val: string) => {
  if (!val) {
    return '不能为空';
  }

  if (!isUrl(val)) {
    return '非合法url';
  }

  const local = getLocalProxy();
  if (local.find((it) => it.beProxyUrl === val)) {
    return '该配置已存在！';
  }

  return '';
};

const AddProxyModal = ({ onOkCb }: { onOkCb: () => void }) => {
  const [visible, setVisible] = useState(false);
  const [proxyItem, setProxyItem] = useState<ProxyItem>({ ...defaultObj });

  const { disableOk, errorMsg } = useMemo(() => {
    const msg = getErrorMsg(proxyItem.beProxyUrl);
    return {
      disableOk: !!msg,
      errorMsg: msg
    };
  }, [proxyItem]);

  useEffect(() => {
    if (!visible) {
      setProxyItem({ ...defaultObj });
    }
  }, [visible]);

  /** 保存代理 item 到indexDB */
  const saveProxyItemToIndexDb = () => {
    if (disableOk) {
      return;
    }

    const { beProxyUrl, targetUrl, tags, open } = proxyItem;

    let request = indexedDB.open(databaseName, 1);

    request.onupgradeneeded = function (event: any) {
      const db = event?.target?.result;
      db.createObjectStore(tableUrls, { keyPath: 'beProxyUrl' });
    };

    request.onsuccess = function (event: any) {
      let db = event.target.result;

      const transaction = db.transaction(tableUrls, 'readwrite');
      const store = transaction.objectStore(tableUrls);
      store.add({
        open,
        tags,
        targetUrl,
        beProxyUrl,
        responseBody: {}
      });
      transaction.oncomplete = function () {
        console.log('add success!');
      };
    };

    // 通知父组件更新列表
    onOkCb?.();
  };

  const onTagsChange = (val: string[]) => {
    setProxyItem((pre) => ({
      ...pre,
      tags: val
    }));
  };

  const onChange = (e: any) => {
    const original = e.target.value;

    const originIsUrl = isUrl(original);
    const theOrigin = originIsUrl ? new URL(original).origin : '';

    const target =
      originIsUrl && theOrigin
        ? original.replace(theOrigin, happyService)
        : `${happyService}/${original}`;

    setProxyItem((pre) => ({
      ...pre,
      beProxyUrl: decodeURIComponent(original),
      target,
      open: true
    }));
  };

  return (
    <>
      <Button
        onClick={() => setVisible(!visible)}
        size="small"
        icon={
          <Tooltip title="Add">
            <PlusOutlined />1
          </Tooltip>
        }
      />

      <Modal
        open={visible}
        width={800}
        destroyOnClose
        bodyStyle={{ padding: '20px' }}
        okButtonProps={{ disabled: disableOk }}
        onOk={saveProxyItemToIndexDb}
        onCancel={() => setVisible(false)}
      >
        <div>
          <StyledFormItem>
            <span>被代理url</span>
            <div>
              <Input.TextArea
                autoSize
                allowClear
                onChange={onChange}
                status={errorMsg ? 'error' : ''}
              />
              {errorMsg && <span className="color-red font-12">{errorMsg}</span>}
            </div>
          </StyledFormItem>

          <StyledFormItem>
            <span>目标url</span>
            <span>{proxyItem?.targetUrl}</span>
          </StyledFormItem>

          <StyledFormItem>
            <span>tags</span>
            <div className="flex">
              <TagsGroup onChange={onTagsChange} />
            </div>
          </StyledFormItem>
        </div>
      </Modal>
    </>
  );
};

export default AddProxyModal;
