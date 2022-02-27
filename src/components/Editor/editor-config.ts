const cleanJSONReg = /(,+)([^a-z0-9["])/gi;

/** chrome.storage.sync.get, 若本地没有，则使用这个 */
const initCode = `{
  // Use IntelliSense to learn about possible links.
  // Type \`rule\` to quick insert rule.
  "proxy": [
    // [
    //    "被代理地址",
    //    "目标地址"
    // ],
    // [
    //    "(.*)/platform/daily-test/(.*).js$",
    //    "http://localhost:3000/daily-test/$1.js"
    // ],
    [
      "https://gw.datayes-stg.com/ams_monitor_qa",
      "http://127.0.0.1:4000/ams_monitor_qa"
    ]
  ]
}
`;

const getDefaultCode = () => {
  let result = initCode;
  if (chrome.storage) {
    chrome.storage.sync.get("proxyConfig", (result) => {
      try {
        if (result.proxyConfig) {
          result = JSON.parse(result.proxyConfig);
        }
      } catch (e) {
        console.warn("can not parse config", result.config);
      }
    });
  }
  return result;
};

export { getDefaultCode, cleanJSONReg };
