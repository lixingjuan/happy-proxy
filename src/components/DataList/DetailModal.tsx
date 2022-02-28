import { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import { getDetailApi } from "../../service";
import Editor from "./Editor";

interface Props {
  filePath: string;
}

const DataList = (props: Props) => {
  const { filePath } = props;

  const [visible, setVisible] = useState(false);

  const [response, setResponse] = useState("");

  useEffect(() => {
    if (!visible) {
      return;
    }
    getDetailApi(filePath)
      .then(({ data }) => {
        const detailData = JSON.stringify(data, undefined, 2);
        setResponse(detailData);
      })
      .catch((err) => {
        setResponse(`Error, Reason: ${err.message}`);
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
        <Editor code={response} />
      </Modal>
    </>
  );
};

export default DataList;
