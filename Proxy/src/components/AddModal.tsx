import { useEffect, useMemo, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { FloatButton, Input, Modal, Tooltip } from 'antd';

import { happyService } from 'src/constants';
import { LocalProxyItem } from '../types';
import { isUrl, setLocalProxy, getLocalProxy } from '../utils';

const defaultObj = {
  original: '',
  target: '',
  tags: [],
  open: true
};

const getErrorMsg = (val: string) => {
  if (!val) {
    return '不能为空';
  }

  if (!isUrl(val)) {
    return '非合法url';
  }

  const local = getLocalProxy();
  if (local.find((it) => it.original === val)) {
    return '该配置已存在！';
  }

  return '';
};

const AddProxyModal = ({ onOkCb }: { onOkCb: () => void }) => {
  const [visible, setVisible] = useState(false);
  const [proxyItem, setProxyItem] = useState<LocalProxyItem>({ ...defaultObj });

  const { disableOk, errorMsg } = useMemo(() => {
    const msg = getErrorMsg(proxyItem.original);
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

  const onOk = () => {
    if (disableOk) {
      return;
    }

    // 获取本地
    const local = getLocalProxy();
    // 更新本地
    const newLocal = [...local, proxyItem];
    setLocalProxy(newLocal);
    setVisible(false);

    // 通知父组件更新列表
    onOkCb?.();
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
      original,
      target,
      open: true
    }));
  };

  return (
    <>
      <FloatButton
        onClick={() => setVisible(!visible)}
        icon={
          <Tooltip title="Add" placement="left">
            <PlusOutlined />
          </Tooltip>
        }
      />

      <Modal
        onOk={onOk}
        open={visible}
        width={800}
        destroyOnClose
        bodyStyle={{ padding: '20px' }}
        okButtonProps={{ disabled: disableOk }}
        onCancel={() => setVisible(false)}
      >
        <div>
          <div className="flex gap-12">
            <span style={{ width: '70px' }}>被代理url</span>
            <div className="flex-2">
              <Input onChange={onChange} status={errorMsg ? 'error' : ''} />
              {errorMsg && <span className="color-red font-12">{errorMsg}</span>}
            </div>
          </div>

          <div className="flex gap-12">
            <span style={{ width: '70px' }}>目标url</span>
            <span>{proxyItem?.target}</span>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddProxyModal;
