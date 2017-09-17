import Vue from "vue";
import moment from "moment";
import {fetchJson} from "./../modules/DomHelper";

Vue.component('instagram-feed', {
    data: () => ({ 
        posts: []            
    }),
    created() {
        this.getPosts()
    },
    methods: {
        getPosts() {
            const token = '5222788.2177b6c.daf90d77db5441b0a707808c1ebfc6da';
            const url = `https://api.instagram.com/v1/users/self/media/recent?access_token=${token}&count=9`;
            fetchJson(url).then(data => {
                this.posts = data.data.map(post => ({
                    link: post.link,
                    user: post.user.username,
                    img: post.images.standard_resolution.url,
                    likes: post.likes.count,
                    time: moment(post.created_time*1000).format("MM/DD/YYYY")
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