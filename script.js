// جميع أكواد الجافاسكربت كاملة بدون حذف أي سطر

// البحث الديناميكي لجميع المنتجات في الصفحة بعد تحميلها
document.addEventListener('DOMContentLoaded', function(){
  const searchInput = document.getElementById('searchInput');
  if(!searchInput) return;
  const searchResults = document.createElement('div');
  searchResults.style.position = 'absolute';
  searchResults.style.top = '38px';
  searchResults.style.right = '0';
  searchResults.style.width = '100%';
  searchResults.style.background = '#fff';
  searchResults.style.border = '1px solid #ddd';
  searchResults.style.maxHeight = '200px';
  searchResults.style.overflowY = 'auto';
  searchResults.style.display = 'none';
  searchResults.style.zIndex = '1000';
  searchInput.parentNode.style.position = 'relative';
  searchInput.parentNode.appendChild(searchResults);

  function gatherProducts() {
    const products = [];
    document.querySelectorAll('.card').forEach(card => {
      const titleEl = card.querySelector('.card-title');
      if(titleEl){
        const title = titleEl.textContent.trim();
        const page = 'store.html';
        products.push({name: title, page});
      }
    });
    return products;
  }
  searchInput.addEventListener('input', function(){
    const query = this.value.trim().toLowerCase();
    searchResults.innerHTML = '';
    if(query === ''){
      searchResults.style.display = 'none';
      return;
    }
    const allProducts = gatherProducts();
    const filtered = allProducts.filter(p => p.name.toLowerCase().includes(query));
    if(filtered.length > 0){
      filtered.forEach(prod => {
        const div = document.createElement('div');
        div.style.padding = '8px';
        div.style.cursor = 'pointer';
        div.style.borderBottom = '1px solid #eee';
        div.textContent = prod.name;
        div.addEventListener('click', () => {
          window.location.href = prod.page;
        });
        searchResults.appendChild(div);
      });
      searchResults.style.display = 'block';
    } else {
      searchResults.style.display = 'block';
      searchResults.innerHTML = '<div style="padding:8px;color:#999;">لا توجد نتائج</div>';
    }
  });
  document.addEventListener('click', (e)=>{
    if(!searchInput.contains(e.target) && !searchResults.contains(e.target)){
      searchResults.style.display = 'none';
    }
  });
});

// تحديث عداد السلة تلقائيًا من LocalStorage
document.addEventListener("DOMContentLoaded", () => {
  const cartCount = document.getElementById("cartCount");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartCount.textContent = `(${cart.length})`;
});

(function(){ // عائلة نعومة
  const products = [
    { name: "كريم ترطيب", discount: "20%", color: "#ff6384" },
    { name: "صابون الغار", discount: "15%", color: "#36a2eb" },
    { name: "زيوت طبيعية", discount: "10%", color: "#ffce56" },
    { name: "أقنعة الوجه", discount: "25%", color: "#4bc0c0" },
    { name: "مكملات", discount: "30%", color: "#9966ff" },
  ];
  const libraryContainer = document.getElementById("libraryCanvas");
  const enterBtn = document.getElementById("enterLibraryBtn");
  const codeInput = document.getElementById("familyCodeInput");
  const FAMILY_CODE = "NA3OMA2025";
  enterBtn.addEventListener("click", function(){
    const entered = codeInput.value.trim();
    if(entered === FAMILY_CODE){
      alert("تم الدخول بنجاح!");
      codeInput.style.display = "none";
      enterBtn.style.display = "none";
      libraryContainer.style.display = "block";
      createLibrary();
    } else {
      alert("الرمز غير صحيح!");
    }
  });
  function createLibrary(){
    const canvas = document.createElement("canvas");
    canvas.width = libraryContainer.clientWidth;
    canvas.height = libraryContainer.clientHeight;
    libraryContainer.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    const cubeWidth = 80;
    const spacing = 30;
    const baseY = canvas.height - 50;
    function draw(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      products.forEach((p,i)=>{
        const x = i*(cubeWidth+spacing) + spacing;
        const height = parseInt(p.discount) * 3;
        ctx.fillStyle = p.color;
        ctx.fillRect(x, baseY-height, cubeWidth, height);
        ctx.fillStyle = "#000";
        ctx.font = "14px Arial";
        ctx.fillText(p.name, x, baseY+15);
        ctx.fillText(p.discount, x, baseY-height-5);
      });
      requestAnimationFrame(draw);
    }
    draw();
  }
})();

const splideData = [
  {img:"https://i.postimg.cc/SRkcnQqS/sample3.png",title:"كريم ترطيب عميق",price:"35 ر.س", link:"cart.html"},
  {img:"https://i.postimg.cc/fRFXm6hh/sample4.png",title:"سيروم فيتامين C",price:"42 ر.س", link:"cart.html"},
  {img:"https://i.postimg.cc/Gpn3kC5W/sample5.png",title:"تونر الورد",price:"28 ر.س", link:"cart.html"},
  {img:"https://i.postimg.cc/L5fCKvjZ/mobile-2.png",title:"واقي شمس صبار",price:"39 ر.س", link:"cart.html"},
  {img:"https://i.postimg.cc/g2vL7Prk/sample1.png",title:"مقشر طبيعي",price:"29 ر.س", link:"cart.html"},
  {img:"https://i.postimg.cc/7hGdHd6B/sample6.png",title:"غسول لطيف للبشرة",price:"33 ر.س", link:"cart.html"},
  {img:"https://i.postimg.cc/Rh4Jx0D5/sample7.png",title:"سيروم حمض الهيالورونيك",price:"48 ر.س", link:"cart.html"},
  {img:"https://i.postimg.cc/7YpJ5zq9/sample8.png",title:"كريم ليلي مغذي",price:"54 ر.س", link:"cart.html"},
  {img:"https://i.postimg.cc/76Gv4zY6/sample9.png",title:"زيت الوجه الطبيعي",price:"40 ر.س", link:"cart.html"},
  {img:"https://i.postimg.cc/fLbJ2T0C/sample10.png",title:"منظف رغوي للبشرة",price:"27 ر.س", link:"cart.html"}
];
document.addEventListener('DOMContentLoaded',function(){
  const splideList = document.querySelector('#splideNewProducts .splide__list');
  if(splideList){
    splideData.forEach(prod=>{
      const li = document.createElement('li');
      li.className = "splide__slide";
      li.innerHTML = `
        <div class="card" style="min-width:210px;max-width:220px;margin:0 auto;">
          <img src="${prod.img}" alt="${prod.title}" style="height:180px;object-fit:cover;">
          <div class="card-body" style="padding:12px;">
            <h5 class="card-title">${prod.title}</h5>
            <p class="price">${prod.price}</p>
            <a href="cart.html" class="btn-buy" data-tippy-content="أضف إلى السلة">أضف إلى السلة</a>
          </div>
        </div>
      `;
      splideList.appendChild(li);
    });
    new Splide('#splideNewProducts',{
      type:'loop',
      perPage:4,
      gap:'1rem',
      autoplay:true,
      direction:'rtl',
      pagination:false,
      breakpoints:{
        1200:{perPage:3},
        768:{perPage:2},
        520:{perPage:1}
      }
    }).mount();
  }
});
AOS.init({duration:800,once:true});
gsap.registerPlugin(ScrollTrigger);
const menuBtn=document.getElementById('menuBtn');
const sidebar=document.getElementById('sidebar');
const sidebarClose=document.getElementById('sidebarClose');
menuBtn.onclick=()=>sidebar.classList.add('open');
sidebarClose.onclick=()=>sidebar.classList.remove('open');
document.addEventListener('click',e=>{if(!sidebar.contains(e.target)&&!menuBtn.contains(e.target))sidebar.classList.remove('open');});
const swiper = new Swiper(".mySwiper",{
  loop:true,
  autoplay:{delay:4000,disableOnInteraction:false},
  pagination:{el:".swiper-pagination",clickable:true},
  navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},
  effect:"fade",
  fadeEffect:{crossFade:true},
  speed:1200
});
const gallery=document.getElementById('gallery');
document.getElementById('rightBtn').onclick=()=>gallery.scrollBy({left:300,behavior:'smooth'});
document.getElementById('leftBtn').onclick=()=>gallery.scrollBy({left:-300,behavior:'smooth'});
gsap.from(".card",{
  y:40,opacity:0,duration:0.8,stagger:0.12,
  scrollTrigger:{trigger:".featured",start:"top 80%"}
});
tippy('#shopNowBtn',{placement:'bottom',animation:'scale'});
tippy('#menuBtn',{placement:'bottom'});
tippy('#userBtn',{placement:'bottom'});
tippy('.btn-buy',{placement:'top',animation:'shift-away'});
document.getElementById('subscribeBtn').addEventListener('click',()=>{
  const email = document.getElementById('newsletterInput').value || '---';
  iziToast.success({title:'تم الاشتراك',message:`${email} تم إضافته`});
});
particlesJS('particles-js', {
  "particles": {
    "number": {"value": 45, "density": {"enable": true, "value_area": 800}},
    "color": {"value": ["#f39c12","#e67e22","#ffffff"]},
    "shape": {"type": "circle"},
    "opacity": {"value": 0.75},
    "size": {"value": 3},
    "line_linked": {"enable": false},
    "move": {"enable": true, "speed": 1.5, "random": true, "straight": false, "out_mode": "out"}
  },
  "interactivity": {
    "events": {
      "onhover": {"enable": false},
      "onclick": {"enable": false}
    }
  },
  "retina_detect": true
});
const ctx = document.getElementById('salesChart').getContext('2d');
const salesChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['يناير','فبراير','مارس','أبريل','ماي','يونيو','يوليو','أغسطس'],
    datasets: [{
      label: 'مبيعات (وحدة)',
      data: [120, 170, 150, 190, 220, 260, 240, 280],
      tension: 0.4,
      fill: true,
      backgroundColor: 'rgba(243,156,18,0.12)',
      borderColor: 'rgba(243,156,18,1)',
      pointRadius: 4
    }]
  },
  options: {
    responsive: true,
    plugins: {legend: {display:true, position:'top'}},
    scales: {
      y: {beginAtZero:true}
    }
  }
});
(function initBabylon(){
  const canvas = document.getElementById('renderCanvas');
  const engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer:true, stencil:true});
  const scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color4(1,1,1,0);
  const camera = new BABYLON.ArcRotateCamera("cam", -Math.PI/2.2, Math.PI/3.5, 6, BABYLON.Vector3.Zero(), scene);
  camera.attachControl(canvas,true);
  const light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0,1,0), scene);
  const sphere = BABYLON.MeshBuilder.CreateSphere("sph",{diameter:2.0,segments:32},scene);
  const mat = new BABYLON.PBRMaterial("mat",scene);
  mat.albedoColor = new BABYLON.Color3(0.96,0.58,0.09);
  mat.metallic = 0.1;
  mat.roughness = 0.35;
  sphere.material = mat;
  scene.onBeforeRenderObservable.add(()=>{ sphere.rotation.y += 0.006; });
  engine.runRenderLoop(()=>scene.render());
  window.addEventListener("resize",()=>engine.resize());
})();
let mobilenetModel = null;
async function loadMobilenetOnce(){
  if(mobilenetModel) return mobilenetModel;
  iziToast.info({title:'تحميل النموذج',message:'جاري تحميل MobileNet لتصنيف الصور...'});
  mobilenetModel = await mobilenet.load({version:2,alpha:1.0});
  iziToast.success({title:'جاهز',message:'نموذج MobileNet تمّ تحميله'});
  return mobilenetModel;
}
document.getElementById('classifyBtn').addEventListener('click', async ()=>{
  try{
    const activeSlide = document.querySelector('.swiper-slide.swiper-slide-active img') || document.querySelector('.swiper-slide img');
    if(!activeSlide) return iziToast.error({title:'خطأ',message:'لم يتم العثور على صورة للتصنيف'});
    await loadMobilenetOnce();
    const results = await mobilenetModel.classify(activeSlide,3);
    if(results && results.length){
      const top = results[0];
      iziToast.show({
        title: `نتيجة: ${top.className.split(',')[0]}`,
        message: `الثقة: ${(top.probability*100).toFixed(1)}%`,
        timeout: 6000,
        position: 'topRight'
      });
    } else {
      iziToast.warning({title:'غير معروف',message:'لم يتم العثور على نتيجة واضحة'});
    }
  }catch(err){
    console.error(err);
    iziToast.error({title:'خطأ',message:err.message||err.toString()});
  }
});
const cartBtn = document.getElementById('cartBtn');
const cartPanel = document.getElementById('cartPanel');
const cartClose = document.getElementById('cartClose');
const cartItemsEl = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const cartCountEl = document.getElementById('cartCount');
const checkoutBtn = document.getElementById('checkoutBtn');
let cart = [];
try {
  cart = JSON.parse(localStorage.getItem('shop_cart_v1')) || [];
  if (!Array.isArray(cart)) cart = [];
} catch(e) {
  cart = [];
}
function renderCart(){
  cartItemsEl.innerHTML = '';
  let total = 0;
  if(cart.length === 0){
    cartItemsEl.innerHTML = '<p style="text-align:center;color:#777;margin-top:20px;">السلة فارغة</p>';
  } else {
    cart.forEach((it, idx) => {
      total += it.price;
      const itemDiv = document.createElement('div');
      itemDiv.style.cssText = 'display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid #f4f4f4;';
      itemDiv.innerHTML = `
        <div style="flex:1;">
          <div style="font-weight:700;">${escapeHtml(it.name)}</div>
          <div style="font-size:13px;color:#666;">${it.price.toFixed(2)} ر.س</div>
        </div>
        <div style="flex-shrink:0;margin-left:8px;">
          <button class="btn btn-sm btn-outline-danger remove-item" data-idx="${idx}">&times;</button>
        </div>
      `;
      cartItemsEl.appendChild(itemDiv);
    });
  }
  cartTotalEl.innerText = `المجموع: ${total.toFixed(2)} ر.س`;
  localStorage.setItem('shop_cart_v1', JSON.stringify(cart));
  if(cart.length > 0){
    cartCountEl.style.display = 'flex';
    cartCountEl.innerText = cart.length;
  } else {
    cartCountEl.style.display = 'none';
    cartCountEl.innerText = '0';
  }
  document.querySelectorAll('.remove-item').forEach(btn=>{
    btn.onclick = (e)=>{
      const i = parseInt(e.currentTarget.dataset.idx,10);
      if(!Number.isNaN(i)){
        cart.splice(i,1);
        renderCart();
        iziToast.info({title:'تم الحذف',message:'تمت إزالة المنتج من السلة'});
      }
    };
  });
}
function escapeHtml(text){
  return (text + '').replace(/[&<>"'`=\/]/g, function(s){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;",'/':'&#x2F;','`':'&#x60;','=':'&#x3D;'}[s]; });
}
renderCart();
cartBtn.onclick = ()=> { cartPanel.classList.add('open'); cartPanel.setAttribute('aria-hidden','false'); };
cartClose.onclick = ()=> { cartPanel.classList.remove('open'); cartPanel.setAttribute('aria-hidden','true'); };
document.addEventListener('click', (e)=>{
  if(!cartPanel.contains(e.target) && !cartBtn.contains(e.target) && cartPanel.classList.contains('open')){
    cartPanel.classList.remove('open');
    cartPanel.setAttribute('aria-hidden','true');
  }
});
function bindBuyButtons(){
  document.querySelectorAll('.btn-buy').forEach(btn=>{
    if (!btn.dataset.bound) {
      btn.addEventListener('click', (e)=>{
        const card = e.target.closest('.card');
        const nameEl = card ? card.querySelector('.card-title') : null;
        const priceEl = card ? card.querySelector('.price') : null;
        const name = nameEl ? nameEl.innerText.trim() : 'منتج';
        let price = 0;
        if(priceEl){
          const raw = priceEl.innerText.replace(/[^\d.,]/g,'').replace(',','.');
          price = parseFloat(raw) || 0;
        }
        cart.push({name, price});
        renderCart();
        iziToast.success({title:'أضيفت',message:`${name} تمت إضافته إلى السلة`});
        try{ gsap.fromTo(card,{scale:1},{scale:0.98,duration:0.08,yoyo:true,repeat:1}); }catch(err){}
      });
      btn.dataset.bound = "true";
    }
  });
}
bindBuyButtons();
document.addEventListener('DOMContentLoaded',bindBuyButtons);
setTimeout(bindBuyButtons, 1000);
checkoutBtn.addEventListener('click', ()=>{
  if(cart.length === 0){
    iziToast.warning({title:'السلة فارغة', message:'أضف منتجات إلى السلة أولاً'});
    return;
  }
  const lines = cart.map((it, i) => `${i+1}. ${it.name} — ${it.price.toFixed(2)} ر.س`);
  const total = cart.reduce((s,i)=>s+i.price,0);
  const msg = `مرحبًا، أود إتمام طلب من متجر نعومة:%0A%0A${encodeURIComponent(lines.join('%0A'))}%0A%0Aالمجموع: ${total.toFixed(2)} ر.س`;
  const phone = '966500000000';
  const waLink = `https://wa.me/${phone}?text=${msg}`;
  window.open(waLink,'_blank');
});
document.querySelectorAll('.btn-buy').forEach(btn=>{
  btn.addEventListener('click',e=>{
    const card = e.target.closest('.card');
    const title = card ? card.querySelector('.card-title')?.innerText || 'منتج' : 'منتج';
    iziToast.success({title:'أضيفت',message:`تمت إضافة ${title} إلى السلة`});
    try{ gsap.fromTo(card,{scale:1},{scale:0.98,duration:0.08,yoyo:true,repeat:1}); }catch(err){}
  });
});
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keydown',(e)=>{
  if(e.key==='Enter'){
    iziToast.info({title:'بحث',message:`بحثت عن: ${searchInput.value || '...'}`});
  }
});
gsap.to(".shop-now-btn",{scale:1.03,repeat:-1,yoyo:true,duration:2,ease:"sine.inOut"});
anime({
  targets: '.brand',
  translateY: [-8,0],
  duration: 900,
  easing: 'easeOutBounce'
});
swiper.on('slideChange',()=>{
  const el = document.querySelector('.shop-now-btn');
  gsap.fromTo(el,{y:-8,opacity:0},{y:0,opacity:1,duration:0.5});
});
window.addEventListener('unload',()=>{
});

