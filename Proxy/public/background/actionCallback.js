/** 当前拦截规则的数量 */
const setIcon = () => {
  try {
    const values = Object.values(window.proxyConfigMap || {});
    const text = `${values.filter((it) => it.open === true)?.length}`;

    const cba = chrome.browserAction;
    if (cba) {
      cba.setBadgeText({ text });
    }
  } catch {}
};

/**
 * 获取二级域名
 * "gw.datayes-stg.com" => '.datayes-stg.com'
 */
const getCookieDomain = (url) => {
  try {
    const origin = new URL(url).origin;
    return `.${origin.split('.').slice(-2).join('.')}`;
  } catch {
    return '';
  }
};

const actionCallback = {
  /** 更新转发配置 */
  Update_Proxy_Config_Map: (value, sendResponse) => {
    try {
      window.proxyConfigMap = value;

      const values = Object.values(window.proxyConfigMap || {});
      console.log('Update_Proxy_Config_Map', value);
      sendResponse({ message: 'success' });
      setIcon();

      values.forEach((it) => {
        const cookieDomain = getCookieDomain(it.original);

        chrome.cookies.getAll({ domain: cookieDomain }, (resArr) => {
          const cookiesStr = resArr
            .filter((it) => it.httpOnly)
            .map(({ name, value }) => `${name}=${value}`)
            .join('; ');

          Object.assign(it, {
            cookies: cookiesStr
          });
        });
      });
    } catch (error) {
      window.proxyConfigMap = {};
      sendResponse({ message: error.message });
    }
  },
  Update_Config_Arr: () => {
    const databaseName = 'happyProxy';
    const tableUrls = 'tableUrls';

    let request = indexedDB.open(databaseName, 1);

    request.onupgradeneeded = function (event) {
      let db = event.target.result;
      db.createObjectStore(tableUrls, { keyPath: 'beProxyUrl' });
    };

    let getRequest = indexedDB.open(databaseName, 1);
    getRequest.onsuccess = function (event) {
      const db = event.target.result;
      const transaction = db.transaction([tableUrls], 'readonly');

      const objectStore = transaction.objectStore(tableUrls);
      const getRequest = objectStore.getAll();

      getRequest.onsuccess = function () {
        window.proxyUrlsArr = (getRequest.result || []).map((it) => it.open);
        console.log('proxyUrlsArr更新成功', proxyUrlsArr);
      };
    };
  }
};

window.actionCallback = actionCallback;
