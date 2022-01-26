// https://gw.datayes-stg.com/ams_monitor_qa/web/industry/prosperity/comparison-chart/selection

/** 本地存储的urls的key */
const localOriginalUrlKey = "LOCAL_ORIGINAL_URLS";

const localTargetUrlKey = "LOCAL_TARGET_URLS";

const targetDomain = "http://127.0.0.1:4000";

const targetHost = new URL(targetDomain).host;

const originalDomain = "https://gw.datayes-stg.com";

let cookie = "";

let filterUrls = [];

let targetUrls = [];

chrome.cookies.getAll(
  {
    domain: ".datayes-stg.com",
    name: "cloud-sso-token",
  },
  (res) => {
    console.log({ res });
    cookie = res.find((it) => it.name === "cloud-sso-token")?.value;
    console.log(2);
  }
);

chrome.storage.sync.get(localOriginalUrlKey, function (val) {
  const localUrls = val[localOriginalUrlKey] || "[]";

  // 需要拦截的Urls列表
  filterUrls = JSON.parse(localUrls);

  // 重定向后的urls列表
  targetUrls = filterUrls.map((it) =>
    it.replace(/\/\/.*\//, `//${targetHost}/`)
  );
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  console.log("本地storage 改变", { changes, namespace });
});
