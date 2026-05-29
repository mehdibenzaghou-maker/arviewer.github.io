/* SEB'S GARDEN — Blue/Gold theme + bilingual toggle */

/* ── Intro removal ──────────────────────────────────────────── */
setTimeout(() => {
  const intro = document.getElementById('intro');
  if (intro) intro.remove();
}, 4800);

/* ── Nav scroll ─────────────────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () =>
  nav?.classList.toggle('on', window.scrollY > 50), {passive:true});

/* ── Burger ─────────────────────────────────────────────────── */
const burger = document.getElementById('burger');
const drawer = document.getElementById('mobDrawer');
if (burger && drawer) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('x');
    drawer.classList.toggle('open');
    document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
  });
  drawer.querySelectorAll('.mob-link').forEach(l => l.addEventListener('click', () => {
    burger.classList.remove('x'); drawer.classList.remove('open');
    document.body.style.overflow = '';
  }));
}

/* ── Bilingual toggle ───────────────────────────────────────── */
let currentLang = localStorage.getItem('sg-lang') || 'fr';

function applyLang(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-fr][data-en]').forEach(el => {
    el.textContent = el.getAttribute('data-' + lang);
  });
  // Toggle button visual state
  document.querySelectorAll('.lang-toggle').forEach(btn => {
    btn.querySelector('.lang-fr')?.classList.toggle('active', lang === 'fr');
    btn.querySelector('.lang-en')?.classList.toggle('active', lang === 'en');
  });
  currentLang = lang;
  localStorage.setItem('sg-lang', lang);
}

document.querySelectorAll('.lang-toggle').forEach(btn => {
  btn.addEventListener('click', () => applyLang(currentLang === 'fr' ? 'en' : 'fr'));
});

applyLang(currentLang);

/* ── Hero canvas — floating gold particles ──────────────────── */
const canvas = document.getElementById('c');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H;
  const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
  window.addEventListener('resize', resize, {passive:true}); resize();

  const particles = Array.from({length:55}, () => ({
    x: Math.random()*1200, y: Math.random()*900,
    r: Math.random()*1.2+.15,
    vx: (Math.random()-.5)*.12, vy: -(Math.random()*.16+.04),
    a: Math.random()*Math.PI*2, s: Math.random()*.011,
    o: Math.random()*.2+.04,
    gold: Math.random()<.6,
  }));

  (function draw() {
    ctx.clearRect(0,0,W,H);
    particles.forEach(p => {
      p.a += p.s; p.x += p.vx + Math.sin(p.a)*.06; p.y += p.vy;
      if (p.y < -4) { p.y = H+4; p.x = Math.random()*W; }
      ctx.beginPath(); ctx.arc(p.x%W, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = p.gold ? `rgba(212,175,55,${p.o})` : `rgba(245,240,230,${p.o*.5})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  })();
}

/* ── Scroll reveal ──────────────────────────────────────────── */
const io = new IntersectionObserver(entries => {
  entries.forEach((e,i) => {
    if (!e.isIntersecting) return;
    setTimeout(() => e.target.classList.add('in'), i*70);
    io.unobserve(e.target);
  });
}, {threshold:.08, rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ── Counter animation ──────────────────────────────────────── */
const cio = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, tgt = +el.dataset.count, dur = 1600, s = performance.now();
    const tick = n => {
      const p = Math.min((n-s)/dur, 1);
      const eased = 1 - Math.pow(1-p, 3);
      el.textContent = Math.floor(eased * tgt);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    cio.unobserve(el);
  });
}, {threshold:.6});
document.querySelectorAll('[data-count]').forEach(el => cio.observe(el));

/* ── Gold cursor trail (desktop) ────────────────────────────── */
if (!window.matchMedia('(hover:none)').matches) {
  const dots = Array.from({length:5}, (_,i) => {
    const d = document.createElement('div');
    const sz = 5 - i*.7;
    d.style.cssText = `position:fixed;pointer-events:none;z-index:9999;
      width:${sz}px;height:${sz}px;border-radius:50%;
      background:rgba(212,175,55,${.55-i*.1});
      transform:translate(-50%,-50%);
      transition:left ${18+i*22}ms linear,top ${18+i*22}ms linear;`;
    document.body.appendChild(d); return d;
  });
  document.addEventListener('mousemove', e => {
    dots[0].style.left = e.clientX+'px'; dots[0].style.top = e.clientY+'px';
  });
  (function loop() {
    for (let i=1;i<dots.length;i++) {
      dots[i].style.left = (parseFloat(dots[i-1].style.left)||0) + 'px';
      dots[i].style.top  = (parseFloat(dots[i-1].style.top)||0)  + 'px';
    }
    requestAnimationFrame(loop);
  })();
}

/* ── Smooth scroll for anchors ──────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href && href !== '#') {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.pageYOffset - 80,
          behavior:'smooth'
        });
      }
    }
  });
});

/* ── Contact form (for contact.html) ────────────────────────── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const message = document.getElementById('message')?.value.trim();
    if (name && email && message) {
      const msg = currentLang === 'fr'
        ? `Merci ${name} ! Votre message a été envoyé.`
        : `Thank you ${name}! Your message has been sent.`;
      alert(msg);
      contactForm.reset();
    }
  });
}

/* ── Menu page: 3D loader (preserves old functionality) ─────── */
const loadButtons = document.querySelectorAll('.load-3d-btn');
loadButtons.forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    if (btn.classList.contains('loaded')) return;
    const parent = btn.closest('.menu-item-3d, .dish-card');
    const viewer = parent?.querySelector('model-viewer');
    if (viewer) {
      const src = viewer.getAttribute('data-src');
      if (src && !viewer.getAttribute('src')) {
        viewer.setAttribute('src', src);
        btn.innerHTML = currentLang === 'fr'
          ? '<i class="fas fa-check"></i> Plat chargé'
          : '<i class="fas fa-check"></i> Dish loaded';
        btn.classList.add('loaded');
      }
    }
  });
});

/* ── Menu navigation tabs ───────────────────────────────────── */
const menuNavBtns = document.querySelectorAll('.menu-nav-btn');
const menuSections = document.querySelectorAll('.menu-section');
if (menuNavBtns.length && menuSections.length) {
  menuNavBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const id = btn.getAttribute('data-section');
      menuNavBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      menuSections.forEach(s => s.classList.toggle('active', s.id === id));
    });
  });
}
