import { useMemo, useState } from "react";
import isEmpty from "lodash-es/isEmpty";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Input, Select, Tooltip, Drawer } from "antd";
import toast from "react-hot-toast";

import { addItemApi } from "../../service";
import ErrorStatus from "../ErrorStatus";

const { Option } = Select;

const AddRecord = ({ onUpdate }: { onUpdate: () => void }) => {
  const [visible, setVisible] = useState(false);

  const [error, setError] = useState("");

  const [params, setParams] = useState({
    url: "",
    method: "GET",
    mockBody: {},
  });

  const onUrlChange = (val: any) => {
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
      toast.error("body 必须是json");
      return;
    }

    addItemApi(params)
      .then((result) => {
        const { code, message: responseMsg } = result;
        if (code < 0) {
          throw new Error(responseMsg);
        }
        toast.success(`add ${responseMsg}`);
        onUpdate?.();
      })
      .catch((error) => {
        toast.error(error.message);
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
      <Tooltip title="增加一条Mock Record" mouseEnterDelay={1} color="#fff">
        <PlusCircleOutlined className="ft-22" onClick={() => setVisible((pre) => !pre)} />
      </Tooltip>

      <Drawer
        width="80vw"
        visible={visible}
        placement="right"
        title="增加一条Mock Record"
        onClose={() => setVisible(false)}
        footer={
          <div className="flex flex-end gap-12">
            <Button onClick={() => setVisible(false)}>取消</Button>
            <Button onClick={handleOk} type="primary" disabled={disabledOk}>
              确认
            </Button>
          </div>
        }
      >
        <div style={{ display: "grid", gridRowGap: "10px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "100px auto" }}>
            <Select defaultValue="Get" onChange={onMethodChange} value={params.method}>
              <Option value="GET">Get</Option>
              <Option value="POST">Post</Option>
              <Option value="PUT">Put</Option>
              <Option value="DELETE">Delete</Option>
            </Select>

            <Input placeholder="请输入接口" onChange={onUrlChange} />
          </div>

          <ErrorStatus error={error} />
          <Input.TextArea
            style={{ height: "70vh" }}
            onChange={onBodyChange}
            placeholder="请输入mock参数"
          />
        </div>
      </Drawer>
    </>
  );
};

export default AddRecord;
