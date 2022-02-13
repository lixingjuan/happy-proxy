/** 更新本地 cookie */
(function () {
  const cookieDomainInput = document.getElementById("cookie-domain-input");

  const updateGlobalCookieDomain = (val) => {
    chrome.storage.sync.set({
      happyCookieDomain: val,
    });
  };

  updateGlobalCookieDomain(cookieDomainInput.value);

  cookieDomainInput.addEventListener("change", (e) => {
    updateGlobalCookieDomain(e.target.value);
  });
})();

/** 更新全局 真实目标domain */
(function () {
  const originalDomainInput = document.getElementById("original-domain-input");

  chrome.storage.sync.set({
    happyDomain: originalDomainInput.value,
  });

  originalDomainInput.addEventListener("change", (e) => {
    chrome.storage.sync.set({
      happyDomain: e.target.value,
    });
  });
})();

/**
 *
 *
 *
 *
 *
 */

/** 监听本地happyCookieDomain对应的cookie变化 */
let happyCookieDomain = "";

chrome.storage.sync.get("happyCookieDomain", (res) => {
  happyCookieDomain = res.happyCookieDomain;
});

chrome.cookies.onChanged.addListener((res) => {
  console.log(res);
  const { cookie } = res;
  const { domain, name, value, httpOnly } = cookie;

  if (domain !== happyCookieDomain) {
    return;
  }

  if (!httpOnly) {
    return;
  }

  const newHappyCookie = `${name}=${value}`;
  console.log({ newHappyCookie });

  chrome.storage.sync.set({
    happyCookie: newHappyCookie,
  });
});

// chrome.cookies.onChanged.addListener(
//   {
//     domain: happyCookieDomain,
//   },
//   (res) => {
//     console.log({ res });
//   }
// );
