// ✅ firebase-messaging.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-messaging.js";

// 🔧 إعدادات Firebase (نفس إعدادك في firebase-setup.js)
const firebaseConfig = {
  apiKey: "AIzaSyDRiEZImvRhIl7zRzBY_y_OrcrNjhzz7bE",
  authDomain: "naouma-store.firebaseapp.com",
  projectId: "naouma-store",
  storageBucket: "naouma-store.firebasestorage.app",
  messagingSenderId: "522931583121",
  appId: "1:522931583121:web:643f49ef0a81a0763b6730",
  measurementId: "G-S0W0BYJ3RY"
};

// 🔥 تهيئة التطبيق والمراسلة
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// ⚙️ طلب الإذن وجلب التوكن
export async function requestNotificationPermission() {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    console.log("✅ تم منح الإذن للإشعارات");

    try {
      // 🧩 تسجيل الـ service worker داخل مجلد /store/
      const swReg = await navigator.serviceWorker.register('./firebase-messaging-sw.js');
      console.log("🔧 Firebase Messaging SW مسجل:", swReg.scope);

      // 🎟️ جلب التوكن مع تمرير serviceWorkerRegistration الصحيح
      const token = await getToken(messaging, {
        vapidKey: "BEWq4wgfYi4Uh1zrZCi3LrWiyzkd9_sxq1mjwU2a2yBgoOMzfwGJAzlaE-szbKfKwqL91tRtWFlC3o7SW0B1oBk",
        serviceWorkerRegistration: swReg
      });

      console.log("🔑 FCM Token:", token);
    } catch (err) {
      console.error("❌ فشل في جلب التوكن:", err);
    }

  } else {
    console.log("🚫 المستخدم رفض الإشعارات");
  }
}

// 🔔 استقبال الإشعارات أثناء فتح الموقع
onMessage(messaging, (payload) => {
  console.log("📩 إشعار وارد:", payload);
  new Notification(payload.notification.title, {
    body: payload.notification.body,
    icon: "./images/logo.png"
  });
});


