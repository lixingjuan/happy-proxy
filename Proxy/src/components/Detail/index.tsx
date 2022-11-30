import { useRequest } from 'ahooks';
import { useState, useMemo } from 'react';
import { Space, Button, Drawer, Tabs, message, Popconfirm } from 'antd';

import Info from './Info';
import Title from './Title';
import CodeEditor from 'src/components/Editor';
import { updateDetailApi, getDetailByUrlApi, DetailInterface } from '../../service';

const Detail = (props: { url: string }) => {
  const { url } = props;

  const [isSaving, setIsSaving] = useState(false);

  const [open, setOpen] = useState(false);

  const [detail, setDetail] = useState<Partial<DetailInterface>>();

  /** 查询详情 */
  const { run: refreshDetail } = useRequest(() => getDetailByUrlApi(url), {
    onFinally: (a, ressss) => {
      const content = ressss?.content;
      if (content) {
        setDetail(content);
      } else {
        setDetail({
          response: undefined,
          method: undefined,
          payload: undefined,
          proxyUrl: url
        });
      }
    }
  });

  const { method, payload, responseString } = useMemo(() => {
    const response = detail?.response;
    return {
      method: detail?.method,
      payload: detail?.payload,
      responseString: response ? JSON.stringify(response, undefined, 2) : ''
    };
  }, [detail]);

  /** 修改存储在本地的内容 */
  const updateDetail = () => {
    setIsSaving(true);
    try {
      updateDetailApi(detail as DetailInterface)
        .then((res) => {
          message.success(res.message);
        })
        .catch((err) => {
          message.success(err.message);
        });
    } catch (error: any) {
      message.error(error?.message);
    } finally {
      setIsSaving(false);
    }
  };

  const onMethodChange = (val: string) => setDetail((pre) => ({ ...pre, method: val }));

  const onPreviewChange = (val = '') => {
    try {
      const obj = JSON.parse(val);
      setDetail((pre) => ({ ...pre, response: obj }));
    } catch (err: any) {
      console.log(err?.message);
    }
  };

  return (
    <>
      <Button
        size="small"
        type="primary"
        onClick={() => {
          refreshDetail();
          setOpen(true);
        }}
      >
        详情
      </Button>

      <Drawer
        open={open}
        width="80vw"
        placement="right"
        onClose={() => setOpen(false)}
        bodyStyle={{ padding: '0 12px' }}
        title={<Title proxyUrl={url} onSuccess={refreshDetail} />}
        footer={
          <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Popconfirm title="确认删除？" okText="Yes" cancelText="No" onConfirm={updateDetail}>
              <Button type="primary" loading={isSaving}>
                确认修改
              </Button>
            </Popconfirm>

            <Button onClick={() => setOpen(false)}>取消</Button>
          </Space>
        }
      >
        <Info url={url} method={method} onMethodChange={onMethodChange} />
        <Tabs
          style={{ height: '100%' }}
          items={[
            {
              label: 'Preview',
              key: 'Preview',
              children: (
                <CodeEditor
                  height="80vh"
                  value={responseString}
                  defaultValue={responseString}
                  onChange={onPreviewChange}
                />
              )
            },
            {
              label: 'Paload',
              key: 'Paload',
              children: (
                <CodeEditor
                  onChange={() => console.log('1')}
                  height="80vh"
                  defaultValue={typeof payload === 'object' ? JSON.stringify(payload) : ''}
                />
              )
            }
          ]}
        />
      </Drawer>
    </>
  );
};

export default Detail;
