/* Fullscreen menu from the supplied HTML, with native modal focus containment. */
document.documentElement.classList.add("js");
const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-btn");
const menu = document.getElementById("mobile-menu");
const navbar = document.getElementById("navbar");
const mobile = window.matchMedia("(max-width: 767px)");
menuBtn.hidden = false;

function closeMenu(returnFocus = true) {
  if (!menu.open) return;
  menu.close();
  document.body.classList.remove("menu-open");
  menuBtn.setAttribute("aria-expanded", "false");
  if (returnFocus && mobile.matches) menuBtn.focus();
}
menuBtn.addEventListener("click", () => {
  menu.showModal();
  menuBtn.setAttribute("aria-expanded", "true");
  document.body.classList.add("menu-open");
  closeBtn.focus();
});
closeBtn.addEventListener("click", () => closeMenu());
menu.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeMenu();
});
menu.addEventListener("keydown", (event) => {
  if (event.key !== "Tab") return;
  const links = menu.querySelectorAll("a");
  const last = links[links.length - 1];
  if (event.shiftKey && document.activeElement === closeBtn) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    closeBtn.focus();
  }
});
menu.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    closeMenu(false);
    const target = document.getElementById(link.hash.slice(1));
    if (target) target.focus({ preventScroll: true });
  }),
);
mobile.addEventListener("change", () => {
  if (!mobile.matches) closeMenu(false);
});
function updateNavbar() {
  navbar.classList.toggle("is-scrolled", window.scrollY > 40);
}
window.addEventListener("scroll", updateNavbar, { passive: true });
updateNavbar();
