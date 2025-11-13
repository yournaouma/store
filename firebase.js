<!-- أضف هذه السكربتات داخل <head> أو قبل </body> -->
<script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js"></script>

<script>
  // 🔥 تهيئة Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyDRiEZImvRhIl7zRzBY_y_OrcrNjhzz7bE",
    authDomain: "naouma-store.firebaseapp.com",
    projectId: "naouma-store",
    storageBucket: "naouma-store.firebasestorage.app",
    messagingSenderId: "522931583121",
    appId: "1:522931583121:web:643f49ef0a81a0763b6730",
    measurementId: "G-S0W0BYJ3RY"
  };

  const app = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const analytics = firebase.analytics();

  console.log("✅ تم الاتصال بـ Firebase بنجاح!");
</script>
