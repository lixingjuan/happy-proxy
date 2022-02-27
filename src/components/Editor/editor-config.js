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
    chrome.storage.sync.get("proxyConfig", () => {
      result = initCode;
    });
  }
  return result;
};

function updateProxyConfig(data) {
  const config = window
    .stripJsonComments(data)
    .replace(/\s+/g, "")
    .replace(window.cleanJSONReg, ($0, $1, $2) => $2);

  try {
    console.log("=========data");
    console.log(data);
    console.log("=========config");
    console.log(config);

    chrome.post;
  } catch (e) {
    console.error(e);
  }
}

export { getDefaultCode, updateProxyConfig };
