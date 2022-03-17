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
  fontSize: 12,
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

function CodeEditor({
  onChange,
  value,
  height,
  defaultValue,
  theme = "light",
}: Props) {
  const onMount = (a: any, editor: any) => {
    editor.languages.json.jsonDefaults.setDiagnosticsOptions({
      allowComments: true,
    });
  };

  return (
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
  );
}

export default CodeEditor;
