// TODO 配置
const originalDomain = "https://gw.datayes-stg.com";

// TODO 配置
let cookie = "";

// TODO 配置
chrome.cookies.getAll(
  {
    domain: ".datayes-stg.com",
    name: "cloud-sso-token",
  },
  (res) => {
    cookie = `cloud-sso-token=${
      res.find((it) => it.name === "cloud-sso-token")?.value
    }`;
  }
);
