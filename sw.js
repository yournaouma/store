// ✅ Service Worker بسيط لتخزين صفحات وملفات المتجر
const CACHE_NAME = "naoumatk-store-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/script2.js",
  "/images/logo.png",

  // 🛍️ صفحات نعومة نعومتك
  "/store-creams.html",       // 💆‍♀️ متجر الكريمات
  "/store-serums.html",       // 💦 متجر السيرومات
  "/store-cleansers.html",    // 🧴 متجر المنظفات
  "/store-sunscreens.html",   // ☀️ متجر واقي الشمس
  "/store-perfumes.html",     // 🌸 متجر العطور
  "/store-toners.html",       // 💧 متجر التونر
  "/store-exfoliants.html",   // 🍯 متجر المقشرات
  "/consult.html",            // 💬 استشارة بشرتك
  "/contact.html"             // 📞 اتصل بنا
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
