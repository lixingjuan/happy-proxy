"use strict";

var _slicedToArray = (function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
      for (
        var _i = arr[Symbol.iterator](), _s;
        !(_n = (_s = _i.next()).done);
        _n = true
      ) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError(
        "Invalid attempt to destructure non-iterable instance"
      );
    }
  };
})();

var _ = require("lodash");

var e = React.createElement;

var LikeButton = function LikeButton() {
  var _React$useState = React.useState(true),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    like = _React$useState2[0],
    setlike = _React$useState2[1];

  console.log({ _: _ });

  var handleClick = function handleClick() {
    setlike(function (pre) {
      return !pre;
    });
    console.log("调用增加接口");
  };

  return React.createElement(
    "button",
    { onClick: handleClick },
    "\u6253\u5F00\u5F39\u7A97\u8BA9\u7528\u6237\u8F93\u5165\u5185\u5BB9\uFF0C\u589E\u52A0mock\u6570\u636E"
  );
};

var domContainer = document.querySelector("#like_button_container");
ReactDOM.render(e(LikeButton), domContainer);
