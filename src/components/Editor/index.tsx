import { memo } from "react";
import EditorReact, { loader } from "@monaco-editor/react";
import { EditorProps, Monaco } from "@monaco-editor/react/lib/types.d";

loader.config({ paths: { vs: "./vs" } });

function handleEditorWillMount(monaco: Monaco) {
  monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    allowComments: true,
  });
}

export const ProxyEditor = (props: EditorProps) => {
  return <EditorReact {...props} language="json" beforeMount={handleEditorWillMount} />;
};

export default memo(ProxyEditor);
