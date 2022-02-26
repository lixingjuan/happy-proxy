import { useState } from "react";
import MonacoEditor from "react-monaco-editor";
import { defaultCode, updateConfig, options } from "./editor-config";

const Editor = () => {
  const [code, setCode] = useState(defaultCode);
  const editorDidMount = (editor: any, monaco: any) => {
    console.log("editorDidMount", editor);
    editor.focus();
  };

  const onChange = (newValue: any) => {
    console.log("onChange", newValue);
    updateConfig(newValue);
  };

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
