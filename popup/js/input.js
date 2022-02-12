/** 更新本地 cookie */
(function () {
  const cookieDomainInput = document.getElementById("cookie-domain-input");

  const updateGlobalCookie = (val) => {
    chrome.cookies.getAll(
      {
        domain: val,
      },
      (res) => {
        if (!val) {
          console.error("cookie domain cannot be empty");
          return;
        }
        const httpOnlyCookieArr = res.filter((it) => it.httpOnly);
        const httpOnlyCookies = httpOnlyCookieArr.reduce(
          (tol, { name, value }) => `${tol}${name}=${value}`,
          ""
        );
        chrome.storage.sync.set({
          happyCookie: httpOnlyCookies,
        });
      }
    );
  };

  updateGlobalCookie(cookieDomainInput.value);

  cookieDomainInput.addEventListener("change", (e) => {
    updateGlobalCookie(e.target.value);
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
