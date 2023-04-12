import{c as e,j as t,R as o,A as c}from"./App.b3261ac9.js";const r=document.getElementById("root"),n=e.createRoot(r);n.render(t(o.StrictMode,{children:t(c,{})}));


const databaseName = 'happyProxy';
const tableUrls = 'tableUrls';

// 数据库引用
let db = null;
let request = indexedDB.open(databaseName, 1);

request.onsuccess = function (event) {
  db = event.target.result;
  console.log('open database success');
};

request.onupgradeneeded = function (event) {
  const db = event.target.result;
  db.createObjectStore(tableUrls, { keyPath: "url" });
};


document.getElementById('demo').addEventListener('click', () => {
  console.log('hello');
  const transaction = db.transaction(tableUrls, 'readwrite');
  const store = transaction.objectStore(tableUrls);
  store.add({
    url: 'https://www.baidu.com',
    value: 'https://www.baidu.com-value'
  });
})