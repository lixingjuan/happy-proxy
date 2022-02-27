import { useEffect, useState } from "react";
import MonacoEditor from "react-monaco-editor";
import { getDefaultCode, updateProxyConfig } from "./editor-config";

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
  const [code, setCode] = useState(getDefaultCode);

  const editorDidMount = (editor: any, monaco: any) => {
    console.log("editorDidMount", editor);
    editor.focus();
  };

  const onChange = (newValue: any) => {
    console.log("onChange", newValue);
    setCode(newValue);
    /** 更新本地 */
    chrome.storage.sync.set({ proxyConig: newValue });
    /** 通知后台 */
    updateProxyConfig(newValue);
  };

  useEffect(() => {
    onChange(getDefaultCode());
  }, []);

  return (
    <MonacoEditor
      height="calc(100vh - 200px)"
      width="100vw"
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
