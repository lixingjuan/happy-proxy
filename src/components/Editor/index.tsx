import { useCallback, useEffect, useState } from "react";
import { getDefaultCode, cleanJSONReg } from "./editor-config";
import stripJsonComments from "strip-json-comments";
import CodeEditor from "../CodeEditor";

const Editor = () => {
  const [code, setCode] = useState<string>(getDefaultCode());

  /** 更新本地 */
  const updateLocal = (val: string) => {
    localStorage.setItem("proxyConfig", val);
  };

  /** 通知后台更新proxyConig  */
  const updateProxyConfig = useCallback((data: string) => {
    const config = stripJsonComments(data)
      .replace(/\s+/g, "")
      .replace(cleanJSONReg, ($0, $1, $2) => $2);

    try {
      console.log("=========config");
      console.log(config);
      updateLocal(data);

      if (!chrome.runtime) {
        return;
      }

      chrome.runtime.sendMessage(
        {
          action: "Update_Proxy_Config",
          value: config,
        },
        (response) => {
          if (response.message === "success") {
            console.log("Update_Proxy_Config 更新成功");
          }
        }
      );
    } catch (e) {
      console.error(e);
    }
  }, []);

  const onChange = useCallback((newValue: any) => {
    console.log("onChange", newValue);
    setCode(newValue);
  }, []);

  useEffect(() => {
    console.log("更新code", code);
    updateProxyConfig(code);
  }, [code, updateProxyConfig]);

  return (
    <CodeEditor
      value={code}
      onChange={onChange}
      height="calc(100vh - 20px)"
      defaultValue={getDefaultCode()}
    />
  );
};

export default Editor;
