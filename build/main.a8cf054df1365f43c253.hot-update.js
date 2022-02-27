"use strict";
globalThis["webpackHotUpdateantd_demo_ts"]("main",{

/***/ "./src/components/Editor/editor-config.js":
/*!************************************************!*\
  !*** ./src/components/Editor/editor-config.js ***!
  \************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getDefaultCode": () => (/* binding */ getDefaultCode),
/* harmony export */   "updateProxyConfig": () => (/* binding */ updateProxyConfig)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");

/** chrome.storage.sync.get, 若本地没有，则使用这个 */
const initCode = `{
  // Use IntelliSense to learn about possible links.
  // Type \`rule\` to quick insert rule.
  "proxy": [
    [
      "//alinw.alicdn.com/platform/daily-test/isDaily.js",
      "//alinw.alicdn.com/platform/daily-test/isDaily.json"
    ],
    [
      "alinw.alicdn.com",
      "g.alicdn.com"
    ],
    [
      // "(.*)/platform/daily-test/(.*).js$",
      // "http://localhost:3000/daily-test/$1.js"
    ]
  ]
}
`;

const getDefaultCode = () => {
  let result = initCode;

  if (chrome.storage) {
    chrome.storage.sync.get("proxyConfig", () => {
      result = initCode;
    });
  }

  return result;
};

function updateProxyConfig(data) {
  const config = window.stripJsonComments(data).replace(/\s+/g, "").replace(window.cleanJSONReg, ($0, $1, $2) => $2);

  try {
    console.log("=========data");
    console.log(data);
    console.log("=========config");
    console.log(config);
    chrome.post;
  } catch (e) {
    console.error(e);
  }
}



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
/******/ 	__webpack_require__.h = () => ("51cfdde89f7d2954aaf0")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.a8cf054df1365f43c253.hot-update.js.map