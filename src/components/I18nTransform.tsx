import React, { useEffect, useState } from "react";
import { Input, Button, Space, InputNumber } from "antd";
import ErrorStatus from "./ErrorStatus";

import stripJsonComments from "strip-json-comments";
import { writeTextToClipboard } from "../utils";

const { TextArea } = Input;

const placeholder = `[
  /**
   * 输入json, 前中文，后英文, 例如
   * [
   *    ["中文描述", "English description"],
   *    ["中文描述2", "English description second"]
   * ]
   */
]`;

const initData = `
[
  // 先中 后英
  ["中文描述", "English description"],
  ["中文描述2", "Second English description "]
]`;

const getResultStr = (arr: any, keyMaxLength = 5) => {
  let zhResult = ``;
  let enResult = ``;

  arr.forEach((it: any, index: number) => {
    const [zhStr, enStr] = it;

    const i18nKey = enStr
      .toLocaleUpperCase()
      .split(" ")
      .slice(0, keyMaxLength)
      .join("_");

    zhResult = `${zhResult}${index !== 0 ? "," : ""}\n${i18nKey}: ${zhStr}`;

    enResult = `${enResult}${index !== 0 ? "," : ""}\n${i18nKey}: ${zhStr}`;
  });

  return zhResult + "\n\n\n" + enResult;
};

export default function I18nTransform() {
  const [error, setError] = useState("");
  const [sourceDate, setSourceDate] = useState(initData);
  const [resultDate, setResultDate] = useState("");

  /** key 截取单词数 */
  const [maxKeyLength, setMaxKeyLength] = useState(5);

  const onChange = (e: any) => {
    try {
      const newValue = e.target.value;
      console.log("newValue", newValue);
      setSourceDate(newValue);

      const excludesComments = stripJsonComments(newValue);
      const arr = JSON.parse(excludesComments);
      const result = getResultStr(arr, maxKeyLength);

      setResultDate(result);
      setError("");
    } catch (error: any) {
      console.log({ error });
      setError(error?.message);
    }
  };

  /** 更新结果 */
  const onUpdate = () => {
    onChange({
      target: {
        value: initData,
      },
    });
  };

  /** copy result */
  const onCopyResult = () => {
    writeTextToClipboard(resultDate);
  };

  useEffect(() => {
    onUpdate();
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "40px",
        }}
      >
        <ErrorStatus error={error} />
        <Space>
          <InputNumber
            min={1}
            max={10}
            size="small"
            value={maxKeyLength}
            onChange={(val) => setMaxKeyLength(val)}
          />
          <Button onClick={onCopyResult} size="small">
            Copy Result
          </Button>
          <Button onClick={onUpdate} size="small">
            Update Result
          </Button>
        </Space>
      </div>

      <div
        id="i18-transform-container"
        style={{
          display: "grid",
          width: "calc(100vw - 24px)",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridColumnGap: "10px",
        }}
      >
        <TextArea
          id="source"
          onChange={onChange}
          value={sourceDate}
          rows={20}
          placeholder={placeholder}
        />
        <TextArea id="result" rows={20} value={resultDate} />
      </div>
    </>
  );
}
