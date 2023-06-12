import { openDB } from 'idb';

const dbPromise = openDB('happy-proxy', 1, {
  upgrade(db) {
    db.createObjectStore('proxy-list');
  }
});

export async function getAll() {
  return (await dbPromise).getAll('proxy-list');
}
export async function get(key: string) {
  return (await dbPromise).get('proxy-list', key);
}
export async function set(key: string, val: Record<any, any>) {
  return (await dbPromise).put('proxy-list', val, key);
}
export async function del(key: string) {
  return (await dbPromise).delete('proxy-list', key);
}
export async function clear() {
  return (await dbPromise).clear('proxy-list');
}
export async function keys() {
  return (await dbPromise).getAllKeys('proxy-list');
}
