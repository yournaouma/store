// بحث ديناميكي خفيف لجميع المنتجات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('searchInput');
  if (!input) return;
  // إنشاء عنصر النتائج لمرة واحدة
  const results = document.createElement('div');
  Object.assign(results.style, {
    position: 'absolute', top: '38px', right: '0', width: '100%',
    background: '#fff', border: '1px solid #ddd', maxHeight: '200px',
    overflowY: 'auto', display: 'none', zIndex: 1000
  });
  input.parentNode.style.position = 'relative';
  input.parentNode.appendChild(results);

  // كاش المنتجات لجعل البحث سريع جداً
  const products = Array.from(document.querySelectorAll('.card')).map(card => {
    const t = card.querySelector('.card-title');
    return t ? { name: t.textContent.trim(), page: 'store.html' } : null;
  }).filter(Boolean);

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) return results.style.display = 'none';
    const filtered = products.filter(p => p.name.toLowerCase().includes(q));
    results.innerHTML = filtered.length 
      ? filtered.map((p, i) => `<div class="sr-item" data-i="${i}" style="padding:8px;cursor:pointer;border-bottom:1px solid #eee;">${p.name}</div>`).join('')
      : '<div style="padding:8px;color:#999;">لا توجد نتائج</div>';
    results.style.display = 'block';
  });
  // تفويض الحدث على مستوى عنصر النتائج
  results.addEventListener('click', e => {
    if (e.target.classList.contains('sr-item')) {
      const idx = +e.target.dataset.i;
      if (products[idx]) window.location.href = products[idx].page;
    }
  });
  // إغلاق النتائج عند فقدان التركيز
  document.addEventListener('click', e => {
    if (!input.contains(e.target) && !results.contains(e.target)) results.style.display = 'none';
  });
});
