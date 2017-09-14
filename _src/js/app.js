import {$select} from "./components/DomHelper";
import {ToggleClass} from "./components/ToggleClass";
import {Parallax} from "./components/Parallax";

new Parallax("header", "", "video, .bg")
new Parallax("section", "", ".bg")

const hashLinks = $select("[href*='#']");
const inverted = $select("section[data-inverted='true']");
const media = $select("img, video, [style*='background-image']");
const body = document.body;
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

body.classList.toggle("is-mobile", isMobile);

function inView(element) {
  const nav = document.querySelector(".nav").getBoundingClientRect();
  const navHalf = nav.top + (nav.height / 2);
  const section = element.getBoundingClientRect();
  return (section.top < navHalf) && !(section.bottom < navHalf);
};

media.forEach(e => {
  let saved, img;
  let listerer = e.tagName === "VIDEO" ? "loadeddata" : "load";

  if (e.matches("[style*='background-image']")) {
    saved = e.style.backgroundImage;
    e.style.backgroundImage = "";
    img = document.createElement("img");
    img.src = saved.slice(4, -1).replace(/"/g, "");
    setTimeout(()=> { e.style.backgroundImage = saved }, 30)
  }
  else {
    saved = e.src;    
    e.src = "";
    img = e;
    setTimeout(()=> { e.src = saved }, 30)    
  }

  img.addEventListener(listerer, () => e.classList.add("loaded"))
})

hashLinks.forEach(e => e.addEventListener("click", e => body.classList.toggle("menu-open")));

["scroll", "resize"].forEach(e => addEventListener(e, () => {
  const themeInverted = inverted.map(x => inView(x)).indexOf(true) > -1;
  body.classList.toggle("theme-inverted", themeInverted)
}));