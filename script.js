// البحث الديناميكي لجميع المنتجات في الصفحة بعد تحميلها
document.addEventListener('DOMContentLoaded', function(){
  const searchInput = document.getElementById('searchInput');
  if(!searchInput) return;

  const searchResults = document.createElement('div');
  searchResults.style.cssText = `
    position: absolute;
    top: 38px;
    right: 0;
    width: 100%;
    background: #fff;
    border: 1px solid #ddd;
    max-height: 200px;
    overflow-y: auto;
    display: none;
    z-index: 1000;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  `;
  searchInput.parentNode.style.position = 'relative';
  searchInput.parentNode.appendChild(searchResults);

  let allProducts = []; // لتخزين المنتجات مرة واحدة
  let productsGathered = false;

  function gatherProducts() {
    if (productsGathered) return allProducts; // إذا تم التجميع بالفعل، أعد النتائج المخزنة
    document.querySelectorAll('.card').forEach(card => {
      const titleEl = card.querySelector('.card-title');
      if(titleEl){
        const title = titleEl.textContent.trim();
        const page = 'store.html'; // افتراض أن كل المنتجات توجه إلى store.html
        allProducts.push({name: title, page, searchName: title.toLowerCase()});
      }
    });
    productsGathered = true;
    return allProducts;
  }

  // استخدام debounce لتقليل عدد مرات تنفيذ دالة البحث
  const debounce = (func, delay) => {
    let timeout;
    return function(...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const performSearch = debounce(function(query) {
    searchResults.innerHTML = '';
    if(query === ''){
      searchResults.style.display = 'none';
      return;
    }

    const currentProducts = gatherProducts(); // جمع المنتجات إذا لم يتم ذلك بعد
    const filtered = currentProducts.filter(p => p.searchName.includes(query));

    if(filtered.length > 0){
      const fragment = document.createDocumentFragment(); // استخدام DocumentFragment لتحسين الأداء
      filtered.forEach(prod => {
        const div = document.createElement('div');
        div.style.cssText = 'padding: 8px; cursor: pointer; border-bottom: 1px solid #eee; transition: background-color 0.2s;';
        div.textContent = prod.name;
        div.onmouseover = () => div.style.backgroundColor = '#f0f0f0';
        div.onmouseout = () => div.style.backgroundColor = '#fff';
        div.onclick = () => {
          window.location.href = prod.page;
          searchResults.style.display = 'none'; // إخفاء النتائج بعد النقر
        };
        fragment.appendChild(div);
      });
      searchResults.appendChild(fragment);
      searchResults.style.display = 'block';
    } else {
      searchResults.style.display = 'block';
      searchResults.innerHTML = '<div style="padding:8px;color:#999;text-align:center;">لا توجد نتائج</div>';
    }
  }, 300); // 300ms تأخير

  searchInput.addEventListener('input', function(){
    performSearch(this.value.trim().toLowerCase());
  });

  document.addEventListener('click', (e)=>{
    if(!searchInput.contains(e.target) && !searchResults.contains(e.target)){
      searchResults.style.display = 'none';
    }
  });

  searchInput.addEventListener('focus', () => {
    if (searchInput.value.trim() !== '' && searchResults.children.length > 0) {
      searchResults.style.display = 'block';
    }
  });
});

// تحديث عداد السلة تلقائيًا من LocalStorage
document.addEventListener("DOMContentLoaded", () => {
  const cartCountEl = document.getElementById("cartCount");
  if (cartCountEl) {
    const updateCartCount = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("shop_cart_v1")) || [];
        cartCountEl.textContent = `(${cart.length})`;
        cartCountEl.style.display = cart.length > 0 ? 'flex' : 'none';
      } catch (e) {
        console.error("Failed to parse cart from localStorage:", e);
        cartCountEl.textContent = '(0)';
        cartCountEl.style.display = 'none';
      }
    };
    updateCartCount();
    // يمكنك إضافة event listener هنا لتحديث العداد عندما تتغير السلة من مكان آخر
    // window.addEventListener('storage', updateCartCount); // إذا كنت تريد التحديث عبر التبويبات
  }
});

(function(){ // عائلة نعومة
  const libraryContainer = document.getElementById("libraryCanvas");
  const enterBtn = document.getElementById("enterLibraryBtn");
  const codeInput = document.getElementById("familyCodeInput");
  const FAMILY_CODE = "NA3OMA2025";

  if (!libraryContainer || !enterBtn || !codeInput) return; // تأكد من وجود العناصر

  const products = [
    { name: "كريم ترطيب", discount: "20%", color: "#ff6384" },
    { name: "صابون الغار", discount: "15%", color: "#36a2eb" },
    { name: "زيوت طبيعية", discount: "10%", color: "#ffce56" },
    { name: "أقنعة الوجه", discount: "25%", color: "#4bc0c0" },
    { name: "مكملات", discount: "30%", color: "#9966ff" },
  ];

  let animationFrameId = null;

  enterBtn.addEventListener("click", function(){
    const entered = codeInput.value.trim();
    if(entered === FAMILY_CODE){
      iziToast.success({title: "تم الدخول", message: "تم الدخول بنجاح!"});
      codeInput.style.display = "none";
      enterBtn.style.display = "none";
      libraryContainer.style.display = "block";
      createLibrary();
    } else {
      iziToast.error({title: "خطأ", message: "الرمز غير صحيح!"});
    }
  });

  function createLibrary(){
    // إزالة أي كانفاس موجود مسبقاً لمنع التكرار
    const existingCanvas = libraryContainer.querySelector('canvas');
    if (existingCanvas) {
      libraryContainer.removeChild(existingCanvas);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    }

    const canvas = document.createElement("canvas");
    // تعيين الأبعاد ديناميكياً بناءً على حجم الحاوية، أو افتراضية إذا لم تكن متاحة
    canvas.width = libraryContainer.clientWidth > 0 ? libraryContainer.clientWidth : 600;
    canvas.height = libraryContainer.clientHeight > 0 ? libraryContainer.clientHeight : 300;
    libraryContainer.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    const cubeWidth = 80;
    const spacing = 30;
    const baseY = canvas.height - 50;

    const draw = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height); // مسح الكانفاس بالكامل بكفاءة
      products.forEach((p,i)=>{
        const x = i*(cubeWidth+spacing) + spacing;
        const height = parseInt(p.discount) * 3;

        // تحسين الرسم لتجنب إعادة تعيين الخصائص بشكل متكرر
        ctx.fillStyle = p.color;
        ctx.fillRect(x, baseY-height, cubeWidth, height);

        ctx.fillStyle = "#000";
        ctx.font = "14px Arial";
        ctx.fillText(p.name, x + (cubeWidth / 2) - (ctx.measureText(p.name).width / 2), baseY + 15);
        ctx.fillText(p.discount, x + (cubeWidth / 2) - (ctx.measureText(p.discount).width / 2), baseY - height - 5);
      });
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    // إضافة معالج للتحجيم لتعديل حجم الكانفاس عند تغيير حجم النافذة
    window.addEventListener('resize', debounce(() => {
      canvas.width = libraryContainer.clientWidth > 0 ? libraryContainer.clientWidth : 600;
      canvas.height = libraryContainer.clientHeight > 0 ? libraryContainer.clientHeight : 300;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      animationFrameId = requestAnimationFrame(draw); // إعادة بدء الرسم بعد تغيير الحجم
    }, 200));
  }
})();

// بيانات SplideJS يمكن تحميلها عند الحاجة لتحسين TTI (Time To Interactive)
const splideData = [
  {img:"images/products/kid11.png", title:"كريم ترطيب عميق", price:"35 ر.س", link:"cart.html"},
  {img:"images/products/kid12.png", title:"سيروم فيتامين C", price:"42 ر.س", link:"cart.html"},
  {img:"images/products/kid13.png", title:"تونر الورد", price:"28 ر.س", link:"cart.html"},
  {img:"images/products/kid14.png", title:"واقي شمس صبار", price:"39 ر.س", link:"cart.html"},
  {img:"images/products/kid15.png", title:"مقشر طبيعي", price:"29 ر.س", link:"cart.html"},
  {img:"images/products/kid16.png", title:"غسول لطيف للبشرة", price:"33 ر.س", link:"cart.html"},
  {img:"images/products/kid17.png", title:"سيروم حمض الهيالورونيك", price:"48 ر.س", link:"cart.html"},
  {img:"images/products/kid18.png", title:"كريم ليلي مغذي", price:"54 ر.س", link:"cart.html"},
  {img:"images/products/kid19.png", title:"زيت الوجه الطبيعي", price:"40 ر.س", link:"cart.html"},
  {img:"images/products/kid20.png", title:"منظف رغوي للبشرة", price:"27 ر.س", link:"cart.html"}
];

document.addEventListener('DOMContentLoaded',function(){
  const splideNewProducts = document.getElementById('splideNewProducts');
  if(splideNewProducts){
    const splideList = splideNewProducts.querySelector('.splide__list');
    if(splideList){
      const fragment = document.createDocumentFragment();
      splideData.forEach(prod=>{
        const li = document.createElement('li');
        li.className = "splide__slide";
        li.innerHTML = `
          <div class="card" style="min-width:210px;max-width:220px;margin:0 auto;box-shadow: 0 4px 8px rgba(0,0,0,0.05);border-radius:8px;overflow:hidden;transition:transform 0.2s;">
            <img loading="lazy" src="${prod.img}" alt="${prod.title}" style="height:180px;object-fit:cover;width:100%;">
            <div class="card-body" style="padding:12px;text-align:center;">
              <h5 class="card-title" style="font-size:1.1em;margin-bottom:8px;color:#333;">${prod.title}</h5>
              <p class="price" style="font-weight:bold;color:#f39c12;font-size:1.2em;">${prod.price}</p>
              <button class="btn-buy" onclick="window.location.href='${prod.link}'" data-tippy-content="اذهب الي متجر" style="background-color:#f39c12;color:#fff;border:none;padding:8px 15px;border-radius:5px;cursor:pointer;margin-top:10px;transition:background-color 0.2s;">اذهب الي متجر</button>
            </div>
          </div>
        `;
    
    fragment.appendChild(li);
      });
      splideList.appendChild(fragment);

      // تهيئة SplideJS بعد إضافة جميع الشرائح
      new Splide('#splideNewProducts',{
        type:'loop',
        perPage:4,
        gap:'1rem',
        autoplay:true,
        interval: 3000, // سرعة تشغيل الشرائح
        pauseOnHover: true,
        direction:'rtl',
        pagination:false,
        lazyLoad: 'nearby', // تحميل كسول للصور القريبة
        breakpoints:{
          1200:{perPage:3, gap:'0.8rem'},
          768:{perPage:2, gap:'0.6rem'},
          520:{perPage:1, gap:'0.4rem'}
        }
      }).mount();
    }
  }

  // تهيئة AOS و GSAP والملحقات الأخرى بشكل متسق
  AOS.init({duration:600,once:true}); // تقليل مدة التحريك
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  const menuBtn=document.getElementById('menuBtn');
  const sidebar=document.getElementById('sidebar');
  const sidebarClose=document.getElementById('sidebarClose');

  if (menuBtn && sidebar && sidebarClose) {
    menuBtn.onclick=()=>sidebar.classList.add('open');
    sidebarClose.onclick=()=>sidebar.classList.remove('open');
    document.addEventListener('click',e=>{
      if(!sidebar.contains(e.target)&&!menuBtn.contains(e.target))sidebar.classList.remove('open');
    });
  }

  const swiperContainer = document.querySelector(".mySwiper");
  if (swiperContainer && typeof Swiper !== 'undefined') {
    const swiper = new Swiper(swiperContainer,{
      loop:true,
      autoplay:{delay:3000,disableOnInteraction:false}, // تقليل التأخير
      pagination:{el:".swiper-pagination",clickable:true},
      navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},
      effect:"fade",
      fadeEffect:{crossFade:true},
      speed:800 // تقليل سرعة الانتقال
    });

    // استخدام lazy loading للصور داخل Swiper
    swiper.slides.forEach(slide => {
      const img = slide.querySelector('img');
      if (img) {
        img.setAttribute('loading', 'lazy');
      }
    });

    swiper.on('slideChange',() => {
      const el = document.querySelector('.shop-now-btn');
      if (el && typeof gsap !== 'undefined') {
        gsap.fromTo(el,{y:-8,opacity:0},{y:0,opacity:1,duration:0.5});
      }
    });
  }

  const gallery=document.getElementById('gallery');
  const rightBtn = document.getElementById('rightBtn');
  const leftBtn = document.getElementById('leftBtn');
  if (gallery && rightBtn && leftBtn) {
    rightBtn.onclick=()=>gallery.scrollBy({left:300,behavior:'smooth'});
    leftBtn.onclick=()=>gallery.scrollBy({left:-300,behavior:'smooth'});
  }

  const featuredSection = document.querySelector(".featured");
  if (featuredSection && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.from(".card",{
      y:40,opacity:0,duration:0.8,stagger:0.12,
      scrollTrigger:{trigger:featuredSection,start:"top 80%", toggleActions: "play none none none"} // تشغيل مرة واحدة
    });
  }

  // تهيئة Tippy.js
  if (typeof tippy !== 'undefined') {
    tippy('#shopNowBtn',{placement:'bottom',animation:'scale'});
    tippy('#menuBtn',{placement:'bottom'});
    tippy('#userBtn',{placement:'bottom'});
    tippy('.btn-buy',{placement:'top',animation:'shift-away'});
  }

  const subscribeBtn = document.getElementById('subscribeBtn');
  const newsletterInput = document.getElementById('newsletterInput');
  if (subscribeBtn && newsletterInput) {
    subscribeBtn.addEventListener('click',()=>{
      const email = newsletterInput.value.trim() || '---';
      if (email !== '---') {
        iziToast.success({title:'تم الاشتراك',message:`${email} تم إضافته`});
        newsletterInput.value = ''; // مسح الإدخال بعد الاشتراك
      } else {
        iziToast.warning({title:'تنبيه',message:'الرجاء إدخال بريد إلكتروني صحيح.'});
      }
    });
  }

  // Particles.js يمكن تحميله بعد المحتوى الأولي إذا كان ليس حرجًا
  // أو تحسين إعداداته لتقليل استهلاك الموارد
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      "particles": {
        "number": {"value": 30, "density": {"enable": true, "value_area": 800}}, // تقليل عدد الجسيمات
        "color": {"value": ["#f39c12","#e67e22","#ffffff"]},
        "shape": {"type": "circle"},
        "opacity": {"value": 0.7}, // تقليل الشفافية قليلاً
        "size": {"value": 2.5}, // تقليل الحجم قليلاً
        "line_linked": {"enable": false},
        "move": {"enable": true, "speed": 1, "random": true, "straight": false, "out_mode": "out"} // تقليل السرعة
      },
      "interactivity": {
        "events": {
          "onhover": {"enable": false},
          "onclick": {"enable": false}
        }
      },
      "retina_detect": true
    });
  }

  const salesChartCanvas = document.getElementById('salesChart');
  if (salesChartCanvas && typeof Chart !== 'undefined') {
    const ctx = salesChartCanvas.getContext('2d');
    const salesChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['يناير','فبراير','مارس','أبريل','ماي','يونيو','يوليو','أغسطس'],
        datasets: [{
          label: 'مبيعات (وحدة)',
          data: [120, 170, 150, 190, 220, 260, 240, 280],
          tension: 0.4,
          fill: true,
          backgroundColor: 'rgba(243,156,18,0.1)', // تقليل كثافة اللون قليلاً
          borderColor: 'rgba(243,156,18,1)',
          pointRadius: 3 // تقليل حجم النقاط
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // يسمح بتحديد حجم الكانفاس بواسطة CSS
        plugins: {legend: {display:true, position:'top', labels: {font: {size: 12}}}},
        scales: {
          y: {beginAtZero:true, ticks: {font: {size: 10}}},
          x: {ticks: {font: {size: 10}}}
        }
      }
    });
  }
});

// تأجيل تهيئة Babylon.js حتى يكون مرئياً أو بعد تحميل الأجزاء الأكثر أهمية
const initBabylon = () => {
  const canvas = document.getElementById('renderCanvas');
  if (!canvas || typeof BABYLON === 'undefined') return; // تأكد من وجود Canvas ومكتبة Babylon.js

  const engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer:true, stencil:true, adaptToDeviceRatio: true}); // إضافة adaptToDeviceRatio
  const scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color4(1,1,1,0); // شفافية كاملة

  const camera = new BABYLON.ArcRotateCamera("cam", -Math.PI/2.2, Math.PI/3.5, 6, BABYLON.Vector3.Zero(), scene);
  camera.attachControl(canvas,true);
  camera.inputs.remove(camera.inputs.attached.mouse); // تعطيل التحكم بالفأرة إذا لم يكن ضرورياً

  const light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0,1,0), scene);
  light.intensity = 0.7; // تقليل شدة الإضاءة قليلاً

  const sphere = BABYLON.MeshBuilder.CreateSphere("sph",{diameter:2.0,segments:16},scene); // تقليل عدد المقاطع لتقليل التعقيد
  const mat = new BABYLON.PBRMaterial("mat",scene);
  mat.albedoColor = new BABYLON.Color3(0.96,0.58,0.09);
  mat.metallic = 0.1;
  mat.roughness = 0.35;
  sphere.material = mat;

  let animationRunning = true; // للتحكم في تشغيل الأنميشن
  scene.onBeforeRenderObservable.add(()=>{
    if (animationRunning) {
      sphere.rotation.y += 0.004; // تقليل سرعة الدوران قليلاً
    }
  });

  engine.runRenderLoop(()=>scene.render());
  window.addEventListener("resize", debounce(()=>engine.resize(), 100)); // debounce لتقليل مرات إعادة التحجيم

  // إيقاف الأنميشن عندما لا يكون مرئياً (مثلاً عند التمرير إلى جزء آخر من الصفحة)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      animationRunning = entry.isIntersecting;
    });
  }, { threshold: 0.1 }); // 10% من العنصر مرئي

  observer.observe(canvas);
};

// تحميل Babylon.js عند الحاجة (مثلاً عند ظهور العنصر في مجال الرؤية)
// أو تأجيله بعد تحميل باقي المحتوى الحرج
document.addEventListener('DOMContentLoaded', () => {
  // يمكنك استخدام Intersection Observer هنا لتشغيل initBabylon عندما يصبح الـ canvas مرئياً
  const renderCanvas = document.getElementById('renderCanvas');
  if (renderCanvas) {
    const babylonObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          initBabylon();
          observer.unobserve(renderCanvas); // توقف عن المراقبة بعد التهيئة
        }
      });
    }, { threshold: 0.1 });
    babylonObserver.observe(renderCanvas);
  }
});


let mobilenetModel = null;
async function loadMobilenetOnce(){
  if(mobilenetModel) return mobilenetModel;
  iziToast.info({title:'تحميل النموذج',message:'جاري تحميل MobileNet لتصنيف الصور...'});
  // استخدام { version: 1, alpha: 0.25 } لتحميل نموذج أخف وأسرع إذا كانت الدقة العالية ليست ضرورية
  mobilenetModel = await mobilenet.load({version:1,alpha:0.25});
  iziToast.success({title:'جاهز',message:'نموذج MobileNet تمّ تحميله'});
  return mobilenetModel;
}

document.getElementById('classifyBtn')?.addEventListener('click', async ()=>{ // استخدام Optional chaining
  try{
    const activeSlide = document.querySelector('.swiper-slide.swiper-slide-active img') || document.querySelector('.swiper-slide img');
    if(!activeSlide) return iziToast.error({title:'خطأ',message:'لم يتم العثور على صورة للتصنيف'});

    // التأكد من تحميل الصورة بالكامل قبل التصنيف
    if (!activeSlide.complete) {
      await new Promise(resolve => {
        activeSlide.onload = resolve;
        activeSlide.onerror = resolve; // في حالة وجود خطأ في التحميل
      });
    }

    const model = await loadMobilenetOnce();
    const results = await model.classify(activeSlide,3);
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
    console.error("MobileNet Classification Error:", err);
    iziToast.error({title:'خطأ',message:err.message||'حدث خطأ أثناء التصنيف'});
  }
});

const cartBtn = document.getElementById('cartBtn');
const cartPanel = document.getElementById('cartPanel');
const cartClose = document.getElementById('cartClose');
const cartItemsEl = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const cartCountEl = document.getElementById('cartCount'); // تم تعريفها سابقاً في DOMContentLoaded
const checkoutBtn = document.getElementById('checkoutBtn');

let cart = [];
// التحقق من localStorage مرة واحدة عند التحميل
try {
  cart = JSON.parse(localStorage.getItem('shop_cart_v1')) || [];
  if (!Array.isArray(cart)) cart = [];
} catch(e) {
  console.error("Failed to load cart from localStorage:", e);
  cart = [];
}

function renderCart(){
  cartItemsEl.innerHTML = '';
  let total = 0;
  if(cart.length === 0){
    cartItemsEl.innerHTML = '<p style="text-align:center;color:#777;margin-top:20px;padding:15px;background-color:#f9f9f9;border-radius:5px;">السلة فارغة</p>';
  } else {
    const fragment = document.createDocumentFragment();
    cart.forEach((it, idx) => {
      total += it.price;
      const itemDiv = document.createElement('div');
      itemDiv.style.cssText = 'display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid #eee;';
      itemDiv.innerHTML = `
        <div style="flex:1;">
          <div style="font-weight:700;color:#333;">${escapeHtml(it.name)}</div>
          <div style="font-size:13px;color:#666;margin-top:3px;">${it.price.toFixed(2)} ر.س</div>
        </div>
        <div style="flex-shrink:0;margin-left:8px;">
          <button class="btn btn-sm btn-outline-danger remove-item" data-idx="${idx}" style="background-color:#ff4d4d;color:#fff;border:none;border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;font-size:1.2em;cursor:pointer;transition:background-color 0.2s;">&times;</button>
        </div>
      `;
      fragment.appendChild(itemDiv);
    });
    cartItemsEl.appendChild(fragment);
  }
  cartTotalEl.innerText = `المجموع: ${total.toFixed(2)} ر.س`;
  localStorage.setItem('shop_cart_v1', JSON.stringify(cart)); // حفظ السلة بعد كل تحديث

  if(cartCountEl){ // تحديث العداد
    cartCountEl.style.display = cart.length > 0 ? 'flex' : 'none';
    cartCountEl.innerText = cart.length.toString();
  }

  // استخدام event delegation لـ remove-item buttons
  cartItemsEl.onclick = (e) => {
    if (e.target.classList.contains('remove-item')) {
      const i = parseInt(e.target.dataset.idx, 10);
      if (!Number.isNaN(i)) {
        cart.splice(i, 1);
        renderCart();
        iziToast.info({title:'تم الحذف',message:'تمت إزالة المنتج من السلة'});
      }
    }
  };
}

function escapeHtml(text){
  const map = {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;",'/':'&#x2F;','`':'&#x60;','=':'&#x3D;'};
  return (text + '').replace(/[&<>"'`=\/]/g, function(s){ return map[s]; });
}

// تهيئة السلة وعرضها عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  if (cartBtn && cartPanel) {
    cartBtn.onclick = () => { cartPanel.classList.add('open'); cartPanel.setAttribute('aria-hidden','false'); };
  }
  if (cartClose && cartPanel) {
    cartClose.onclick = () => { cartPanel.classList.remove('open'); cartPanel.setAttribute('aria-hidden','true'); };
  }
  document.addEventListener('click', (e)=>{
    if(cartPanel && cartBtn && !cartPanel.contains(e.target) && !cartBtn.contains(e.target) && cartPanel.classList.contains('open')){
      cartPanel.classList.remove('open');
      cartPanel.setAttribute('aria-hidden','true');
    }
  });
});

function bindBuyButtons(){
  document.querySelectorAll('.btn-buy:not([data-bound])').forEach(btn=>{ // البحث فقط عن الأزرار غير المرتبطة
    btn.addEventListener('click', (e)=>{
      e.preventDefault(); // منع أي سلوك افتراضي للرابط إذا كان موجوداً
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
      if (typeof gsap !== 'undefined') {
        try{ gsap.fromTo(card,{scale:1},{scale:0.98,duration:0.08,yoyo:true,repeat:1}); }catch(err){}
      }
    });
    btn.dataset.bound = "true"; // وضع علامة على الزر بأنه تم ربطه
  });
}

document.addEventListener('DOMContentLoaded', bindBuyButtons);
// لا حاجة لـ setTimeout(bindBuyButtons, 1000); إذا كانت SplideJS تضمن وجود العناصر عند DOMContentLoaded

if (checkoutBtn) {
  checkoutBtn.addEventListener('click', ()=>{
    if(cart.length === 0){
      iziToast.warning({title:'السلة فارغة', message:'أضف منتجات إلى السلة أولاً'});
      return;
    }
    const lines = cart.map((it, i) => `${i+1}. ${it.name} — ${it.price.toFixed(2)} ر.س`);
    const total = cart.reduce((s,i)=>s+i.price,0);
    const msg = `مرحبًا، أود إتمام طلب من متجر نعومة:%0A%0A${encodeURIComponent(lines.join('%0A'))}%0A%0Aالمجموع: ${total.toFixed(2)} ر.س`;
    const phone = '966500000000'; // استخدام رقم هاتف افتراضي
    const waLink = `https://wa.me/${phone}?text=${msg}`;
    window.open(waLink,'_blank');
  });
}

// معالج حدث واحد لجميع أزرار الشراء (تم نقل هذا لـ bindBuyButtons)
// document.querySelectorAll('.btn-buy').forEach(btn=>{
//   btn.addEventListener('click',e=>{
//     const card = e.target.closest('.card');
//     const title = card ? card.querySelector('.card-title')?.innerText || 'منتج' : 'منتج';
//     iziToast.success({title:'أضيفت',message:`تمت إضافة ${title} إلى السلة`});
//     try{ gsap.fromTo(card,{scale:1},{scale:0.98,duration:0.08,yoyo:true,repeat:1}); }catch(err){}
//   });
// });

// حدث البحث عن طريق Enter
const mainSearchInput = document.getElementById('searchInput');
if (mainSearchInput) {
  mainSearchInput.addEventListener('keydown',(e)=>{
    if(e.key==='Enter'){
      iziToast.info({title:'بحث',message:`بحثت عن: ${mainSearchInput.value || '...'}`});
      // يمكنك إضافة منطق البحث الفعلي هنا
    }
  });
}

if (typeof gsap !== 'undefined') {
  const shopNowBtn = document.querySelector(".shop-now-btn");
  if (shopNowBtn) {
    gsap.to(shopNowBtn,{scale:1.03,repeat:-1,yoyo:true,duration:2,ease:"sine.inOut"});
  }
  const brandEl = document.querySelector('.brand');
  if (brandEl && typeof anime !== 'undefined') { // تأكد من وجود anime
    anime({
      targets: brandEl,
      translateY: [-8,0],
      duration: 900,
      easing: 'easeOutBounce'
    });
  }
}

// تحسينات عامة:
// 1. استخدام "use strict"; في بداية الملف لتجنب بعض الأخطاء الشائعة في JavaScript
// 2. استخدام defer أو async لربط ملفات JavaScript في HTML
// 3. دمج الأكواد المتشابهة في دالة واحدة أو معالج حدث واحد (مثل أزرار الشراء)
// 4. تقليل عمليات DOM Manipulation قدر الإمكان
// 5. استخدام Intersection Observer لتحميل الموارد الثقيلة (مثل Babylon.js و MobileNet) فقط عندما تصبح مرئية

// لا حاجة لهذا، المتصفح يتعامل معه تلقائياً
// window.addEventListener('unload',()=>{
// });
