window.proxyDisabled = false; // 打开：on, 关闭：disabled
window.proxyConfigMap = {};

/* ****************************************************************************************************
 *                                    初始化监听前台发送的信息
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
    // 1. 校验, 过滤浏览器请求
    if (/^chrome-extension:\/\//i.test(url)) {
      return {};
    }

    // 2. 过滤无配置请求
    const proxyItem = window.proxyConfigMap[url];
    if (!proxyItem) {
      return {};
    }

    // 3. 组装转发请求
    const { search = '' } = new URL(url);
    const encodeURI = encodeURIComponent(url);
    const params = search ? `&originalUrl=${encodeURI}` : `?originalUrl=${encodeURI}`;
    const redirectUrl = `${proxyItem.targetUrl}${params}`;

    return { redirectUrl };
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
