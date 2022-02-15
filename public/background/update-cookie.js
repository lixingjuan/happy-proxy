// cookie domain
let happyCookieDomain = ".datayes-stg.com";

const demo = (val) => {
  window.happyCookieDomain = val;
  /**
   * init cookie
   */
  chrome.cookies.getAll({ domain: val }, (res) => {
    const httpOnlyItems = res.filter((it) => it.httpOnly && it.domain === val);

    const happyCookie = httpOnlyItems.reduce(
      (tol, { name, value }) => `${name}=${value}&${tol}`,
      ""
    );

    console.log("happyCookie update", { happyCookieDomain: val, happyCookie });
    window.happyCookie = happyCookie;
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
