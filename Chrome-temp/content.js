// 监听option页面添加url的请求
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === 'addUrl') {
    // 将url添加到option页面的indexDB中
    const dbName = 'optionsDB';
    const storeName = 'urls';
    const dbPromise = window.indexedDB.open(dbName, 1);
    let db;
    dbPromise.onupgradeneeded = function(event) {
      db = event.target.result;
      const store = db.createObjectStore(storeName, { keyPath: 'url' });
    };
    dbPromise.onsuccess = function(event) {
      db = event.target.result;
      const transaction = db.transaction([storeName], 'readwrite');
      const objectStore = transaction.objectStore(storeName);
      const request = objectStore.add({ url: request.url });
      request.onsuccess = function() {
        console.log('URL added:', request.url);
      };
      transaction.oncomplete = function() {
        db.close();
      };
    };
  }
});

// 发送请求给background.js
function sendRequestToBackground(details) {
  chrome.runtime.sendMessage({type: 'getRequest', url: details.url}, function(data) {
    if (data) {
      // 如果有缓存数据，则直接返回缓存数据响应
      const headers = Object.keys(data.headers).map(function(key) {
        return { name: key, value: data.headers[key] };
      });
      const responseBody = new TextEncoder().encode(JSON.stringify(data.responseBody));
      const responseObj = {
        headers: headers,
        body: responseBody
      };
      details.callback(responseObj);
    } else {
      // 如果没有缓存数据，则发送请求给服务器，并保存响应到indexDB中
      const xhr = new XMLHttpRequest();
      xhr.open(details.method, details.url, true);
      for (let i = 0; i < details.requestHeaders.length; i++) {
        const header = details.requestHeaders[i];
        xhr.setRequestHeader(header.name, header.value);
      }
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          const headersArray = xhr.getAllResponseHeaders().trim().split(/[\r\n]+/);
          const headers = headersArray.reduce(function(acc, curr) {
            const parts = curr.split(': ');
            const header = { name: parts[0], value: parts[1] };
            acc[header.name] = header.value;
            return acc;
          }, {});
          const responseType = xhr.getResponseHeader('content-type');
          const responseBody = responseType.includes('application/json') ? JSON.stringify(xhr.response) : xhr.response;
          const responseObj = {
            headers: headers,
            body: responseBody
          };
          chrome.runtime.sendMessage({type: 'storeRequest', url: details.url, method: details.method, headers: details.requestHeaders, body: details.requestBody, responseBody: responseObj});
          details.callback(responseObj);
        }
      };
      xhr.send(details.requestBody ? JSON.stringify(details.requestBody) : null);
    }
  });
}

// 监听网络请求，并将请求转发给background.js
chrome.webRequest.onBeforeRequest.addListener(function(details) {
  if (urlMatches(details.url)) {
    return { cancel: true };
  } else if (details.method === 'GET') {
    sendRequestToBackground(details);
  } else {
    // 如果是POST、PUT、DELETE等需要将请求体发送给服务器的请求，则需要延迟发送至onBeforeSendHeaders事件
    return { redirectUrl: 'javascript:' };
  }
}, {urls: ['<all_urls>']}, ['requestHeaders', 'requestBody']);

// 监听onBeforeSendHeaders事件，并将包含请求体的请求转发给background.js
chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
  if (details.method !== 'GET' && !urlMatches(details.url) && details.requestBody) {
    sendRequestToBackground(details);
  }
}, {urls: ['<all_urls>']}, ['requestHeaders', 'requestBody']);