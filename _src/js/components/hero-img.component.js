import Vue from "vue";

Vue.component('hero-img', {
    data: () => ({
        imgLoaded: false,
        videoLoaded: false
    }),
    props: ['video', 'img'],  
    methods: {
        loadImg() { this.imgLoaded = true },
        loadVideo(e) { this.videoLoaded = true }
    },
    template: `
        <figure class="hero-img">
            <video 
                playsinline
                v-on:loadeddata="loadVideo"
                v-if="video" 
                v-bind:class="{loaded : videoLoaded}"
                preload="none"
                loop
                autoplay>
                <source v-bind:src="video"  type="video/mp4">
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