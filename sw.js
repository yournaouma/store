// ✅ اسم الكاش (غيّره عند كل تحديث لإجبار التحديث)
const CACHE_NAME = "naoumatk-store-v3";

// 🧱 الملفات الثابتة (يتم تخزينها أول مرة فقط)
const STATIC_ASSETS = [
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
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
});

// 🌐 عند الطلب — جلب من الكاش أو الشبكة وتخزين الصور تلقائيًا
self.addEventListener("fetch", (event) => {
  const request = event.request;

  // لا تتعامل مع طلبات أخرى (مثل POST أو API)
  if (request.method !== "GET") return;

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        // ✅ ملف موجود في الكاش
        return cachedResponse;
      }

      // ⚙️ غير موجود → جلب من الشبكة
      return fetch(request)
        .then((response) => {
          // فقط خزّن الملفات الآمنة (HTML, CSS, JS, صور)
          const valid =
            response &&
            response.status === 200 &&
            response.type === "basic" &&
            /\.(png|jpg|jpeg|webp|gif|svg|css|js|html)$/.test(request.url);

          if (valid) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
              limitCacheSize(CACHE_NAME, 100); // 🧹 حد أقصى 100 ملف
            });
          }

          return response;
        })
        .catch(() => {
          // 🔌 في حال عدم وجود إنترنت
          if (request.destination === "document") {
            return caches.match("/index.html");
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
