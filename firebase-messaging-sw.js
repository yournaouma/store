// firebase-messaging-sw.js

importScripts("https://www.gstatic.com/firebasejs/12.5.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.5.0/firebase-messaging-compat.js");

// 🔧 إعداد Firebase نفسه مثل باقي الملفات
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

// 🔔 استقبال الإشعارات في الخلفية وإظهارها للمستخدم
messaging.onBackgroundMessage((payload) => {
  console.log("📨 رسالة في الخلفية:", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "https://github.com/yournaouma/store/blob/main/images/logo.png?raw=true"
  };

  // ✅ عرض الإشعار فعليًا
  self.registration.showNotification(notificationTitle, notificationOptions);
});

