// 创建indexDB对象
const dbName = 'interceptedRequests';
const storeName = 'requests';
const dbPromise = window.indexedDB.open(dbName, 1);
let db;

// 初始化indexDB
dbPromise.onupgradeneeded = function(event) {
  db = event.target.result;
  const store = db.createObjectStore(storeName, { keyPath: 'url' });
};

dbPromise.onsuccess = function(event) {
  db = event.target.result;
};

dbPromise.onerror = function(event) {
  console.error('Unable to open indexedDB:', event.target.error);
};

// 监听option页面添加url的请求
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === 'addUrl') {
    let url = request.url.trim();
    if (url && !url.startsWith('http')) {
      url = 'http://' + url;
    }
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {type: 'addUrl', url: url});
    });
  }
});

// 监听网络请求，并拦截指定url的请求
chrome.webRequest.onBeforeRequest.addListener(function(details) {
  // 检查是否需要拦截该请求
  if (urlMatches(details.url)) {
    const headers = details.requestHeaders.reduce(function (acc, curr) {
      acc[curr.name] = curr.value;
      return acc;
    }, {});
    const requestObj = {
      url: details.url,
      method: details.method,
      headers: headers,
      body: details.requestBody,
      timestamp: new Date().toISOString()
    };
    const transaction = db.transaction([storeName], 'readwrite');
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.get(details.url);
    request.onsuccess = function (event) {
      const data = event.target.result;
      if (!data) {
        objectStore.add(requestObj);
      }
    };
    transaction.oncomplete = function () {
      console.log('Request stored:', requestObj);
    };
  } else {
    // console.log('不匹配', details.url)
    // 将details.url 写入indexDB中
    const transaction = db.transaction([storeName], 'readwrite');
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.get(details.url);
    request.onsuccess = function (event) {
      const data = event.target.result;
      if (!data) {
        objectStore.add({url: details.url});
      }
    }
  }
}, { urls: ['<all_urls>'] }, [
   'blocking', 'extraHeaders', 'requestBody',
   'requestBody']);

function urlMatches(url) {
  // 从indexDB中获取要拦截的url列表
  const transaction = db.transaction([storeName], 'readonly');
  const objectStore = transaction.objectStore(storeName);
  const request = objectStore.openCursor();
  const urls = ["https://gw.datayes-stg.com/aladdin_apigw_qa/web/whitelist/query/suggestion/*"];
  request.onsuccess = function(event) {
    const cursor = event.target.result;
    if (cursor) {
      urls.push(cursor.value.url);
      cursor.continue();
    } else {
      // 匹配url
      for (let i = 0; i < urls.length; i++) {
        if (url.startsWith(urls[i])) {
          return true;
        }
      }
    }
  };
  transaction.oncomplete = function() {
    return false;
  };
}