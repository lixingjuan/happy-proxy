import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { Space, Button, Spin, Drawer, Tabs } from "antd";
import Icon from "@ant-design/icons";
import toast from "react-hot-toast";

import CodeEditor, { EditorRefType } from "src/components/Editor";
import { getDetailApi, updateDetailApi } from "../../service";
import { writeTextToClipboard } from "../../utils";
import RequestInfo from "./RequestInfo";

const { TabPane } = Tabs;

const StyledRequestInfo = styled.ul`
  margin-bottom: 0px;
  li {
    span:nth-child(1) {
      width: 60px;
      ft-weight: 500;
      display: inline-block;
    }
    span:nth-child(2) {
      color: #999;
    }
  }
`;

const StyledDetail = styled.div`
  .request-info {
    span:nth-child(1) {
      width: 80px;
    }
  }
`;
const HeartSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
  </svg>
);

const HeartIcon = (props: any) => <Icon component={HeartSvg} {...props} />;

interface Props {
  filePath: string;
  hash: string;
}

const DataList = (props: Props) => {
  const { hash, filePath } = props;

  const EditorInstance1 = useRef<EditorRefType>(null);
  const EditorInstance2 = useRef<EditorRefType>(null);

  const [visible, setVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [response, setResponse] = useState<{
    data: any;
    url: string;
    payload: any;
    method: string;
  }>({} as any);

  const [responseString, setResponseString] = useState("");

  const [newResponse, setNewResponse] = useState("");

  const onChange = () => {};

  /** 查询详情 */
  const queryDetail = () => {
    setIsLoading(true);
    getDetailApi(hash)
      .then(({ data }) => {
        setResponse(data as any);
        console.log({ data });
        const detailData = JSON.stringify(data, undefined, 2);
        setResponseString(detailData);
      })
      .catch((err) => {
        setResponseString(`Error, Reason: ${err.message}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  /** 更新详情 */
  const updateDetail = () => {
    setIsLoading(true);
    try {
      const theNewResponse = JSON.parse(newResponse);
      updateDetailApi({ hash, response: theNewResponse })
        .then(() => queryDetail())
        .catch((err) => toast.error(err.message))
        .finally(() => setIsLoading(false));
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (visible) {
      queryDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return (
    <StyledDetail>
      <Button
        href="#"
        onClick={() => setVisible(true)}
        type="text"
        style={{ padding: "0px" }}
        className="color-anchor"
      >
        {filePath}
      </Button>

      <Drawer
        visible={visible}
        width="80vw"
        placement="right"
        onClose={() => setVisible(false)}
        bodyStyle={{ padding: "0 12px" }}
        title={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>
              <span onClick={() => writeTextToClipboard(filePath)}>{filePath}</span>
              <HeartIcon style={{ color: "hotpink", paddingLeft: "10px" }} />
            </span>
            <Button
              onClick={() => {
                EditorInstance.current?.beautify?.();
              }}
            >
              Beautify
            </Button>
          </div>
        }
        footer={
          <Space style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={() => setVisible(false)}>取消</Button>
            <Button onClick={updateDetail} type="primary">
              确认
            </Button>
          </Space>
        }
      >
        <Spin spinning={isLoading}>
          <>
            <RequestInfo url={response.url} method={response.method} />

            <Tabs defaultActiveKey="1" onChange={onChange}>
              <TabPane tab="Paload" key="Paload">
                <CodeEditor
                  ref={EditorInstance1}
                  defaultValue={
                    typeof response.payload === "object" ? JSON.stringify(response.payload) : ""
                  }
                  onChange={() => {}}
                  style={{ height: "80vh" }}
                />
              </TabPane>

              <TabPane tab="Preview" key="Preview">
                <CodeEditor
                  ref={EditorInstance2}
                  defaultValue={responseString}
                  onChange={setNewResponse}
                  style={{ height: "80vh" }}
                />
              </TabPane>
            </Tabs>
          </>
        </Spin>
      </Drawer>
    </StyledDetail>
  );
};

export default DataList;
