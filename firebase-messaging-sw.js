// firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

// 🔥 إعداد Firebase
firebase.initializeApp({
  apiKey: "AIzaSyC***********",
  authDomain: "yournaouma.firebaseapp.com",
  projectId: "yournaouma",
  storageBucket: "yournaouma.appspot.com",
  messagingSenderId: "522931583121",
  appId: "1:522931583121:web:************"
});

// تفعيل خدمة الإشعارات في الخلفية
const messaging = firebase.messaging();

// 📨 استقبال الإشعارات في الخلفية
messaging.onBackgroundMessage((payload) => {
  console.log("📨 رسالة في الخلفية:", payload);

  const notificationTitle = payload.notification?.title || "إشعار جديد من متجر نعومتك 💖";
  const notificationOptions = {
    body: payload.notification?.body || "اضغطي لعرض التفاصيل ✨",
    icon: payload.notification?.icon || "https://github.com/yournaouma/store/blob/main/images/logo.png?raw=true",
    badge: "https://github.com/yournaouma/store/blob/main/images/logo.png?raw=true",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
