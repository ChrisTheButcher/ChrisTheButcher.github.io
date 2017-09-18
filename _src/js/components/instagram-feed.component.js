import Vue from "vue";
import moment from "moment";
import {fetchJson} from "./../modules/DomHelper";

Vue.component('instagram-feed', {
    data: () => ({ 
        posts: []            
    }),
    props: {
        user: {default: 'self'},
        token: {default: '5222788.2177b6c.daf90d77db5441b0a707808c1ebfc6da'},        
        count: {default: 6},
    },
    mounted() {
        this.getPosts()
    },
    methods: {
        getPosts() {
            const url = `https://api.instagram.com/v1/users/${this.user}/media/recent?access_token=${this.token}&count=${this.count}`;
            fetchJson(url).then(data => {
                console.log(data)
                this.posts = data.data.map(post => ({
                    tags: post.tags,
                    link: post.link,
                    user: post.user.username,
                    img: post.images.standard_resolution.url,
                    likes: post.likes.count,
                    time: post.created_time
                }))
            })
        }
    },
    template: `
        <div class="instagram-feed">
            <ul>
                <instagram-post 
                    v-for="post in posts" 
                    v-bind="post" 
                    :key="post.$index">
                </instagram-post>
            </ul>
        </div>
    `
})