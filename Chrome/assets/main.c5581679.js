import{c as i,j as n,R as d,A as u}from"./App.529452ed.js";const p=document.getElementById("root"),l=i.createRoot(p);l.render(n(d.StrictMode,{children:n(u,{})}));const x="happy-proxy",e="proxy-list";function y(){const c=window.indexedDB.open(x);c.onsuccess=function(t){var o;const r=((o=t==null?void 0:t.target)==null?void 0:o.result).transaction(e,"readwrite").objectStore(e).getAll();r.onsuccess=function(s){const a=s.target.result;window.proxyConfig=a}}}y();
