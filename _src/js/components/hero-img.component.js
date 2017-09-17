import Vue from "vue";

Vue.component('hero-img', {
    data: () => ({
        imgLoaded: false,
        videoLoaded: false
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
                v-if="video" 
                v-bind:class="{loaded : videoLoaded}"
                v-bind:src="video" 
                loop 
                preload="none"
                autoplay>
            </video>

            <img v-on:load="loadImg"
                v-if="img" 
                v-bind:src="img" 
                alt="">

            <div class="bg"
                 v-if="img"  
                 v-bind:class="{loaded : img}"                 
                 v-bind:style="{ backgroundImage: 'url('+img+')' }">
            </div>
        </figure>
    `
})