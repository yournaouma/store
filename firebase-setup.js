<!-- firebase-setup.js -->
<script type="module">
  // استيراد مكتبات فايربيس الأساسية
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
  import { getFirestore, collection, addDoc, getDocs, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

  // 🔥 إعدادات Firebase الخاصة بك (من حسابك)
  const firebaseConfig = {
    apiKey: "AIzaSyDRiEZImvRhIl7zRzBY_y_OrcrNjhzz7bE",
    authDomain: "naouma-store.firebaseapp.com",
    projectId: "naouma-store",
    storageBucket: "naouma-store.firebasestorage.app",
    messagingSenderId: "522931583121",
    appId: "1:522931583121:web:643f49ef0a81a0763b6730",
    measurementId: "G-S0W0BYJ3RY"
  };

  // 🔹 تهيئة Firebase
  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);
</script>
