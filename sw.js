const CACHE_NAME = 'fast-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
