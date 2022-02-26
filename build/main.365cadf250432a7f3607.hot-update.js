"use strict";
globalThis["webpackHotUpdateantd_demo_ts"]("main",{

/***/ "./src/components/Editor/editor.js":
/*!*****************************************!*\
  !*** ./src/components/Editor/editor.js ***!
  \*****************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initEditor": () => (/* binding */ initEditor)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");

function initEditor() {
  const editor = window.monaco.editor.create(document.getElementById("container"), {
    value: result.config_for_shown || window.DEFAULT_DATA,
    language: "json",
    minimap: {
      enabled: false
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
    suggestOnTriggerCharacters: true
  });
  window.editor = editor;
}
chrome.storage.sync.get("config_for_shown", result => {
  window.require(["vs/editor/editor.main"], () => {
    function setStorage() {
      const data = editor.getValue();
      const config = window.stripJsonComments(data).replace(/\s+/g, "").replace(window.cleanJSONReg, ($0, $1, $2) => $2);

      try {
        console.log("=========data");
        console.log(data);
        console.log("=========config");
        console.log(config);
      } catch (e) {
        console.error(e);
      }

      chrome.storage.sync.set({
        config_for_shown: data,
        config
      }, () => {});
    }

    setStorage();
    window.monaco.languages.registerCompletionItemProvider("json", {
      provideCompletionItems: () => {
        const textArr = [];
        chrome.extension.getBackgroundPage().urls.forEach(item => {
          if (item) {
            textArr.push({
              label: item,
              kind: window.monaco.languages.CompletionItemKind.Text
            });
          }
        });
        const extraItems = [{
          label: "rule",
          kind: window.monaco.languages.CompletionItemKind.Method,
          insertText: {
            value: `[
  "\${1:from}",
  "\${1:to}"
]\${0}`
          }
        }];
        return [...textArr, ...extraItems];
      }
    });
    editor.onDidChangeModelContent(() => {
      setStorage();
    });
  });
});

function preventSave() {
  console.log("zhixing ");
  document.addEventListener("keydown", e => {
    if (e.keyCode === 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
      e.preventDefault();
    }
  }, false);
}

preventSave();

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (true) {
		let errorOverlay;
		if (true) {
			errorOverlay = false;
		}
		let testMode;
		if (typeof __react_refresh_test__ !== 'undefined') {
			testMode = __react_refresh_test__;
		}
		return __react_refresh_utils__.executeRuntime(
			exports,
			$ReactRefreshModuleId$,
			module.hot,
			errorOverlay,
			testMode
		);
	}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("899b1c35334b28a52018")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.365cadf250432a7f3607.hot-update.js.map