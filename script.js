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

document.addEventListener('DOMContentLoaded', () => {
  initActiveNav();
});
