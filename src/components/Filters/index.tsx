// import React, { useState } from "react";
import { Button, Popover, Divider } from "antd";

import { Radio } from "antd";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  FilterOutlined,
} from "@ant-design/icons";

const Content = () => {
  // const [time, setTime] = useState(1);
  // const [tags, settags] = useState(1);

  // const onChange = (e: any) => {
  //   console.log("radio checked", e.target.value);
  //   setTime(e.target.value);
  // };

  return (
    <div style={{ width: "350px" }}>
      <Radio.Group className="grid-4 margin-top-8">
        <Radio value={1}>
          时间
          <CaretUpOutlined />
        </Radio>
        <Radio value={2}>
          时间
          <CaretDownOutlined />
        </Radio>
      </Radio.Group>

      <Radio.Group className="grid-4 margin-top-8">
        <Radio value={1}>
          tags
          <CaretUpOutlined />
        </Radio>
        <Radio value={2}>
          tags
          <CaretDownOutlined />
        </Radio>
      </Radio.Group>

      <Radio.Group className="grid-4 margin-top-8">
        <Radio value={"GET"}>GET</Radio>
        <Radio value={"POST"}>POST</Radio>
        <Radio value={"DELETE"}>DELETE</Radio>
        <Radio value={"PUT"}>PUT</Radio>
      </Radio.Group>

      <Divider className="margin-top-12 margin-bottom-12" />

      <div className="align-right">
        <Button>重置</Button>
      </div>
    </div>
  );
};

const Demo = () => {
  return (
    <div>
      <Popover
        placement="bottom"
        title={"排序"}
        content={Content}
        trigger="click"
      >
        <FilterOutlined />
      </Popover>
    </div>
  );
};

export default Demo;
