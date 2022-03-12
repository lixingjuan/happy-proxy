import { useEffect, useState } from "react";

const initSourceData = `
[
  // 先中 后英
  ["中文描述", "English description"],
  ["中文描述2", "Second English description "]
]`;

const getDefaultI18nSource = () => {
  const local = localStorage.getItem("i18n-source-data");
  return local ? local : initSourceData;
};

const getDefaultCode = () => {
  const local = localStorage.getItem("code-data");
  return local || "";
};

const useMemoryInput = () => {
  /** i18n-input  */
  const [sourceData, setSourceData] = useState(getDefaultI18nSource());
  /** 用户输入的code */
  const [codeInput, setCodeInput] = useState(getDefaultCode());

  useEffect(() => {
    localStorage.setItem("i18n-source-data", sourceData);
  }, [sourceData]);

  useEffect(() => {
    localStorage.setItem("code-data", codeInput || "");
  }, [codeInput]);

  return {
    sourceData,
    codeInput,
    setCodeInput,
    setSourceData,
  };
};

export default useMemoryInput;
