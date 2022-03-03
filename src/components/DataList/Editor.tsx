import MonacoEditor from "react-monaco-editor";

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

const Editor = ({ code }: { code: string }) => {
  return (
    <MonacoEditor
      height="85vh"
      width="100%"
      language="json"
      value={code}
      defaultValue={"{}"}
      theme="vs"
      options={options}
    />
  );
};

export default Editor;
