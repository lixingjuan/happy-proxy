import { useState } from "react";
import { Radio, Checkbox, Button, Popover, Divider } from "antd";
import {
  FilterOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import { TrendType, MethodType, UpdateFilterFn } from "src/types";

const CheckboxGroup = Checkbox.Group;

const Filters = ({ updateFilter }: { updateFilter: UpdateFilterFn }) => {
  const [timeTrend, setTimeTrend] = useState<TrendType>();

  const [methods, setMethods] = useState<MethodType[]>([]);

  const onMethodChange = (val: any[]) => {
    setMethods(val);
  };

  const onTimeTrendChange = (e: any) => {
    setTimeTrend(e.target.value);
  };

  const onConfirm = () =>
    updateFilter({
      methods,
      timeTrend,
    });

  const onReset = () => {
    setMethods([]);
    setTimeTrend(undefined);
  };

  const Content = () => {
    return (
      <div style={{ width: "350px" }}>
        <Radio.Group
          className="grid-4 margin-top-8"
          value={timeTrend}
          onChange={onTimeTrendChange}
        >
          <Radio value="ascend">
            时间
            <CaretUpOutlined />
          </Radio>
          <Radio value="descend">
            时间
            <CaretDownOutlined />
          </Radio>
        </Radio.Group>

        {/* <Radio.Group className="grid-4 margin-top-8">
          <Radio value={1}>
            Tags
            <CaretUpOutlined />
          </Radio>
          <Radio value={2}>
            Tags
            <CaretDownOutlined />
          </Radio>
        </Radio.Group>
        */}
        <CheckboxGroup
          value={methods}
          options={["GET", "POST", "DELETE", "PUT"]}
          onChange={onMethodChange}
        />

        <Divider className="margin-top-12 margin-bottom-12" />

        <div className="align-right">
          <Button onClick={onReset}>重置</Button>
          <Button onClick={onConfirm}>确认</Button>
        </div>
      </div>
    );
  };

  return (
    <Popover
      placement="bottom"
      title={"排序"}
      content={Content}
      trigger="click"
    >
      <FilterOutlined className="font-24 color-purple" />
    </Popover>
  );
};

export default Filters;
