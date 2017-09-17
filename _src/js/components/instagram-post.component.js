import Vue from "vue";

Vue.component('instagram-post', {
    data: () => ({ 
        loaded: false
    }),
    props: ['user', 'img', 'time', 'link', 'likes'],
    methods: {
        loadImg(e) { this.loaded = true }
    },  
    template: `
        <li>
            <a  v-bind:href="link" 
                v-bind:style="{ backgroundImage: 'url('+img+')' }"  
                v-bind:class="{ loaded: loaded }">

                <figure>
                    <img v-on:load="loadImg" v-bind:src="img" alt="">      
                                
                    <figcaption class="caption">
                        <span class="user">@{{user}}</span>
                        <span class="meta">{{time}} — ❤{{likes}}</span>
                    </figcaption>
                </figure>
            </a>
        </li>
    `
})