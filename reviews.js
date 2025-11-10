import { db } from './firebase-setup.js';
import { collection, addDoc, onSnapshot, query, where } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

// تحديد القسم الذي ستعرض فيه التعليقات
const reviewsContainer = document.getElementById("reviews");
const submitBtn = document.getElementById("submitReview");

const productId = document.body.getAttribute("data-product-id"); // كل صفحة لها معرف منتج خاص

// عرض التعليقات لحظياً من قاعدة البيانات
const q = query(collection(db, "reviews"), where("productId", "==", productId));
onSnapshot(q, (snapshot) => {
  reviewsContainer.innerHTML = "";
  snapshot.forEach(doc => {
    const review = doc.data();
    const div = document.createElement("div");
    div.className = "p-3 bg-gray-50 rounded mb-2 shadow-sm";
    div.innerHTML = `
      <p class="font-semibold">${review.name}</p>
      <p class="text-sm text-gray-600">${review.text}</p>
    `;
    reviewsContainer.appendChild(div);
  });
});

// عند الضغط على زر الإرسال
submitBtn.addEventListener("click", async () => {
  Swal.fire({
    icon: "info",
    title: "❌ لا يمكنك التعليق حالياً",
    text: "يجب إنشاء حساب أولاً. سيتم فتح قسم الحسابات قريباً ❤️",
  });
});
