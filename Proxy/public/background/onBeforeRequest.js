// 当前url来自插件
function filterBrowserRequest(url) {
  return /^chrome-extension:\/\//i.test(url);
}

// 当前url是否有配置
function filterNoConfigRequest(originalUrl) {
  return !proxyConfigList.find((it) => it.originalUrl === originalUrl);
}

function assembleRedirectRequest(originalUrl, proxyItem) {
  const { search = '' } = new URL(originalUrl);
  const encodeOriginalURL = encodeURIComponent(originalUrl);
  const params = search ? `&originalUrl=${encodeOriginalURL}` : `?originalUrl=${encodeOriginalURL}`;
  const redirectUrl = `${proxyItem.targetUrl}${params}`;
  return { redirectUrl };
}

function onBeforeRequest(details) {
  const originalUrl = decodeURIComponent(details.url);
  if (filterBrowserRequest(originalUrl)) {
    return {};
  }
  if (filterNoConfigRequest(originalUrl)) {
    return {};
  }

  const proxyItem = proxyConfigList.find((it) => it.originalUrl === originalUrl);
  return assembleRedirectRequest(originalUrl, proxyItem);
}

chrome.webRequest.onBeforeRequest.addListener(
  onBeforeRequest,
  {
    urls: ['<all_urls>']
  },
  ['blocking']
);
