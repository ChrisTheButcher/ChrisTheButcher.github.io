import Vue from "vue";

Vue.component('hero-img', {
    data: () => ({
        imgLoaded: false,
        videoLoaded: false,
        videoSrc: null,
        imgSrc: null,
    }),
    props: ['video', 'img'],    
    created() {
        this.videoSrc = this.video;
        this.imgSrc = this.img;
    },
    methods: {
        loadImg() { this.imgLoaded = true },
        loadVideo() { this.videoLoaded = true }
    },
    template: `
        <figure class="hero-img">
            <video 
                v-on:loadeddata="loadVideo"
                v-if="videoSrc" 
                v-bind:class="{loaded : videoLoaded}"
                v-bind:src="videoSrc" 
                loop 
                autoplay>
            </video>

            <img v-on:load="loadImg"
                v-if="imgSrc" 
                v-bind:src="imgSrc" 
                alt="">

            <div class="bg"
                 v-if="imgSrc"  
                 v-bind:class="{loaded : imgLoaded}"                 
                 v-bind:style="{ backgroundImage: 'url('+imgSrc+')' }">
            </div>
        </figure>
    `
})