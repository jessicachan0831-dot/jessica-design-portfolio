// Content stays visible without JavaScript, or when motion is reduced.
(() => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches || !('IntersectionObserver' in window)) return;
  const elements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.04 });
  for (const element of elements) {
    observer.observe(element);
    element.classList.add('ready');
  }
  preference.addEventListener('change', () => {
    if (preference.matches) {
      observer.disconnect();
      elements.forEach(element => element.classList.remove('ready'));
    }
  });
})();
