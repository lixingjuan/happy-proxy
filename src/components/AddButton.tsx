import { useMemo, useState } from "react";
import { Button, message, Modal, Input, Select } from "antd";
import { addItemApi } from "../service";
import ErrorStatus from "./ErrorStatus";
import isEmpty from "lodash/isEmpty";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddButton = ({ onUpdate }: any) => {
  const [visible, setVisible] = useState(false);

  const [error, setError] = useState("");

  const [params, setParams] = useState({
    url: "",
    method: "GET",
    mockBody: {},
  });

  const onUrlChange = (val: any) => {
    console.log({ val });
    const url = val.target.value;
    setParams((pre) => ({ ...pre, url }));
  };

  const onMethodChange = (val: any) => {
    setParams((pre) => ({ ...pre, method: val }));
  };

  const onBodyChange = (val: any) => {
    try {
      const mockBody = JSON.parse(val.target.value);
      setParams((pre) => ({ ...pre, mockBody }));
      setError("");
    } catch (error: any) {
      setError(error?.message);
    }
  };

  const handleOk = () => {
    const { mockBody } = params;

    if (Object.prototype.toString.call(mockBody) !== "[object Object]") {
      message.error("body 必须是json");
      return;
    }

    addItemApi(params)
      .then((result) => {
        const { code, message: responseMsg } = result;
        if (code < 0) {
          throw new Error(responseMsg);
        }
        message.success(`add ${responseMsg}`);
        onUpdate?.();
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  const { disabledOk } = useMemo(
    () => ({
      disabledOk: !!error || isEmpty(params?.url),
    }),
    [params.url, error]
  );

  return (
    <>
      <Button
        size="small"
        type="primary"
        onClick={() => setVisible((pre) => !pre)}
        title="增加一条mock记录"
      >
        <PlusOutlined />
      </Button>

      <Modal
        visible={visible}
        width="400"
        onOk={handleOk}
        title="Add One Mock Item"
        onCancel={() => setVisible(false)}
        okButtonProps={{ disabled: disabledOk }}
      >
        <div
          style={{
            display: "grid",
            gridRowGap: "10px",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "100px auto" }}>
            <Select
              defaultValue="Get"
              onChange={onMethodChange}
              value={params.method}
            >
              <Option value="GET">Get</Option>
              <Option value="POST">Post</Option>
              <Option value="PUT">Put</Option>
              <Option value="DELETE">Delete</Option>
            </Select>

            <Input placeholder="请输入接口" onChange={onUrlChange} />
          </div>

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
