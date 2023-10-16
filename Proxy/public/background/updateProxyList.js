const indexDBName = 'happy-proxy';
const proxyStoreName = 'proxy-list';
window.proxyConfigList = [];

// 获取指定域名的cookie
const getCookie = (url) => {
  return new Promise((resolve) => {
    chrome.cookies.getAll({ url, secure: true }, (cookies) => {
      resolve(cookies);
    });
  });
};

/** 当前拦截规则的数量 */
const setIcon = () => {
  try {
    const cba = chrome.browserAction;
    if (cba) {
      cba.setBadgeText({ text: String(window.proxyConfigList.length) });
    }
  } catch {}
};

function updateProxyConfig() {
  const request = window.indexedDB.open(indexDBName);

  request.onsuccess = function (event) {
    const db = event?.target?.result;
    const transaction = db.transaction(proxyStoreName, 'readwrite');
    const objectStore = transaction.objectStore(proxyStoreName);
    const request = objectStore.getAll();

    request.onsuccess = function (event) {
      const result = event.target.result;

      const openedList = result.filter((it) => it.open === true);

      Promise.all(openedList.map((it) => getCookie(it.originalUrl))).then((cookieList) => {
        console.log({ cookieList });
        window.proxyConfigList = openedList.map((it, index) => ({
          ...it,
          cookies: cookieList?.[index]
        }));
        console.log('proxyConfigList', proxyConfigList);
        console.log('更新成功');

        setIcon();
      });
    };

    request.onerror = function () {
      window.proxyConfigList = [];
      console.log('获取失败');
    };
  };
}

chrome.runtime.onMessage.addListener((request) => {
  const { action, value } = request;
  console.log({ action, value });
  // 监听前台信息，进行配置
  updateProxyConfig();
});

/** 当前url是否已有配置： 先精准匹配，再模糊匹配 */
const matchConfigByOriginRequestUrl = (currentReqUrl) => {
  if (!currentReqUrl) return null;

  const configList = window.proxyConfigList;
  if (!configList.length) return null;

  const strictMatchItem = configList.find((it) => it.originalUrl === currentReqUrl);
  if (strictMatchItem) return strictMatchItem;

  const vaguelyMatchItem = configList.find((it) => urlToRegExp(it.originalUrl).test(currentReqUrl));
  return vaguelyMatchItem || null;
};

/** 转换url为正则表达式 */
const urlToRegExp = (target) => {
  const formatInput = target
    .replaceAll('/', '/')
    .replaceAll('?', '\\?')
    .replace(/\.([a-zA-Z0-9])/g, '\\.$1');

  const str = `^${formatInput}` + '$';
  return new RegExp(str);
};

window.matchConfigByOriginRequestUrl = matchConfigByOriginRequestUrl;
window.urlToRegExp = urlToRegExp;
