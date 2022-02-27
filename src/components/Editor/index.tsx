import { useCallback, useEffect, useState } from "react";
import MonacoEditor from "react-monaco-editor";
import { getDefaultCode, cleanJSONReg } from "./editor-config";
import stripJsonComments from "strip-json-comments";

const options = {
  selectOnLineNumbers: true,
  minimap: {
    enabled: false,
  },
  fontSize: 14,
  fontFamily: "Fira Code, monospace",
  fontLigatures: true,
  contextmenu: false,
  scrollBeyondLastLine: false,
  folding: true,
  useTabStops: true,
  wordBasedSuggestions: true,
  quickSuggestions: true,
  suggestOnTriggerCharacters: true,
};

const Editor = () => {
  const [code, setCode] = useState(getDefaultCode());

  /** 编辑器加载完成 */
  const editorDidMount = (editor: any) => {
    console.log("editorDidMount", editor);
    editor.focus();
  };

  /** 更新本地 */
  const updateLocal = (val: string) => {
    if (chrome.storage) {
      chrome.storage.sync.set({ proxyConig: val });
    }
  };

  /** 通知后台更新proxyConig  */
  function updateProxyConfig(data: string) {
    const config = stripJsonComments(data)
      .replace(/\s+/g, "")
      .replace(cleanJSONReg, ($0, $1, $2) => $2);

    try {
      console.log("=========config");
      console.log(config);
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
  }

  const onChange = useCallback((newValue: any) => {
    console.log("onChange", newValue);
    setCode(newValue);
  }, []);

  useEffect(() => {
    updateLocal(code);
    updateProxyConfig(code);
  }, [code]);

  return (
    <MonacoEditor
      height="calc(100vh - 200px)"
      width="100%"
      language="json"
      theme="default"
      value={code}
      options={options}
      onChange={onChange}
      editorDidMount={editorDidMount}
    />
  );
};

export default Editor;
