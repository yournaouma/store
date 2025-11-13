// firebase-messaging-sw.js

importScripts("https://www.gstatic.com/firebasejs/12.5.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.5.0/firebase-messaging-compat.js");

// ✅ إعداد Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDRiEZImvRhIl7zRzBY_y_OrcrNjhzz7bE",
  authDomain: "naouma-store.firebaseapp.com",
  projectId: "naouma-store",
  storageBucket: "naouma-store.firebasestorage.app",
  messagingSenderId: "522931583121",
  appId: "1:522931583121:web:643f49ef0a81a0763b6730",
  measurementId: "G-S0W0BYJ3RY"
});

const messaging = firebase.messaging();

// 📨 استقبال الإشعارات في الخلفية (الموقع مغلق أو بالخلف)
messaging.onBackgroundMessage((payload) => {
  console.log("📨 إشعار خلفي:", payload);

  const notificationTitle = payload.notification?.title || "إشعار جديد من نعومتك 💖";
  const notificationOptions = {
    body: payload.notification?.body || "اضغطي لمشاهدة التفاصيل ✨",
    icon: "https://github.com/yournaouma/store/blob/main/images/logo.png?raw=true",
    badge: "https://github.com/yournaouma/store/blob/main/images/logo.png?raw=true",
    vibrate: [100, 50, 100],
    data: { url: "https://yournaouma.github.io/store/" } // عند النقر على الإشعار
  };

  // ✅ عرض الإشعار على سطح المكتب
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// 📌 عند النقر على الإشعار — يفتح المتجر
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
