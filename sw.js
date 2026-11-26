const CACHE='avaliacao-76e1ece7c7';
const ARQ=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ARQ)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url); if(u.origin!==location.origin)return;
  const nav=e.request.mode==='navigate';
  e.respondWith(
    fetch(e.request).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put(nav?'./index.html':e.request,cp));return r;})
    .catch(()=>caches.match(nav?'./index.html':e.request).then(r=>r||caches.match('./index.html')))
  );
});
