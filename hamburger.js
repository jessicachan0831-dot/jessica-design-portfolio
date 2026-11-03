// Retain support for the older project-page menu markup.
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.toggle('active');
}

(() => {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobileMenu');
  if (toggle && menu) {
    menu.addEventListener('click', (event) => {
      if (event.target.closest('a')) toggle.checked = false;
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && toggle.checked) {
        toggle.checked = false;
        toggle.focus();
      }
    });
  }

  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motion.matches || !('IntersectionObserver' in window)) return;

  const targets = document.querySelectorAll('.main-page .project, .main-page .contact-info');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  targets.forEach((target) => {
    observer.observe(target);
    target.classList.add('reveal-ready');
  });

  // A preference change must also reveal anything still below the fold.
  motion.addEventListener('change', () => {
    if (motion.matches) {
      observer.disconnect();
      targets.forEach((target) => target.classList.remove('reveal-ready'));
    }
  });
})();
