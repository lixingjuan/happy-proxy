import { useState, useEffect } from "react";
import { Radio, Checkbox, Input } from "antd";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import { TrendType, MethodType, UpdateFilterFn, FilterType } from "./types";

interface Props {
  updateFilter: UpdateFilterFn;
  filter: FilterType;
}

const Filters = ({ updateFilter, filter }: Props) => {
  return (
    <div className="flex gap-12">
      <Input
        placeholder="请输入搜索关键词"
        onChange={(e) => updateFilter({ searchKey: e.target.value as string })}
        // onChange={(e) => setSearchKey(e.target.value as string)}
        size="small"
        value={filter.searchKey}
        style={{ width: "200px" }}
      />

      <Radio.Group
        value={filter.timeTrend}
        onChange={(e) => updateFilter({ timeTrend: e.target.value })}
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

      {/* 请求方法 */}
      <Checkbox.Group
        value={filter.methods}
        options={["GET", "POST", "DELETE", "PUT"]}
        onChange={(val) => updateFilter({ methods: val as MethodType[] })}
      />
    </div>
  );
};

export default Filters;
