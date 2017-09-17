import Vue from "vue";
import {$select} from "./../modules/DomHelper";

Vue.component('main-menu', {
    data: () => ({
        parsedChapters: null,
        open: false,
        active: null
    }),
    props: ['chapters'],    
    created() {
        const hash = location.hash;  
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const chapters = this.chapters.split(",");
        const parsedChapters = chapters.map(chapter => {
            const parsed = chapter.split(":");
            return { hook: parsed[0], title: parsed[1], hash: "#" + parsed[0] }
        })

        document.body.setAttribute("data-is-mobile", isMobile);                
        this.parsedChapters = parsedChapters;
        this.active = this.parsedChapters.find(chapter => chapter.hash === hash) || this.parsedChapters[0];
        this.updateTheme();
        ["scroll", "resize"].forEach(e => addEventListener(e, this.updateTheme));
    },
    methods: {
        activate(data) {
            this.active = data;
            this.open = false;
        },
        toggleOpen() {
            this.open = !this.open;
        },
        updateTheme() {
            const offset = 30;
            const inverted = $select("[data-inverted=true]").some(e => {
                const rect = document.querySelector("[data-inverted=true]").getBoundingClientRect();
                return (rect.top < offset) && (rect.bottom > offset);
            })
            document.body.setAttribute("data-theme-inverted", inverted)  
        }
    },
    watch: {
        open() {
            document.body.setAttribute("data-main-menu-open", this.open)  
        }
    },
    template: `
        <div class="main-menu" input v-on:keyup.esc="open = false">
            <button class="toggle" v-on:click="toggleOpen">Menu</button>
            <nav id="menu">
                <ul>
                    <li v-for="chapter in parsedChapters">
                        <a  v-bind:class="{active: active === chapter}"
                            v-on:click="activate(chapter)"
                            v-bind:href="chapter.hash" 
                            v-bind:data-alt="chapter.title">
                            {{chapter.hook}}
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    `
})