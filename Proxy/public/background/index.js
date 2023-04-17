window.proxyDisabled = false; // 打开：on, 关闭：disabled
window.proxyConfigMap = {};
// 需要代理的请求数组
window.proxyUrlsArr = [];

/* ****************************************************************************************************
 *                                    更新 proxyUrlsArr
 ************************************************************************************************* */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { action, value } = request;
  console.log({ action, value });
  window.actionCallback[action]?.(value, sendResponse);
});

/* ****************************************************************************************************
 *                                    onBeforeRequest
 ************************************************************************************************* */
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    const url = decodeURIComponent(details.url);

    // 1. 校验, 过滤浏览器插件请求
    if (/^chrome-extension:\/\//i.test(url)) {
      return {};
    }

    // 2. 判断是否需要代理处理
    const proxyItem = window.proxyUrlsArr.find((it) => it.beProxyUrl === url);
    if (!proxyItem) {
      return {};
    }

    // 3. 判断是否已存储过数据
    const target = window.proxyUrlsArr.find((it) => it.beProxyUrl === url).targetUrl;
    const { search = '' } = new URL(url);
    const encodeURI = encodeURIComponent(url);
    const params = search ? `&originalUrl=${encodeURI}` : `?originalUrl=${encodeURI}`;

    const redirectUrl = `${target}${params}`;

    return { redirectUrl, body };
  },
  {
    urls: ['<all_urls>']
  },
  ['blocking']
);

/* ****************************************************************************************************
 *                                    onBeforeSendHeaders
 ************************************************************************************************* */

chrome.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    try {
      console.log(details.url);

      // 解析出原始url，拼接在search中
      const { originalUrl: encodeOriginalUrl } = new URL(details.url).search
        .slice(1)
        .split('&')
        .reduce((tol, cur) => {
          const [key, value] = cur.split('=');
          Object.assign(tol, { [key]: value });
          return tol;
        }, {});

      const originalUrl = decodeURIComponent(encodeOriginalUrl);
      if (!Object.keys(proxyConfigMap).includes(originalUrl)) {
        return { requestHeaders: details.requestHeaders };
      }

      // 需要补充cookie的接口
      const currentItemCookie = details.requestHeaders.find(
        (h) => h.name.toLocaleLowerCase() === 'cookie'
      );

      let happyCookie = window.proxyConfigMap?.[originalUrl]?.cookies;
      if (currentItemCookie) {
        happyCookie += currentItemCookie.value;
      }

      const headers = [
        ...details.requestHeaders,
        {
          name: 'Cookie',
          value: happyCookie || ''
        }
      ];

      console.log({ headers });

      return { requestHeaders: headers };
    } catch (error) {
      console.log(error.message);
    }
  },
  {
    urls: ['<all_urls>']
  },
  ['blocking', 'requestHeaders', 'extraHeaders']
);
