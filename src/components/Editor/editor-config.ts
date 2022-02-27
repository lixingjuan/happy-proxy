import stripJsonComments from "strip-json-comments";

const cleanJSONReg = /(,+)([^a-z0-9["])/gi;

/** chrome.storage.sync.get, 若本地没有，则使用这个 */
const initCode = `{
  // Use IntelliSense to learn about possible links.
  // Type \`rule\` to quick insert rule.
  "proxy": [
    [
      "//alinw.alicdn.com/platform/daily-test/isDaily.js",
      "//alinw.alicdn.com/platform/daily-test/isDaily.json"
    ],
    [
      "alinw.alicdn.com",
      "g.alicdn.com"
    ],
    [
      // "(.*)/platform/daily-test/(.*).js$",
      // "http://localhost:3000/daily-test/$1.js"
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

function updateProxyConfig(data: string) {
  const config = stripJsonComments(data)
    .replace(/\s+/g, "")
    .replace(cleanJSONReg, ($0, $1, $2) => $2);

  try {
    console.log("=========data");
    console.log(data);
    console.log("=========config");
    console.log(config);
    if (!chrome.runtime) {
      return;
    }
    chrome.runtime.sendMessage(
      {
        action: "Update_Proxy_Config",
        value: config,
      },
      (response) => {
        if (response.message === "success") {
          console.log("Update_Proxy_Config 更新成功");
        }
      }
    );
  } catch (e) {
    console.error(e);
  }
}

export { getDefaultCode, updateProxyConfig };
