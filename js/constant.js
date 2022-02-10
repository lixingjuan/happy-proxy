// TODO 之后放在页面配置
const originalDomain = "https://gw.datayes-stg.com";
const cookieDomain = ".datayes-stg.com";
const cookieName = "cloud-sso-token";

window.originalDomain = originalDomain;

/** 初始化获取指定 */
chrome.cookies.getAll(
  {
    domain: ".datayes-stg.com",
    name: "cloud-sso-token",
  },
  (res) => {
    const value = res.find((it) => it.name === cookieName)?.value;

    cookie = [cookieName, value].join("=");
    window.cookie = cookie;
  }
);

/** 监听cookie更新 */
chrome.cookies.onChanged.addListener(({ cookie }) => {
  const { domain, value, name } = cookie;
  if (domain === cookieDomain) {
    cookie = [name, value].join("=");
    window.cookie = cookie;
  }
});
