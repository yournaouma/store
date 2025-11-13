// ✅ اسم الكاش (غيّره عند كل تحديث لإجبار التحديث)
const CACHE_NAME = "naoumatk-store-v7";

// 🧱 الملفات الثابتة (يتم تخزينها أول مرة فقط)
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/script2.js",
  "/images/logo.png",

  // 🛍️ صفحات المتجر
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
  "/masks.html",

  // ⚠️ صفحة بدون إنترنت
  "/offline.html"
];

// 📥 تثبيت الـ Service Worker وتخزين الملفات الأساسية
self.addEventListener("install", (event) => {
  console.log("🆕 تثبيت Service Worker...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
});

// ♻️ تفعيل النسخة الجديدة وحذف الكاشات القديمة
self.addEventListener("activate", (event) => {
  console.log("♻️ تفعيل النسخة الجديدة...");
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
});

// 🌐 التعامل مع كل الطلبات
self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        // ✅ الملف موجود في الكاش
        return cachedResponse;
      }

      // ⚙️ الملف غير موجود → نحاول جلبه من الإنترنت
      return fetch(request)
        .then((response) => {
          const valid =
            response &&
            response.status === 200 &&
            response.type === "basic" &&
            /\.(png|jpg|jpeg|webp|gif|svg|css|js|html)$/.test(request.url);

          if (valid) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
              limitCacheSize(CACHE_NAME, 120); // 🧹 حد أقصى 120 ملف
            });
          }

          return response;
        })
        .catch(async () => {
          // 🔌 لا يوجد إنترنت
          if (request.destination === "document") {
            const url = new URL(request.url);
            const pageName = url.pathname.split("/").pop();

            // نحاول إيجاد صفحة مشابهة في الكاش
            const allCached = await caches.open(CACHE_NAME).then((c) => c.keys());
            const found = allCached.find((r) => r.url.endsWith(pageName));

            if (found) {
              return caches.match(found);
            }

            // ⚠️ إذا لم نجدها → نعرض offline.html
            return caches.match("/offline.html");
          }
        });
    })
  );
});

// 🧹 وظيفة تنظيف الكاش تلقائيًا عند زيادة العدد
function limitCacheSize(name, maxItems) {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > maxItems) {
        cache.delete(keys[0]).then(() => limitCacheSize(name, maxItems));
      }
    });
  });
}
