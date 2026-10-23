/* Unser Zuhause service worker – v346. Keep all app assets on one build version. */
const CACHE='unser-zuhause-v346';
const ASSETS=['./','./index.html','./app.js?v=346','./manifest.json','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install',event=>{
  event.waitUntil((async()=>{
    const cache=await caches.open(CACHE);
    // Do not activate a partially cached release: addAll rejects if any asset fails.
    await cache.addAll(ASSETS);
    await self.skipWaiting();
  })());
});
self.addEventListener('activate',event=>event.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(key=>key.startsWith('unser-zuhause-')&&key!==CACHE).map(key=>caches.delete(key)));
  await self.clients.claim();
})()));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin)return;
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE);
    const cached=await cache.match(event.request);
    if(cached)return cached;
    try{
      const response=await fetch(event.request);
      if(response&&response.ok&&event.request.url.startsWith(self.location.origin))await cache.put(event.request,response.clone());
      return response;
    }catch(error){
      const fallback=await cache.match('./index.html');
      if(fallback)return fallback;
      throw error;
    }
  })());
});
