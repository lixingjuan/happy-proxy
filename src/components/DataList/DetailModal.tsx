import { useState, useEffect } from "react";
import { Button, Modal, Spin } from "antd";
import { getDetailApi } from "../../service";
import Editor from "./Editor";
import Icon from "@ant-design/icons";

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

  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [response, setResponse] = useState("");

  useEffect(() => {
    if (!visible) {
      return;
    }
    setIsLoading(true);
    getDetailApi(hash)
      .then(({ data }) => {
        const detailData = JSON.stringify(data, undefined, 2);
        setResponse(detailData);
      })
      .catch((err) => {
        setResponse(`Error, Reason: ${err.message}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [visible, hash]);

  return (
    <>
      <Button onClick={() => setVisible(true)} size="small" type="link">
        {filePath}
      </Button>

      <Modal
        width="100vw"
        style={{ top: 10, bottom: 10 }}
        bodyStyle={{
          padding: "0px",
          margin: "0px",
          height: "100%",
          minHeight: "80vh",
        }}
        destroyOnClose
        title={
          <>
            <HeartIcon style={{ color: "hotpink", paddingRight: "10px" }} />
            <span>Local Interface Details</span>
            <HeartIcon style={{ color: "hotpink", paddingLeft: "10px" }} />
          </>
        }
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={[<Button onClick={() => setVisible(false)}>Cancel</Button>]}
      >
        <Spin spinning={isLoading}>
          <Editor code={response} />
        </Spin>
      </Modal>
    </>
  );
};

export default DataList;
