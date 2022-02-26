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
/* harmony import */ var react_monaco_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-monaco-editor */ "./node_modules/react-monaco-editor/lib/index.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");

var _jsxFileName = "/Users/lixingjuan/Documents/Codes/my/happy-request/src/components/Editor/index.tsx";


const code = "// type your code...";
const options = {
  selectOnLineNumbers: true,
  fontSize: 14
}; //
//  value: result.config_for_shown || window.DEFAULT_DATA,
//  language: "json",
//
//  minimap: {
//    enabled: false,
//  },
//  fontFamily: "Fira Code, monospace",
//  fontSize: 13,
//  fontLigatures: true,
//
//  contextmenu: false,
//  scrollBeyondLastLine: false,
//  folding: true,
//  showFoldingControls: "always",
//
//  useTabStops: true,
//  wordBasedSuggestions: true,
//  quickSuggestions: true,
//  suggestOnTriggerCharacters: true,
//

const Editor = () => {
  const editorDidMount = (editor, monaco) => {
    console.log("editorDidMount", editor);
    editor.focus();
  };

  const onChange = (newValue, e) => {
    console.log("onChange", newValue, e);
  };

  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(react_monaco_editor__WEBPACK_IMPORTED_MODULE_0__["default"], {
    width: "100vw",
    height: "600",
    language: "json",
    theme: "default",
    value: code,
    options: options,
    onChange: onChange,
    editorDidMount: editorDidMount
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 40,
    columnNumber: 5
  }, undefined);
};

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
/******/ 	__webpack_require__.h = () => ("a3e7af4d0f31da6225a2")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.cbd2c71c3a6ecf16364d.hot-update.js.map