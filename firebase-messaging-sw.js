// ✅ firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/12.5.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.5.0/firebase-messaging-compat.js");

// 🔧 إعداد Firebase (نفس الإعداد في موقعك)
firebase.initializeApp({
  apiKey: "AIzaSyDRiEZImvRhIl7zRzBY_y_OrcrNjhzz7bE",
  authDomain: "naouma-store.firebaseapp.com",
  projectId: "naouma-store",
  storageBucket: "naouma-store.firebasestorage.app",
  messagingSenderId: "522931583121",
  appId: "1:522931583121:web:643f49ef0a81a0763b6730",
  measurementId: "G-S0W0BYJ3RY"
});

// 🔔 تفعيل استقبال الإشعارات بالخلفية
const messaging = firebase.messaging();

// 📩 عند استقبال إشعار في الخلفية
messaging.onBackgroundMessage((payload) => {
  console.log("📦 [firebase-messaging-sw.js] إشعار في الخلفية:", payload);

  const notificationTitle = payload.notification.title || "📢 إشعار جديد";
  const notificationOptions = {
    body: payload.notification.body,
    icon: "./images/logo.png", // تأكد أن الصورة موجودة
    badge: "./images/logo.png"
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
