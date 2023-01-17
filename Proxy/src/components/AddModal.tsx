import { useEffect, useMemo, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Tooltip } from 'antd';

import { happyService } from 'src/constants';
import { LocalProxyItem } from '../types';
import { isUrl, setLocalProxy, getLocalProxy } from '../utils';
import TagsGroup from './TagsGroup';
import styled from 'styled-components';

const defaultObj = {
  original: '',
  target: '',
  tags: [],
  open: true
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
    const newLocal = [proxyItem, ...local];
    setLocalProxy(newLocal);

    setVisible(false);

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
      original: decodeURIComponent(original),
      target,
      open: true
    }));
  };

  return (
    <>
      <Button
        onClick={() => setVisible(!visible)}
        icon={
          <Tooltip title="Add">
            <PlusOutlined />
          </Tooltip>
        }
      />

      <Modal
        open={visible}
        width={800}
        destroyOnClose
        bodyStyle={{ padding: '20px' }}
        okButtonProps={{ disabled: disableOk }}
        onOk={onOk}
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
            <span>{proxyItem?.target}</span>
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
