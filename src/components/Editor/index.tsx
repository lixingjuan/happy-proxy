import React, { useRef, useImperativeHandle } from "react";
import Editor, { loader } from "@monaco-editor/react";

loader.config({
  paths: {
    vs: "./packages",
  },
});

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

interface Props {
  value: string;
  defaultValue?: string;
  theme?: "vs-dark" | "light";
  height?: string | number;
  onChange?: (value: string) => void;
}

export interface EditorRefType {
  beautify: () => void;
}

const CodeEditor = React.forwardRef<EditorRefType, Props>(
  ({ onChange, value, height, defaultValue, theme = "light" }, ref) => {
    const EditorRef = useRef<any>();

    const onMount = (editorInstance: any, editor: any) => {
      EditorRef.current = editorInstance;
      editor.languages.json.jsonDefaults.setDiagnosticsOptions({
        allowComments: true,
      });
    };

    useImperativeHandle(ref, () => ({
      beautify: EditorRef.current?.getAction?.(["editor.action.formatDocument"])
        ?._run,
    }));

    return (
      <div>
        <Editor
          height={height}
          theme={theme}
          value={value}
          language="json"
          onChange={(val) => onChange?.(val || "")}
          defaultValue={defaultValue}
          onMount={onMount}
          options={options}
        />
      </div>
    );
  }
);

export default CodeEditor;
