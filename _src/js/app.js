import {$select, json, ToggleClass, inView} from "./components/DomHelper";
import {Parallax} from "./components/Parallax";
import {AsyncMedia} from "./components/AsyncMedia";
import moment from "moment";

new Parallax("header", "", "video, .bg");
new Parallax("section", "", ".bg");
new AsyncMedia("img, video, [style*='background-image']");

const hashLinks = $select("[href*='#']");
const inverted = $select("section[data-inverted='true']");
const body = document.body;
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
let activePage = "#about";

body.classList.toggle("is-mobile", isMobile);

function updateTheme() {
  const themeInverted = inverted.map(x => inView(x, 40)).indexOf(true) > -1;
  body.classList.toggle("theme-inverted", themeInverted)
}

function updateNav() {
  const hash = window.location.hash;  
  const showMenu = hash === "#menu";
  if (!showMenu) activePage = hash || "#about";

  body.classList.toggle("menu-open", showMenu);
  document.querySelector('.nav').href = showMenu ? '#' : "#menu";
  $select('#menu li a').forEach(e => {
    e.classList.toggle("active", e.matches(`[href="${activePage}"]`))
  })
}

["scroll", "resize", "load"].forEach(e => addEventListener(e, updateTheme));
["hashchange", "load"].forEach(e => addEventListener(e, updateNav));

window.getInstagram =()=> {
  const token = '5222788.2177b6c.daf90d77db5441b0a707808c1ebfc6da';
  const url = `https://api.instagram.com/v1/users/self/media/recent?access_token=${token}&count=9`;
  const element = document.querySelector('.instagram');
  let imagesTemplate = ""
  json(url).then(data => {
    data.data.forEach(post => {
      const img = post.images.standard_resolution.url;
      const time = moment(post.created_time*1000).format("MM/DD/YYYY");
      imagesTemplate += 
        `<li>
          <a href="${post.link}" style="background-image: url(${img});">
            <div class="caption">
              <span class="user">@${post.user.username}</span>
              <span class="meta">${time} — ❤${post.likes.count}</span>
            </div>
          </a>
        </li>`;
   })
   element.innerHTML = `<ul>${imagesTemplate}</ul>`
   new AsyncMedia(".instagram a");   
  })  
}