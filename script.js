/* ============================================
   ACTIVE NAV STATE (IntersectionObserver)
   ============================================ */
function initActiveNav() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (!sections.length || !navLinks.length) return;

  const linkById = new Map();
  navLinks.forEach((link) => {
    const id = link.getAttribute('href')?.slice(1);
    if (id) linkById.set(id, link);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove('is-active'));
          const link = linkById.get(entry.target.id);
          if (link) link.classList.add('is-active');
        }
      });
    },
    {
      rootMargin: '-40% 0px -55% 0px',
      threshold: 0,
    }
  );

  sections.forEach((s) => observer.observe(s));
}

/* ============================================
   SCROLL REVEAL
   ============================================ */
function initScrollReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const targets = document.querySelectorAll('.section > .eyebrow, .section > h2, .section > .lede, .section > .meta-line, .scholarship-card, .integrity-layout, .reflection-body, .video-frame, .pit-pillars, .hero-photo, .section-hero .intro, .section-hero .meta');
  targets.forEach((el) => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
  );

  targets.forEach((el) => observer.observe(el));
}

/* ============================================
   ESSAY PAGER
   ============================================ */
function initEssayPager() {
  const pages = document.querySelectorAll('.essay-page');
  if (!pages.length) return;
  const prevBtn = document.querySelector('.pager-btn[data-action="prev"]');
  const nextBtn = document.querySelector('.pager-btn[data-action="next"]');
  const currentEl = document.querySelector('.pager-current');
  const totalEl = document.querySelector('.pager-total');
  const doc = document.querySelector('.essay-doc');
  let idx = 0;

  function update() {
    pages.forEach((p, i) => p.classList.toggle('active', i === idx));
    if (currentEl) currentEl.textContent = String(idx + 1);
    if (prevBtn) prevBtn.disabled = idx === 0;
    if (nextBtn) nextBtn.disabled = idx === pages.length - 1;
  }

  function next() { if (idx < pages.length - 1) { idx++; update(); } }
  function prev() { if (idx > 0) { idx--; update(); } }

  prevBtn?.addEventListener('click', prev);
  nextBtn?.addEventListener('click', next);

  doc?.addEventListener('click', (e) => {
    const rect = doc.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x > rect.width / 2) next(); else prev();
  });

  document.addEventListener('keydown', (e) => {
    if (!doc) return;
    const docRect = doc.getBoundingClientRect();
    const inView = docRect.top < window.innerHeight && docRect.bottom > 0;
    if (!inView) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); prev(); }
  });

  if (totalEl) totalEl.textContent = String(pages.length);
  update();
}

document.addEventListener('DOMContentLoaded', () => {
  initActiveNav();
  initScrollReveal();
  initEssayPager();
});
