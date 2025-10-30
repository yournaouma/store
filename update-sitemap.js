// سكربت لتحديث تاريخ <lastmod> في sitemap.xml تلقائيًا
const fs = require('fs');
const path = './store/sitemap.xml';

// قراءة الملف
let sitemap = fs.readFileSync(path, 'utf8');

// جلب تاريخ اليوم بصيغة YYYY-MM-DD
const today = new Date().toISOString().split('T')[0];

// استبدال كل {{lastmod}} أو التواريخ القديمة
sitemap = sitemap.replace(/<lastmod>.*?<\/lastmod>/g, `<lastmod>${today}</lastmod>`);

// حفظ الملف بعد التحديث
fs.writeFileSync(path, sitemap, 'utf8');

console.log(`✅ تم تحديث تواريخ lastmod إلى ${today}`);
