const onBeforeSendHeaders = (details) => {
  try {
    const { initiator, url } = details;

    // 从路径search获取编码后的原始url
    const encodeOriginalUrl = new URL(url).searchParams.get('originalUrl');
    if (!encodeOriginalUrl) return { requestHeaders: details.requestHeaders };

    console.log('encodeOriginalUrl', encodeOriginalUrl);

    // 对原始url进行解码
    const originalUrl = encodeOriginalUrl ? decodeURIComponent(encodeOriginalUrl) : '';

    // 不需要处理的情况
    const notNeedHandle =
      !originalUrl ||
      originalUrl.startsWith('chrome-extension://') ||
      !matchConfigByOriginRequestUrl(originalUrl);

    if (notNeedHandle) {
      return { requestHeaders: details.requestHeaders };
    }

    // 补充cookie
    const currentItemCookie = details.requestHeaders.find(
      (h) => h.name.toLocaleLowerCase() === 'cookie'
    );

    const matchedProxyItem = matchConfigByOriginRequestUrl(originalUrl);
    const happyCookies = matchedProxyItem.cookies.map(({ name, value }) => `${name}=${value}`);

    // 组装最终版本cookie
    const cookieValue = [...happyCookies].concat(currentItemCookie).join(';');

    // headers
    const headers = [
      ...details.requestHeaders,
      {
        name: 'Cookie',
        value: cookieValue
      },
      {
        name: 'Referer',
        value: new URL(initiator).host
      },
      {
        name: 'happy-config-url',
        value: encodeURIComponent(matchedProxyItem.originalUrl)
      }
    ];

    return { requestHeaders: headers };
  } catch (error) {
    console.log(error.message);
  }
};

chrome.webRequest.onBeforeSendHeaders.addListener(
  onBeforeSendHeaders,
  {
    urls: ['<all_urls>']
  },
  ['blocking', 'requestHeaders', 'extraHeaders']
);
