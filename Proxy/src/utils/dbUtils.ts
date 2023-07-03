import { openDB } from 'idb';

const indexDBName = 'happy-proxy';
const proxyStoreName = 'proxy-list';

const dbPromise = openDB(indexDBName, 1, {
  upgrade(db) {
    db.createObjectStore(proxyStoreName);
  }
});

export async function getAll() {
  return (await dbPromise).getAll(proxyStoreName);
}
export async function get(key: string) {
  return (await dbPromise).get(proxyStoreName, key);
}
export async function set(key: string, val: Record<any, any>) {
  return (await dbPromise).put(proxyStoreName, val, key);
}
export async function del(key: string) {
  return (await dbPromise).delete(proxyStoreName, key);
}
export async function clear() {
  return (await dbPromise).clear(proxyStoreName);
}
export async function keys() {
  return (await dbPromise).getAllKeys(proxyStoreName);
}
