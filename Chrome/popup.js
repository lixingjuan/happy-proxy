if (chrome?.tabs?.create) {
  chrome.tabs.create({ url: chrome.extension.getURL('index.html') }, function (tab) {
    // Tab opened.
  });
}
