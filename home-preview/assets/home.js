/* The navigation remains available without JavaScript. */
document.documentElement.classList.add('js');
const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-navigation');
const mobile = window.matchMedia('(max-width: 700px)');

function setMenu(open, returnFocus = false) {
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  navigation.classList.toggle('is-open', open);
  header.dataset.menuOpen = String(open);
  if (returnFocus) toggle.focus();
}
toggle.hidden = false;
toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setMenu(false, true);
});
navigation.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (!link) return;
  const wasOpen = toggle.getAttribute('aria-expanded') === 'true';
  setMenu(false);
  if (wasOpen && link.hash) {
    const target = document.getElementById(link.hash.slice(1));
    if (target) target.focus({ preventScroll: true });
  }
});
document.addEventListener('click', (event) => {
  if (toggle.getAttribute('aria-expanded') === 'true' && !header.contains(event.target)) setMenu(false);
});
header.addEventListener('focusout', () => {
  requestAnimationFrame(() => {
    if (!header.contains(document.activeElement)) setMenu(false);
  });
});
mobile.addEventListener('change', () => setMenu(false));
