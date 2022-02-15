import { useState } from "react";
import { Button, message, Modal, Input } from "antd";
import { addItemApi } from "../service";
import ErrorStatus from "./ErrorStatus";

const AddButton = () => {
  const [visible, setVisible] = useState(false);

  const [error, setError] = useState("");

  const [params, setParams] = useState({
    url: "",
    mockBody: {
      data: [],
    },
  });

  const onUrlChange = (val: any) => {
    console.log({ val });
    const url = val.target.value;
    setParams((pre) => ({ ...pre, url }));
  };

  const onBodyChange = (val: any) => {
    try {
      const mockBody = JSON.parse(val.target.value);
      setParams((pre) => ({ ...pre, mockBody }));
      setError("");
    } catch (error: any) {
      console.log({ error });
      setError(error?.message);
    }
  };

  const handleOk = () => {
    const { mockBody, url } = params;
    if (Object.prototype.toString.call(mockBody) !== "[object Object]") {
      message.error("body 必须是json");
      return;
    }

    addItemApi(url, mockBody).then(() => {
      message.success("查询成功");
    });
  };

  return (
    <>
      <Button
        size="small"
        type="primary"
        onClick={() => setVisible((pre) => !pre)}
      >
        Add
      </Button>

      <Modal
        visible={visible}
        width="400"
        onOk={handleOk}
        title="Add One Mock Item"
        onCancel={() => setVisible(false)}
        okButtonProps={{ disabled: !!error }}
      >
        <div
          style={{
            display: "grid",
            gridRowGap: "10px",
          }}
        >
          <Input placeholder="请输入接口" onChange={onUrlChange} />
          <ErrorStatus error={error} />
          <Input.TextArea
            rows={10}
            onChange={onBodyChange}
            placeholder="请输入mock参数"
          />
        </div>
      </Modal>
    </>
  );
};

export default AddButton;
