"use strict";
globalThis["webpackHotUpdateantd_demo_ts"]("main",{

/***/ "./src/components/Editor/index.tsx":
/*!*****************************************!*\
  !*** ./src/components/Editor/index.tsx ***!
  \*****************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_monaco_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-monaco-editor */ "./node_modules/react-monaco-editor/lib/index.js");
/* harmony import */ var _editor_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./editor-config */ "./src/components/Editor/editor-config.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");

var _jsxFileName = "/Users/lixingjuan/Documents/Codes/my/happy-request/src/components/Editor/index.tsx",
    _s = __webpack_require__.$Refresh$.signature();





const options = {
  selectOnLineNumbers: true,
  minimap: {
    enabled: false
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
  suggestOnTriggerCharacters: true
};

const Editor = () => {
  _s();

  const [code, setCode] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(_editor_config__WEBPACK_IMPORTED_MODULE_2__.getDefaultCode);

  const editorDidMount = (editor, monaco) => {
    console.log("editorDidMount", editor);
    editor.focus();
  };

  const onChange = newValue => {
    console.log("onChange", newValue);
    setCode(newValue);
    /** 更新本地 */

    chrome.storage.sync.set({
      proxyConig: JSON.stringify(newValue)
    });
    (0,_editor_config__WEBPACK_IMPORTED_MODULE_2__.updateProxyConfig)(newValue);
  };

  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(react_monaco_editor__WEBPACK_IMPORTED_MODULE_1__["default"], {
    height: "calc(100vh - 200px)",
    width: "100vw",
    language: "json",
    theme: "default",
    value: code,
    options: options,
    onChange: onChange,
    editorDidMount: editorDidMount
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 38,
    columnNumber: 5
  }, undefined);
};

_s(Editor, "dCpuG2+acme5ZOAxQSIMrzjs9jY=");

_c = Editor;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Editor);

var _c;

__webpack_require__.$Refresh$.register(_c, "Editor");

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
/******/ 	__webpack_require__.h = () => ("a8cf054df1365f43c253")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.b2ff5d4479290a55d0a7.hot-update.js.map