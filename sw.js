// ✅ Service Worker بسيط لتخزين صفحات وملفات المتجر
const CACHE_NAME = "naoumatk-store-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/script2.js",
  "/images/logo.png"
];

// عند التثبيت — يتم حفظ الملفات في الكاش
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// عند الطلب — نحاول تحميل من الكاش أولاً
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
