import Vue from "vue";
import {Parallax} from "./modules/Parallax";
import {LazyLoad} from "./modules/DomHelper";
import "./components/instagram-feed.component";
import "./components/instagram-post.component";
import "./components/main-menu.component";
import "./components/hero-img.component";
import "./components/e-mail.component";

const heroBg = new Parallax("header", "", "video, .bg");
const sectionBg = new Parallax("section", "", ".bg");
const lazyLoad = new LazyLoad("data-src");

const app = new Vue({ el: "#app" });




