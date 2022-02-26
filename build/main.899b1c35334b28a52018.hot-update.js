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
Object(function webpackMissingModule() { var e = new Error("Cannot find module './lib/monaco-editor/min/vs'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var _editor_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./editor.js */ "./src/components/Editor/editor.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");

var _jsxFileName = "/Users/lixingjuan/Documents/Codes/my/happy-request/src/components/Editor/index.tsx",
    _s = __webpack_require__.$Refresh$.signature();






const Editor = () => {
  _s();

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    (0,_editor_js__WEBPACK_IMPORTED_MODULE_2__.initEditor)();
  }, []);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)("div", {
    id: "container",
    className: "container"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 11,
    columnNumber: 10
  }, undefined);
};

_s(Editor, "OD7bBpZva5O2jO+Puf00hKivP7c=");

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
/******/ 	__webpack_require__.h = () => ("8849ac37f46f546b1834")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.899b1c35334b28a52018.hot-update.js.map