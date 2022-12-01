import { useState } from 'react';
import { FloatButton, Input, message, Modal, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { happyService } from 'src/constants';
import { isUrl, setLocalProxy, getLocalProxy } from '../utils';
import type { LocalProxyItem } from '../types';

const AddProxyModal = ({ onOkCb }: { onOkCb: () => void }) => {
  const [visible, setVisible] = useState(false);
  const [obj, setObj] = useState<LocalProxyItem>({
    original: '',
    target: '',
    tags: [],
    open: true,
    cookiesMap: {}
  });

  const validateUniq = (): boolean => {
    const local = getLocalProxy();
    if (local.find((it) => it.original === obj.original)) {
      message.error('该配置已存在！');
      return false;
    }
    return true;
  };

  const valiteEmpty = () => {
    if (!obj.original) {
      message.error('不能为空！');
      return false;
    }
    return true;
  };

  const onOk = () => {
    if (!valiteEmpty() || !validateUniq()) {
      return;
    }

    // 获取本地
    const local = getLocalProxy();
    // 更新本地
    const newLocal = [...local, obj];
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

    setObj((pre) => ({
      ...pre,
      original,
      target,
      open: true,
      cookiesMap: {}
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
        bodyStyle={{ padding: '20px' }}
        onCancel={() => setVisible(false)}
      >
        <div>
          <div className="flex gap-12">
            <span style={{ width: '70px' }}>被代理url</span>
            <Input onChange={onChange} />
          </div>

          <div className="flex gap-12">
            <span style={{ width: '70px' }}>目标url</span>
            <span>{obj.target}</span>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddProxyModal;
