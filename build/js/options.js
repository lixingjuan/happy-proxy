// https://gw.datayes-stg.com/ams_monitor_qa/web/industry/prosperity/comparison-chart/selection

const localOriginalUrlKey = "LOCAL_ORIGINAL_URLS";

const localTargetUrlKey = "LOCAL_TARGET_URLS";

const targetDomain = "http://127.0.0.1:4000";

const originalDomain = "https://gw.datayes-stg.com";

const nReg = /\n/g;

const hostReg = /^http(s)?:\/\/(.*?)\//;

const input = document.getElementById("input");
const originalTextarea = document.getElementById("original-textarea");
const targetTextarea = document.getElementById("target-textarea");
const errorMessage = document.getElementById("error-message");

input.value = targetDomain;

/**
 * @desc 更新目标 textarea
 * @param {*} val
 */
const updateTargetTextarea = (originalUrlArr) => {
  const result = originalUrlArr.map((it) =>
    it.replace(hostReg, `${targetDomain}/`)
  );

  const urlsString = result.join("\n");

  targetTextarea.value = urlsString;
};

/**
 * 获取本地存储的用户上次输入的urls
 */
chrome.storage.sync.get(localOriginalUrlKey, function (val) {
  const urls = val[localOriginalUrlKey] || "[]";

  const urlsArr = JSON.parse(urls);
  const urlsStr = urlsArr.join("\n");

  originalTextarea.value = urlsStr;
  updateTargetTextarea(urlsArr);
});

const errorDom = (text) => {
  errorMessage.innerText = text;
};

/* ****************************************************************************************************
 *                                    被代理地址
 ************************************************************************************************* */
const originalKeyupEvent = (val) => {
  const value = val.target.value;
  console.log(value);

  const urlsArr = value.split(nReg);

  if (!Array.isArray(urlsArr)) {
    errorDom("输入有误");
    return;
  }

  errorDom("");
  const urlsStr = JSON.stringify(urlsArr);

  updateTargetTextarea(urlsArr);

  chrome.storage.sync.set({ [localOriginalUrlKey]: urlsStr }, () => {
    console.log("更新本地", urlsArr);
  });
};

originalTextarea.addEventListener("keyup", originalKeyupEvent);
