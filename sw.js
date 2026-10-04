const CACHE="unser-zuhause-v292";
const ASSETS=["./","./index.html","./app.js?v=292","./manifest.json","./icon-192.png","./icon-512.png","./apple-touch-icon.png"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{const u=new URL(e.request.url); if(e.request.method!=="GET") return; if(u.pathname.endsWith("/index.html")||u.pathname.endsWith("/sw.js")){e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));return;} e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));});
