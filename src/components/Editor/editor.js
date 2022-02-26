export function initEditor() {
  const editor = window.monaco.editor.create(
    document.getElementById("container"),
    {
      value: result.config_for_shown || window.DEFAULT_DATA,
      language: "json",

      minimap: {
        enabled: false,
      },
      fontFamily: "Fira Code, monospace",
      fontSize: 13,
      fontLigatures: true,

      contextmenu: false,
      scrollBeyondLastLine: false,
      folding: true,
      showFoldingControls: "always",

      useTabStops: true,
      wordBasedSuggestions: true,
      quickSuggestions: true,
      suggestOnTriggerCharacters: true,
    }
  );
  window.editor = editor;
}

chrome.storage.sync.get("config_for_shown", (result) => {
  window.require(["vs/editor/editor.main"], () => {
    function setStorage() {
      const data = editor.getValue();
      const config = window
        .stripJsonComments(data)
        .replace(/\s+/g, "")
        .replace(window.cleanJSONReg, ($0, $1, $2) => $2);
      try {
        console.log("=========data");
        console.log(data);
        console.log("=========config");
        console.log(config);
      } catch (e) {
        console.error(e);
      }

      chrome.storage.sync.set(
        {
          config_for_shown: data,
          config,
        },
        () => {}
      );
    }

    setStorage();

    window.monaco.languages.registerCompletionItemProvider("json", {
      provideCompletionItems: () => {
        const textArr = [];
        chrome.extension.getBackgroundPage().urls.forEach((item) => {
          if (item) {
            textArr.push({
              label: item,
              kind: window.monaco.languages.CompletionItemKind.Text,
            });
          }
        });

        const extraItems = [
          {
            label: "rule",
            kind: window.monaco.languages.CompletionItemKind.Method,
            insertText: {
              value: `[
  "\${1:from}",
  "\${1:to}"
]\${0}`,
            },
          },
        ];
        return [...textArr, ...extraItems];
      },
    });

    editor.onDidChangeModelContent(() => {
      setStorage();
    });
  });
});

function preventSave() {
  console.log("zhixing ");
  document.addEventListener(
    "keydown",
    (e) => {
      if (
        e.keyCode === 83 &&
        (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)
      ) {
        e.preventDefault();
      }
    },
    false
  );
}

preventSave();
