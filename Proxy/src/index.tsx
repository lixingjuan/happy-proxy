import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const indexDBName = 'happy-proxy';
const proxyStoreName = 'proxy-list';

/** 从名称为happy-proxy对应的indexDB中的proxy-list对应的表中，读取数据，并更新到window.proxyConfig */
function updateProxyConfig() {
  const request = window.indexedDB.open(indexDBName);
  request.onsuccess = function (event) {
    const db = event?.target?.result;
    const transaction = db.transaction(proxyStoreName, 'readwrite');
    const objectStore = transaction.objectStore(proxyStoreName);
    const request = objectStore.getAll();
    request.onsuccess = function (event) {
      const result = event.target.result;
      window.proxyConfig = result;
    };
  };
}

updateProxyConfig();
