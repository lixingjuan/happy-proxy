const localOrigin = 'http://localhost:4000';
/** 根据原始的url, 获取将要重定向的目标地址 */
function assembleRedirectRequest(originalUrl) {
  try {
    const parseUrlObj = new URL(originalUrl);
    let urlSearchParams = parseUrlObj.searchParams;
    urlSearchParams.append('originalUrl', originalUrl);
    const oldHref = parseUrlObj.href;
    const oldOrigin = parseUrlObj.origin;

    // 把原始的origin, 替换为我们本地服务的origin
    return oldHref.replace(oldOrigin, localOrigin);
  } catch (error) {
    return originalUrl;
  }
}

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    const originalUrl = decodeURIComponent(details.url);
    if (originalUrl.startsWith('chrome-extension://') || originalUrl.startsWith(localOrigin)) {
      return {};
    }

    const matchItem = matchConfigByOriginRequestUrl(originalUrl);
    if (!matchItem) {
      return {};
    }

    return { redirectUrl: assembleRedirectRequest(originalUrl, matchItem) };
  },
  {
    urls: ['<all_urls>']
  },
  ['blocking']
);
