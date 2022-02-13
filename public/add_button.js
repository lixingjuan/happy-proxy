"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var e = React.createElement;

var LikeButton = function LikeButton() {
  console.log({ React: React });
  console.log({ antd: antd });

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      visible = _React$useState2[0],
      setVisible = _React$useState2[1];

  var _useState = useState({}),
      _useState2 = _slicedToArray(_useState, 2),
      addMockParams = _useState2[0],
      setAddMockParams = _useState2[1];

  var handleClick = function handleClick() {
    setVisible(function (pre) {
      return !pre;
    });
  };

  var onUrlChange = function onUrlChange(val) {
    console.log({ val: val });
    var url = val.target.value;
    setAddMockParams(function (pre) {
      return Object.assign({}, pre, { url: url });
    });
  };

  var onBodyChange = function onBodyChange(val) {
    console.log({ val: val });
    var mockBody = val.target.value;
    setAddMockParams(function (pre) {
      return Object.assign({}, pre, { mockBody: mockBody });
    });
  };

  var handleOk = function handleOk() {
    fetch(apiQueryPathMap, {
      method: "delete",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      referrerPolicy: "no-referrer"
    }).then(function (res) {
      var status = res.status,
          statusText = res.statusText;

      if (status === 500) {
        throw new Error("" + (status, statusText));
      }
      handleUpdate();
      antd.messages.success("删除成功");
    }).catch(function (err) {
      antd.messages.error("\u5220\u9664\u5931\u8D25:" + err.messages);
    });
  };

  return React.createElement(
    "div",
    null,
    React.createElement(
      antd.Button,
      { onClick: handleClick },
      "\u6253\u5F00\u5F39\u7A97\u8BA9\u7528\u6237\u8F93\u5165\u5185\u5BB9\uFF0C\u589E\u52A0mock\u6570\u636E"
    ),
    React.createElement(
      antd.Modal,
      { visible: visible, title: "Add one mock item", onOk: handleOk },
      React.createElement(
        "div",
        null,
        React.createElement(antd.Input, { placeholder: "\u8BF7\u8F93\u5165\u63A5\u53E3", onChange: onUrlChange }),
        React.createElement(antd.Input.TextArea, {
          onChange: onBodyChange,
          placeholder: "\u8BF7\u8F93\u5165mock\u53C2\u6570",
          style: { marginTop: "24px" }
        })
      )
    )
  );
};

var domContainer = document.querySelector("#add_button_container");
ReactDOM.render(e(LikeButton), domContainer);