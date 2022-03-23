import {
  // VFC,
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

import "./userWorker";

export interface EditorRefType {
  beautify: () => void;
}

interface Props {
  style: React.CSSProperties;
  onChange: (val: string) => void;
  defaultValue?: string;
}
export const ProxyEditor = (props: Props, ref: any) => {
  const { style, onChange, defaultValue = "" } = props;

  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);

  const monacoEl = useRef(null);

  useImperativeHandle(ref, () => ({
    beautify: editor?.getAction?.("editor.action.formatDocument")?.run?.(),
  }));

  useEffect(() => {
    if (monacoEl && !editor) {
      const theEditor = monaco.editor.create(monacoEl.current!, {
        value: defaultValue,
        language: "json",
        formatOnPaste: true,
      });
      setEditor(theEditor);
      theEditor?.onKeyUp((a) => {
        onChange?.(theEditor.getValue());
      });
    }

    return () => editor?.dispose?.();
  }, [monacoEl.current]);

  return <div style={style} ref={monacoEl}></div>;
};

export default forwardRef(ProxyEditor);
