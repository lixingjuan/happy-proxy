// This file must be placed on the same directory to "manifest.json"
// since below code works as a service worker.

const ruleId = 1;
const happyCookie = "ceeeeeeeeeeeeeeeeeeeeeee";

const rules = {
  removeRuleIds: [ruleId],
  addRules: [
    /** 重定向 */
    {
      id: 7,
      priority: 1,
      action: {
        type: "redirect",
        redirect: {
          regexSubstitution: "http://127\\.0\\.0\\.1:4000\\.com",
        },
      },
      condition: {
        regexFilter: "^https://gw\\.datayes-stg\\.com",
        resourceTypes: ["main_frame"],
      },
    },
    /** 添加自定义头部 */
    {
      id: 2,
      priority: 1,
      condition: {
        domains: ["www.google.com"],
        resourceTypes: ["main_frame", "xmlhttprequest"],
      },
      action: {
        type: "modifyHeaders",
        requestHeaders: [
          {
            header: "happyCookie",
            operation: "set",
            value: happyCookie,
          },
        ],
        responseHeaders: [
          {
            header: "response-header-ceeeeeeeeeeeeeeeeeeeeeee",
            operation: "set",
            value: "response",
          },
        ],
      },
    },
  ],
};

chrome.declarativeNetRequest.updateDynamicRules(rules, () => {
  if (chrome.runtime.lastError) {
    console.log(chrome.runtime.lastError);
  } else {
    chrome.declarativeNetRequest.getDynamicRules((rules) => console.log(rules));
  }
});

// You can use `chrome.declarativeNetRequest.updateSessionRules` instead of `updateDynamicRules`.
// If you use it, the rules are not persisted across browser sessions.
//   ==> https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#method-updateSessionRules
//
// Use `getSessionRules` in order to get session-scoped rules.
//   ==> https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#method-getSessionRules
