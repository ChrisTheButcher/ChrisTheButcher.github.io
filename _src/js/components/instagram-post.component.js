import Vue from "vue";
import moment from "moment";

Vue.component('instagram-post', {
    data: () => ({ 
        loaded: false,
        timeString: null,
        datetime: null,
        filteredTags: []
    }),
    created() {
        const time = moment(this.time * 1000);
        this.timeString = time.format("MM/DD/YYYY");
        this.datetime = time.format("YYYY-MM-DDThh:mm:ssTZD");
        this.tagsFiltered = this.tags.filter((tag, i) => i < 6)
    },
    props: ['user', 'img', 'time', 'link', 'likes', 'tags'],
    methods: {
        loadImg(e) { this.loaded = true }
    },  
    template: `
        <li class="instagram-post">
            <a  v-bind:href="link" 
                v-bind:style="{ backgroundImage: 'url('+img+')' }"  
                v-bind:class="{ loaded: loaded }">

                <figure>
                    <img v-on:load="loadImg" v-bind:src="img" alt="">      
                                
                    <figcaption class="caption">
                        <span class="user">@{{user}}</span>
                        <span class="meta">
                            <time v-bind:datetime="datetime">{{timeString}}</time> 
                            — 
                            ❤{{likes}}
                        </span>
                        <div class="tags" v-if="tagsFiltered">
                            <template v-for="tag of tagsFiltered">
                                <span class="tag">#{{tag}}</span>&nbsp;
                            </template> 
                        </div>
                    </figcaption>
                </figure>
            </a>
        </li>
    `
})