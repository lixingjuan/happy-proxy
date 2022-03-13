import { useCallback, useEffect, useState } from "react";
import { Input, Button, Space, InputNumber } from "antd";
import ErrorStatus from "../ErrorStatus";
import styled from "styled-components";
import stripJsonComments from "strip-json-comments";
import { writeTextToClipboard } from "../../utils";
import useMemoryInput from "./hook";
import { Card } from "antd";

const { TextArea } = Input;

const StyledWrapper = styled.div`
  width: calc(100vw - 20px);
  padding: 0px 10px;
  .header {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .card-list {
    display: grid;
    grid-gap: 12px;
    overflow: auto;
    grid-template-columns: repeat(2, 1fr);
    height: calc(100vh - 120px);
  }

  .result-card-title {
    display: grid;
    grid-template-columns: 40px auto;
    .right {
      display: flex;
      justify-content: flex-end;
    }
  }
`;

const StyledCard = styled(Card)`
  height: max-content;
  .ant-card-body {
    padding: 1px 0px 0px 0px;
    height: max-content;
  }
`;

const StyledTextArea = styled(TextArea)`
  border: none;
  height: 100%;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
`;

const placeholder = `[
  /**
   * 输入json, 前中文，后英文, 例如
   * [
   *    ["中文描述", "English description"],
   *    ["中文描述2", "English description second"]
   * ]
   */
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

const getResultArr = (
  arr: [string, string][],
  maxKeyLength: number
): string[][] => {
  const res = arr.map(([zhStr, enStr]) => [
    getUpperStr(enStr, maxKeyLength),
    zhStr,
  ]);
  const sortedRes = res.sort((a, b) => b[1].length - a[1].length);

  return sortedRes;
};

export default function I18nTransform() {
  /** 解析错误 */
  const [error, setError] = useState("");

  const { sourceData, codeInput, setCodeInput, setSourceData } =
    useMemoryInput();

  /** key 截取单词数 */
  const [maxKeyLength, setMaxKeyLength] = useState(5);
  /** i18n-result */
  const [resultData, setResultData] = useState("");
  /** i18n-result-array */
  const [resultArr, setResultArr] = useState<string[][]>([]);
  /** code-result */
  const [codeResult, setCodeResult] = useState("");

  /** 更新i18n结果 */
  const updateI18InputResult = useCallback(() => {
    try {
      const excludesComments = stripJsonComments(sourceData);
      const arr = JSON.parse(excludesComments);
      const resultString = getResultStr(arr, maxKeyLength);
      const resultArr = getResultArr(arr, maxKeyLength);

      setResultData(resultString);
      setResultArr(resultArr);
      setError("");
    } catch (error: any) {
      console.log({ error });
      setError(error?.message);
    }
  }, [maxKeyLength, sourceData]);

  /** input onChange */
  const onChange = useCallback(
    (e: any) => {
      const newValue = e.target.value;
      console.log("newValue", newValue);
      setSourceData(newValue);
    },
    [setSourceData]
  );

  /** 更新代码解析结果 */
  const updateCodeResult = useCallback(() => {
    let res = resultArr.reduce(
      (tol, [enKey, zhText]) => tol.replaceAll(zhText, `t('${enKey}')`),
      codeInput
    );

    if (!res.includes("react-i18next")) {
      res = `
        import { useTranslation } from 'react-i18next';
        import { ICF_TRANSLATE_NAME } from '../constants';
        const { t } = useTranslation(ICF_TRANSLATE_NAME);

        ${res}
      `;
    }

    setCodeResult(res);
  }, [resultArr, codeInput]);

  /** 代码改变 */
  const onCodeChange = (e: any) => {
    const newValue = e.target.value;
    setCodeInput(newValue);
  };

  /** copy result */
  const onCopyResult = () => {
    writeTextToClipboard(resultData);
  };

  useEffect(() => {
    updateI18InputResult();
  }, [maxKeyLength, updateI18InputResult, sourceData]);

  useEffect(() => {
    updateCodeResult();
  }, [codeInput, updateCodeResult]);

  return (
    <>
      <StyledWrapper>
        <div id="i18-transform-container" className="card-list">
          <StyledCard
            size="small"
            title={
              <div className="result-card-title">
                <span>原始数组</span>
                <div className="right">
                  <ErrorStatus error={error} />
                </div>
              </div>
            }
          >
            <StyledTextArea
              id="source"
              rows={10}
              onChange={onChange}
              value={sourceData}
              placeholder={placeholder}
            />
          </StyledCard>

          <StyledCard
            size="small"
            title={
              <div className="result-card-title">
                <span>格式化后的结果</span>
                <div className="right">
                  <Space size="small">
                    <span>key length:</span>
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
              </div>
            }
          >
            <StyledTextArea rows={10} value={resultData} />
          </StyledCard>

          <StyledCard size="small" title="输入要执行替换的代码">
            <StyledTextArea
              rows={10}
              value={codeInput}
              onChange={onCodeChange}
              placeholder={"输入要执行替换的代码"}
            />
          </StyledCard>

          <StyledCard size="small" title="替换后的代码">
            <StyledTextArea
              rows={10}
              value={codeResult}
              placeholder={"替换后的代码"}
            />
          </StyledCard>
        </div>
      </StyledWrapper>
    </>
  );
}
