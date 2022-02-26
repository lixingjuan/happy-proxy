"use strict";
globalThis["webpackHotUpdateantd_demo_ts"]("main",{

/***/ "./src/App.tsx":
/*!*********************!*\
  !*** ./src/App.tsx ***!
  \*********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.css */ "./src/App.css");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/tabs/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/message/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _components_Buttons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Buttons */ "./src/components/Buttons.tsx");
/* harmony import */ var _components_Editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/Editor */ "./src/components/Editor/index.tsx");
/* harmony import */ var _components_Table__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/Table */ "./src/components/Table.tsx");
/* harmony import */ var _components_I18nTransform__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/I18nTransform */ "./src/components/I18nTransform.tsx");
/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./service */ "./src/service.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");

var _jsxFileName = "/Users/lixingjuan/Documents/Codes/my/happy-request/src/App.tsx",
    _s = __webpack_require__.$Refresh$.signature();










const {
  TabPane
} = antd__WEBPACK_IMPORTED_MODULE_8__["default"];
const defaultActiveKey = localStorage.getItem("activeTab") || "1";
const style = {
  height: "100vh",
  margin: "0px auto",
  width: "calc(100vw - 40px)"
};

function App() {
  _s();

  const [activeTab, setActiveTab] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(defaultActiveKey);
  const [dataSource, setDataSource] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  /** update data */

  const handleUpdate = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    (0,_service__WEBPACK_IMPORTED_MODULE_6__.getAllApi)().then(_ref => {
      let {
        data,
        code
      } = _ref;
      antd__WEBPACK_IMPORTED_MODULE_9__["default"].success("query successful");
      const dataArr = Object.entries(data).reverse().map(_ref2 => {
        var _filePath$split;

        let [url, filePath = ""] = _ref2;
        return {
          url,
          filePath: (_filePath$split = filePath.split("my")) === null || _filePath$split === void 0 ? void 0 : _filePath$split[1]
        };
      });
      setDataSource(dataArr);
    }).catch(err => antd__WEBPACK_IMPORTED_MODULE_9__["default"].error("error", err.message));
  }, []);

  const onChange = val => {
    setActiveTab(val);
    localStorage.setItem("activeTab", val);
  };

  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)("div", {
    className: "App",
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_8__["default"], {
      style: style,
      onChange: onChange,
      activeKey: activeTab,
      defaultActiveKey: defaultActiveKey,
      tabBarExtraContent: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(_components_Buttons__WEBPACK_IMPORTED_MODULE_2__["default"], {
        onUpdate: handleUpdate
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 57,
        columnNumber: 29
      }, this),
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(TabPane, {
        tab: "\u7F16\u8F91\u5668",
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(_components_Editor__WEBPACK_IMPORTED_MODULE_3__["default"], {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 60,
          columnNumber: 11
        }, this)
      }, "1", false, {
        fileName: _jsxFileName,
        lineNumber: 59,
        columnNumber: 9
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(TabPane, {
        tab: "\u672C\u5730\u6570\u636E",
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(_components_Table__WEBPACK_IMPORTED_MODULE_4__["default"], {
          onUpdate: handleUpdate,
          dataSource: dataSource
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 63,
          columnNumber: 11
        }, this)
      }, "2", false, {
        fileName: _jsxFileName,
        lineNumber: 62,
        columnNumber: 9
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(TabPane, {
        tab: "\u56FD\u9645\u5316",
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(_components_I18nTransform__WEBPACK_IMPORTED_MODULE_5__["default"], {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 66,
          columnNumber: 11
        }, this)
      }, "3", false, {
        fileName: _jsxFileName,
        lineNumber: 65,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 52,
      columnNumber: 7
    }, this)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 51,
    columnNumber: 5
  }, this);
}

_s(App, "hd+haQpOwo1oWS6OPO617BWSJKA=");

_c = App;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);

var _c;

__webpack_require__.$Refresh$.register(_c, "App");

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
/******/ 	__webpack_require__.h = () => ("365cadf250432a7f3607")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.1c41c11b52ff7798fe93.hot-update.js.map