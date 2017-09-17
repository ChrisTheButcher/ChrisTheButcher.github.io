import {Parallax} from "./modules/Parallax";
import Vue from "vue";
import "./components/instagram.component";
import "./components/instagram-post.component";
import "./components/main-menu.component";
import "./components/hero-img.component";

new Parallax("header", "", "video, .bg");
new Parallax("section", "", ".bg");

const app = new Vue({ el: "#app" });




