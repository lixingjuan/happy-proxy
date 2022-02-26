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

/**
 * @desc 生成项目国际化中英文配置json
 */
const getUpperStr = (val: string, maxKeyLength: number = 5) =>
  val.toLocaleUpperCase().split(" ").slice(0, maxKeyLength).join("_").trim();

const getResultStr = (
  arr: [string, string][],
  maxKeyLength: number
): string => {
  const enRes = arr.reduce(
    (tol, [zhStr, enStr]) =>
      (tol += `"${getUpperStr(enStr, maxKeyLength)}": "${enStr}",
`),
    ""
  );

  const zhRes = arr.reduce(
    (tol, [zhStr, enStr]) =>
      (tol += `"${getUpperStr(enStr, maxKeyLength)}": "${zhStr}",
`),
    ""
  );

  return `
${enRes}

${zhRes}
  `;
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
  }, [maxKeyLength]);

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
          name="输入"
          onChange={onChange}
          value={sourceDate}
          rows={20}
          placeholder={placeholder}
        />
        <TextArea
          id="result"
          name="格式化后的结果"
          rows={20}
          value={resultDate}
        />
      </div>
    </>
  );
}
