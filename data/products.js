// 🔹 تحديد عنوان الأساس تلقائيًا حسب مكان تشغيل الكود
const baseURL = window.location.hostname.includes("github.io")
  ? "https://yournaouma.github.io/store/"
  : "./"; // أثناء التطوير المحلي

// 🔹 تعريف المنتجات
const products = [
  {
    name: "كريم ترطيب البشرة",
    image: `${baseURL}images/cream1.jpg`,
    price: "45 د.ل",
    link: `${baseURL}products/cream1.html`
  },
  {
    name: "سيروم فيتامين C",
    image: `${baseURL}images/serum1.jpg`,
    price: "60 د.ل",
    link: `${baseURL}products/serum1.html`
  },
  {
    name: "واقي شمس للبشرة الحساسة",
    image: `${baseURL}images/sunscreen1.jpg`,
    price: "70 د.ل",
    link: `${baseURL}products/sunscreen1.html`
  }
];

// 🔹 مثال لطباعة المنتجات (اختياري)
console.log(products);

