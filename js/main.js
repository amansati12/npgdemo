// NPG-UNIQUE COMPUTERS — main.js

// Hamburger
const ham = document.querySelector('.hamburger');
const nav = document.querySelector('.nav-links');
if (ham) ham.addEventListener('click', () => nav.classList.toggle('open'));

// Active link
(function(){
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href').split('/').pop() === page) a.classList.add('active');
  });
})();

// Scroll reveal
const ro = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 90);
      ro.unobserve(e.target);
    }
  });
}, { threshold: 0.10 });
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

// Counter
const co = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('[data-count]').forEach(el => {
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || '';
      let cur = 0; const step = target / 55;
      const t = setInterval(() => {
        cur += step;
        if (cur >= target) { el.textContent = target.toLocaleString() + suffix; clearInterval(t); }
        else el.textContent = Math.floor(cur).toLocaleString() + suffix;
      }, 28);
    });
    co.unobserve(entry.target);
  });
}, { threshold: 0.4 });
document.querySelectorAll('.stats-bar').forEach(el => co.observe(el));

// FAQ
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const ans = btn.nextElementSibling;
    const isOpen = btn.classList.contains('open');
    document.querySelectorAll('.faq-q').forEach(b => { b.classList.remove('open'); b.nextElementSibling.classList.remove('open'); });
    if (!isOpen) { btn.classList.add('open'); ans.classList.add('open'); }
  });
});

// Course filter
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('[data-cat]').forEach(item => {
      item.style.display = (f === 'all' || item.dataset.cat === f) ? '' : 'none';
    });
  });
});

// Contact form
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.btn-send');
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.background = '#2e7d32';
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      btn.style.background = '';
      form.reset();
    }, 3500);
  });
}

// Lightbox
let lbImages = [], lbIdx = 0;
function initLightbox() {
  lbImages = Array.from(document.querySelectorAll('.gal-item img')).map(i => i.src);
  document.querySelectorAll('.gal-item').forEach((item, idx) => {
    item.addEventListener('click', () => openLB(idx));
  });
}
function openLB(idx) {
  lbIdx = idx;
  document.getElementById('lb-img').src = lbImages[lbIdx];
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLB() {
  document.getElementById('lightbox')?.classList.remove('open');
  document.body.style.overflow = '';
}
document.getElementById('lb-close')?.addEventListener('click', closeLB);
document.getElementById('lb-prev')?.addEventListener('click', () => { lbIdx = (lbIdx - 1 + lbImages.length) % lbImages.length; document.getElementById('lb-img').src = lbImages[lbIdx]; });
document.getElementById('lb-next')?.addEventListener('click', () => { lbIdx = (lbIdx + 1) % lbImages.length; document.getElementById('lb-img').src = lbImages[lbIdx]; });
document.getElementById('lightbox')?.addEventListener('click', e => { if (e.target === e.currentTarget) closeLB(); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLB();
  if (e.key === 'ArrowLeft') document.getElementById('lb-prev')?.click();
  if (e.key === 'ArrowRight') document.getElementById('lb-next')?.click();
});
if (document.querySelector('.gal-item')) initLightbox();
