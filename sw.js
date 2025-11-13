// ✅ اسم الكاش - غيّره عند كل تحديث
const CACHE_NAME = "naoumatk-store-v2";

// 🧱 الملفات التي سيتم تخزينها
const ASSETS = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/script2.js",
  "/images/logo.png",
  "/store.html",
  "/contact.html",
  "/about.html",
  "/privacy.html",
  "/refund.html",
  "/payment.html",
  "/yourskin.html",
  "/shipping.html",
  "/cart.html",
  "/creams.html",
  "/serums.html",
  "/cleansers.html",
  "/sunscreen.html",
  "/peels.html",
  "/toners.html",
  "/perfumes.html",
  "/masks.html"
];

// 📥 عند التثبيت — خزن الملفات
self.addEventListener("install", (event) => {
  console.log("🆕 تثبيت Service Worker جديد...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// 🚀 عند التفعيل — حذف الكاش القديم
self.addEventListener("activate", (event) => {
  console.log("♻️ تفعيل النسخة الجديدة من Service Worker...");
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
});

// 🌐 عند كل طلب — جلب من الكاش أولًا ثم من الشبكة
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).then((response) => {
          // حفظ الملفات الجديدة التي لم تكن في الكاش
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
      );
    })
  );
});
