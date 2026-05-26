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

document.addEventListener('DOMContentLoaded', () => {
  initActiveNav();
  initScrollReveal();
});
