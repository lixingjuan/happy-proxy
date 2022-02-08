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
    cookie = `cloud-sso-token=${
      res.find((it) => it.name === "cloud-sso-token")?.value
    }`;
    console.log(2);
  }
);
