// const databaseName = 'happyProxy';
// const tableUrls = 'tableUrls';
// // 数据库引用
// let db = null;
// // urls table 的 objectStore
// let urlsTableObjectStore = null;

// window.urlsTableObjectStore = urlsTableObjectStore;

// // Open the database
// let request = indexedDB.open(databaseName, 1);

// // When the database is opened successfully, create an object store
// request.onupgradeneeded = function (event) {
//   db = event.target.result;
//   urlsTableObjectStore = db.createObjectStore(tableUrls, { keyPath: 'url' });
//   window.urlsTableObjectStore = urlsTableObjectStore
// };

// // When the database is opened successfully, add data to the store
// request.onsuccess = function (event) {
//   db = event.target.result;
//   let transaction = db.transaction([tableUrls], 'readwrite');
//   urlsTableObjectStore = transaction.objectStore(tableUrls);
//   window.urlsTableObjectStore = urlsTableObjectStore
// };

// // objectStore.add({ id: 1, name: 'Alice' });
// // objectStore.add({ id: 2, name: 'Bob' });
// // transaction.oncomplete = function() {
// //   console.log('Data added to database');
// // };
// // Retrieve data from the store
// // let getRequest = indexedDB.open(databaseName, 1);
// // getRequest.onsuccess = function(event) {
// //   db = event.target.result;
// //   let transaction = db.transaction([tableUrls], 'readonly');
// //   let objectStore = transaction.objectStore(tableUrls);
// //   let getRequest = objectStore.get(1);
// //   getRequest.onsuccess = function() {
// //     console.log(getRequest.result); // { id: 1, name: 'Alice' }
// //   };
// // };
