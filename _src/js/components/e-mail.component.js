import Vue from "vue";

Vue.component('e-mail', {
    data: ()=> ({
        email: '',
        body: '',
        href: '',
        expanded: false
    }),
    created() {
        this.href = 'mailto:' + this.mailto;
    },
    props: ['mailto', 'placeholder'],    
    methods: {
        send(e) {
            e.preventDefault();
            this.href = `mailto:${this.mailto}?cc=&subject=${encodeURIComponent('chriswijnia.com / message by ' + this.email)}&body=${encodeURIComponent(this.body)}`;
            location = this.href;
            this.href = '';
            this.email = '';
            this.body = '';
            this.expanded = false;
        }
    },
    template: `
        <form class="e-mail" v-on:submit="send($event)">
            <div class="input-group">
                <textarea 
                    v-bind:rows="expanded ? 3 : 1" 
                    class="input-group-input"
                    v-model="body" 
                    v-on:focus="expanded = true"                    
                    required 
                    v-bind:placeholder="placeholder">
                </textarea>
                <button class="input-group-addon" v-show="!expanded">
                    <img src="/assets/img/arrow-right.svg">
                </button>
            </div>

            <div class="input-group" v-bind:class="{ 'hidden' : !expanded }">
                <input type="email" required v-model="email" placeholder="email" class="input-group-input"> 
                <button type="submit" title="send" class="input-group-addon">
                    <img src="/assets/img/arrow-right.svg" alt="send">
                </button>           
            </div>
        </form>

    `
}) 