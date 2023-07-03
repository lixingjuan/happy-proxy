function onBeforeSendHeaders(details) {
  try {
    console.log(details.url);

    const { originalUrl: encodeOriginalUrl } = new URL(details.url).search
      .slice(1)
      .split('&')
      .reduce((tol, cur) => {
        const [key, value] = cur.split('=');
        Object.assign(tol, { [key]: value });
        return tol;
      }, {});

    const originalUrl = decodeURIComponent(encodeOriginalUrl);
    const beProxyItem = proxyConfigList.find((it) => it.originalUrl === originalUrl);
    if (!beProxyItem) {
      return { requestHeaders: details.requestHeaders };
    }

    const currentItemCookie = details.requestHeaders.find(
      (h) => h.name.toLocaleLowerCase() === 'cookie'
    );



    const happyCookies = beProxyItem.cookies.map(({ name, value })=>`${name}=${value}`)
    const cookieValue = [...happyCookies].concat(currentItemCookie).join(';');



    const headers = [
      ...details.requestHeaders,
      {
        name: 'Cookie',
        value:cookieValue
      }
    ];
    console.log({ headers });
    return { requestHeaders: headers };
  } catch (error) {
    console.log(error.message);
  }
}

chrome.webRequest.onBeforeSendHeaders.addListener(
  onBeforeSendHeaders,
  {
    urls: ['<all_urls>']
  },
  ['blocking', 'requestHeaders', 'extraHeaders']
);
