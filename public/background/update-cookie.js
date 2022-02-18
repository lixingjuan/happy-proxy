// cookie domain
let happyCookieDomain = ".datayes-stg.com";

const demo = (val) => {
  window.happyCookieDomain = val;
  /**
   * init cookie
   */
  chrome.cookies.getAll({ domain: val }, (res) => {
    const httpOnlyItems = res.find((it) => it.httpOnly && it.domain === val);

    if (httpOnlyItems) {
      const { name, value } = httpOnlyItems;
      const happyCookie = `${name}=${value}`;
      window.happyCookie = happyCookie;
      console.log("happyCookie update", { domain: val, happyCookie });
    }
  });
};

demo(happyCookieDomain);

/**
 * init happyCookieDomain
 */
chrome.storage.sync.get("happyCookieDomain", (res) => {
  if (res.happyCookieDomain) {
    console.log("happyCookieDomain init", res);
    demo(res.happyCookieDomain);
  }
});

/**
 * listen storage change
 */
chrome.storage.onChanged.addListener((changes) => {
  if (changes.happyCookieDomain) {
    const newValue = changes.happyCookieDomain.newValue;
    console.log("happyCookieDomain changes", newValue);
    demo(newValue);
  }
});

/**
 * listen cookie change
 */
chrome.cookies.onChanged.addListener((res) => {
  const { cookie } = res;
  const { domain, name, value, httpOnly } = cookie;

  if (domain !== happyCookieDomain || !httpOnly) {
    return;
  }

  const newHappyCookie = `${name}=${value}`;

  window.console.log("happyCookie onChanged", {
    happyCookieDomain,
    newHappyCookie,
  });

  Object.assign(window, { happyCookie: newHappyCookie });
});
