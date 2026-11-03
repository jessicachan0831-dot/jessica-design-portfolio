// A small process preview; all project links work without JavaScript.
(() => {
  const controls = document.querySelector('.art-switch');
  const image = document.getElementById('dessert-artwork');
  if (!controls || !image) return;
  controls.hidden = false;
  controls.addEventListener('click', event => {
    const button = event.target.closest('button[data-art]');
    if (!button) return;
    image.src = button.dataset.art;
    image.alt = button.dataset.alt;
    controls.querySelectorAll('button').forEach(item => {
      item.setAttribute('aria-pressed', String(item === button));
    });
  });
})();
