const defaultCode = `{
  // Use IntelliSense to learn about possible links.
  // Type \`rule\` to quick insert rule.
  // For more information, visit: https://github.com/yize/xswitch
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

const options = {
  selectOnLineNumbers: true,
  minimap: {
    enabled: false,
  },
  fontSize: 14,
  fontFamily: "Fira Code, monospace",
  fontLigatures: true,
  contextmenu: false,
  scrollBeyondLastLine: false,
  folding: true,
  useTabStops: true,
  wordBasedSuggestions: true,
  quickSuggestions: true,
  suggestOnTriggerCharacters: true,
};

function updateConfig(data) {
  const config = window
    .stripJsonComments(data)
    .replace(/\s+/g, "")
    .replace(window.cleanJSONReg, ($0, $1, $2) => $2);
  debugger;
  try {
    console.log("=========data");
    console.log(data);
    console.log("=========config");
    console.log(config);
  } catch (e) {
    console.error(e);
  }
}

export { defaultCode, options, updateConfig };
