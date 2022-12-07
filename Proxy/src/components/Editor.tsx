import { memo } from 'react';
import * as monaco from 'monaco-editor';
import EditorReact, { loader } from '@monaco-editor/react';
import { EditorProps, Monaco } from '@monaco-editor/react/lib/types.d';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

window.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new jsonWorker();
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker();
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker();
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker();
    }
    return new editorWorker();
  }
};

loader.config({ monaco });

function handleEditorWillMount(monaco: Monaco) {
  monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    allowComments: true
  });
}

export const ProxyEditor = (props: EditorProps) => {
  return <EditorReact {...props} language="json" beforeMount={handleEditorWillMount} />;
};

export default memo(ProxyEditor);
