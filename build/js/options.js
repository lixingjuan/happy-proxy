import { targetDomain, localUrlKey } from "./constant.js";

const input = document.getElementById("input");
const textarea = document.getElementById("textarea");
const errorMessage = document.getElementById("error-message");

input.value = targetDomain;

const reg = /\n/g;

/**获取本地存储的urls */
chrome.storage.sync.get(localUrlKey, function (val) {
  const urls = val[localUrlKey] || "[]";

  const urlsString = JSON.parse(urls).join("\n");

  textarea.value = urlsString;
});

const errorDom = (text) => {
  errorMessage.innerText = text;
};

const keyupEvent = (val) => {
  const value = val.target.value;
  console.log(value);

  const urlsArr = value.split(reg);

  if (!Array.isArray(urlsArr)) {
    errorDom("输入有误");
    return;
  }

  errorDom("");
  const urlsStr = JSON.stringify(urlsArr);

  chrome.storage.sync.set({ [localUrlKey]: urlsStr }, () => {
    console.log("更新本地", urlsArr);
  });
};

textarea.addEventListener("keyup", keyupEvent);
