import { useCallback } from "react";
import MonacoEditor from "react-monaco-editor";
// import MonacoEditor from "@monaco-editor/react";

interface Props {
  value: string;
  height?: string;
  defaultValue?: string;
  onChange?: (val: string) => void;
}

const Editor = ({
  defaultValue,
  value,
  onChange: onChangeProps,
  height,
}: Props) => {
  const onChange = useCallback(
    (val: any) => {
      onChangeProps?.(val);
    },
    [onChangeProps]
  );

  return (
    <MonacoEditor
      height={height}
      width="100%"
      theme="light"
      defaultValue={defaultValue}
      value={value}
      language="json"
      options={{
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
      }}
      onChange={onChange}
    />
  );
};

export default Editor;
