import {$select} from "./components/DomHelper";
import {ToggleClass} from "./components/ToggleClass";

const hashLinks = $select("[href*='#']");
const inverted = $select("section.is-inverted");
const body = document.body;
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

body.classList.toggle("is-mobile", isMobile);

function inView(element) {
  const nav = document.querySelector(".nav").getBoundingClientRect();
  const navHalf = nav.top + (nav.height / 2);
  const section = element.getBoundingClientRect();
  return (section.top < navHalf) && !(section.bottom < navHalf);
};

hashLinks.forEach(e => e.addEventListener("click", e => body.classList.toggle("menu-open")));

document.addEventListener("scroll", e => {
  const themeInverted = inverted.map(x => inView(x)).indexOf(true) > -1;
  body.classList.toggle("theme-inverted", themeInverted)
});