import { useEffect, useMemo, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Tooltip, message } from 'antd';

import { isUrl, getProxyTarget, getErrorMsg } from '../utils';
import TagsGroup from './TagsGroup';
import styled from 'styled-components';
import * as dbUtils from '../utils/dbUtils';

const StyledContent = styled.div`
  > div {
    display: flex;
    column-gap: 10;
    margin-bottom: 10px;

    > :first-child {
      width: 80px;
      flex-shrink: 0;
      text-align: right;
      padding-right: 12px;
    }
    > :nth-child(2) {
      flex-grow: 1;
    }

    input,
    span {
      word-break: break-all;
    }
  }
`;

const AddProxyModal = ({
  onOkCb,
  originalUrlSet
}: {
  onOkCb: () => void;
  originalUrlSet: Set<string>;
}) => {
  const [visible, setVisible] = useState(false);
  const [originalUrl, setOriginalUrl] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const targetUrl = useMemo(() => {
    return getProxyTarget(originalUrl);
  }, [originalUrl]);

  const isNotUrl = useMemo(() => isUrl(originalUrl) === false, [originalUrl]);

  const errorMsg = useMemo(
    () => getErrorMsg(originalUrl, originalUrlSet),
    [originalUrlSet, originalUrl]
  );

  const onOk = () => {
    setLoading(true);
    const nextItem = {
      id: String(+new Date()),
      targetUrl: targetUrl,
      originalUrl,
      open: true,
      tags
    };

    dbUtils
      .set(nextItem.id, nextItem)
      .then(() => {
        message.success('增加成功');
        onOkCb();
      })
      .finally(() => {
        setLoading(false);
        setVisible(false);
      });
  };

  useEffect(() => {
    setOriginalUrl('');
    setTags([]);
  }, [visible]);

  return (
    <>
      <Button
        onClick={() => setVisible(!visible)}
        size="small"
        icon={
          <Tooltip title="Add">
            <PlusOutlined />
          </Tooltip>
        }
      />

      <Modal
        open={visible}
        width={800}
        onOk={onOk}
        destroyOnClose
        bodyStyle={{ padding: '20px' }}
        okButtonProps={{ disabled: isNotUrl || !!errorMsg, loading }}
        onCancel={() => setVisible(false)}
      >
        <StyledContent>
          <div>
            <span>被代理url</span>
            <div>
              <Input.TextArea
                autoSize
                allowClear
                onChange={(e) => setOriginalUrl(decodeURIComponent(e.target.value || ''))}
              />
              {errorMsg && originalUrl.length > 0 && (
                <span className="color-red font-12">{errorMsg}</span>
              )}
            </div>
          </div>

          <div className="flex">
            <span>目标url</span>
            <span>{targetUrl}</span>
          </div>

          <div className="flex">
            <span>tags</span>
            <div className="flex">
              <TagsGroup onChange={setTags} />
            </div>
          </div>
        </StyledContent>
      </Modal>
    </>
  );
};

export default AddProxyModal;
