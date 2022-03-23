import { useCallback, useRef } from "react";
import { message } from "antd";
import stripJsonComments from "strip-json-comments";
import debounce from "lodash-es/debounce";

import CodeEditor from "src/components/Editor";
import { getDefaultCode, cleanJSONReg } from "./editor-config";

const Editor = () => {
  const EditorInstance = useRef(null);

  // const [code, setCode] = useState<string>(getDefaultCode());

  /** 更新本地 */
  const updateLocal = (val: string) => {
    localStorage.setItem("proxyConfig", val);
  };

  /** 更新本地 */
  const updateBackground = (config: string) => {
    if (chrome?.runtime) {
      chrome.runtime.sendMessage(
        {
          action: "Update_Proxy_Config",
          value: config,
        },
        (response) => {
          if (response.message === "success") {
            message.success("Update_Proxy_Config 更新成功");
          } else {
            message.error(response.message);
          }
        }
      );
    }
  };

  /** 去除注释 */
  const getConfig = (data: string) => {
    const config = stripJsonComments(data)
      .replace(/\s+/g, "")
      .replace(cleanJSONReg, ($0, $1, $2) => $2);
    return config;
  };

  /** 更新本地 & 通知background  */
  const updateProxyConfig = useCallback((data: string) => {
    const config = getConfig(data);
    console.log("通知后台更新", config);
    updateBackground(config);
  }, []);

  const onChange = useCallback(
    (newValue: string) => {
      // setCode(newValue);

      updateLocal(newValue);

      updateProxyConfig(newValue);
    },
    [updateProxyConfig]
  );

  return (
    <CodeEditor
      ref={EditorInstance}
      style={{
        height: "calc(100vh - 46px)",
      }}
      onChange={debounce(onChange, 700)}
      defaultValue={getDefaultCode()}
    />
  );
};

export default Editor;
