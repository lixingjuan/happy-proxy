// import Editor, { useMonaco } from "@monaco-editor/react";
import Editor from "react-monaco-editor";

interface Props {
  value: string;
  defaultValue: string;
  height?: string | number;
  onChange?: (value: string) => void;
}

function CodeEditor({ onChange, value, height, defaultValue }: Props) {
  const onMount = (a: any, editor: any) => {
    editor.languages.json.jsonDefaults.setDiagnosticsOptions({
      allowComments: true,
    });
  };

  return (
    <>
      <Editor
        height={height} // By default, it fully fits with its parent
        theme={"light"}
        value={value}
        language="json"
        onChange={onChange}
        defaultValue={defaultValue}
        editorDidMount={onMount}
      />
    </>
  );
}

export default CodeEditor;
