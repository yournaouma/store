<script type="module">
import { db, auth } from './firebase.js'; // إذا جعلتها في ملف مستقل
import { collection, addDoc, getDocs, query, where, orderBy } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

const customerReviewsSection = document.getElementById("customer-reviews");
const reviewForm = document.getElementById("review-form");
const reviewText = document.getElementById("review-text");

// تحميل التعليقات لمنتج معيّن
async function loadReviewsForProduct(productId) {
  customerReviewsSection.innerHTML = `<p class="text-gray-500 text-center">⏳ جاري تحميل التعليقات...</p>`;

  const q = query(collection(db, "reviews"), where("productId", "==", productId), orderBy("date", "desc"));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    customerReviewsSection.innerHTML = `<p class="text-gray-400 text-center">لا توجد تعليقات بعد 👇</p>`;
    return;
  }

  let html = "";
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    html += `
      <div class="border p-3 rounded-lg shadow-sm bg-white">
        <p class="font-semibold">${data.userName || "مستخدم مجهول"}</p>
        <p class="text-gray-700">${data.text}</p>
        <p class="text-xs text-gray-400">${new Date(data.date.toDate()).toLocaleString()}</p>
      </div>
    `;
  });

  customerReviewsSection.innerHTML = html;
}

// إرسال تعليق جديد
reviewForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = reviewText.value.trim();
  if (!text) return alert("الرجاء كتابة تعليق");

  const user = auth.currentUser;
  if (!user) {
    alert("يجب تسجيل الدخول أولاً لإضافة تعليق");
    return;
  }

  await addDoc(collection(db, "reviews"), {
    productId: reviewForm.dataset.productId, // من صفحة المنتج
    userId: user.uid,
    userName: user.displayName || "مستخدم",
    text: text,
    date: new Date()
  });

  reviewText.value = "";
  loadReviewsForProduct(reviewForm.dataset.productId);
});
</script>
