import { useState, useEffect } from "react";
import { Button, Modal, Spin } from "antd";
import { getDetailApi } from "../../service";
import Editor from "./Editor";

interface Props {
  filePath: string;
}

const DataList = (props: Props) => {
  const { filePath } = props;

  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [response, setResponse] = useState("");

  useEffect(() => {
    if (!visible) {
      return;
    }
    setIsLoading(true);
    getDetailApi(filePath)
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
  }, [visible, filePath]);

  return (
    <>
      <Button onClick={() => setVisible(true)} size="small" type="link">
        {filePath}
      </Button>

      <Modal
        width={800}
        destroyOnClose
        title="Detail"
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
