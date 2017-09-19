import Vue from "vue";

Vue.component('e-mail', {
    data: ()=> ({
        subject: '',
        body: '',
        href: '',
        expanded: false
    }),
    created() {
        this.href = 'mailto:' + this.mailto;
    },
    props: ['mailto'],    
    methods: {
        send(e) {
            e.preventDefault();
            this.href = `mailto:${this.mailto}?cc=&subject=${encodeURIComponent(this.subject)}&body=${encodeURIComponent(this.body)}`;
            location = this.href;
            this.href = '';
            this.subject = '';
            this.body = '';
            this.expanded = false;
        }
    },
    template: `
        <form class="e-mail" v-on:submit="send($event)">
            <div class="input-group">
                <input type="text" 
                    v-model="subject" 
                    required
                    v-on:focus="expanded = true"
                    class="input-group-input"
                    placeholder="subject">
                <button class="input-group-addon" v-show="!expanded">
                    <img src="/assets/img/arrow-right.svg" alt="send">
                </button>
            </div>


            <div class="input-group" v-bind:class="{ 'hidden' : !expanded }">
                <textarea 
                    rows="3" 
                    class="input-group-input"
                    v-model="body" 
                    required 
                    placeholder="message">
                </textarea>

                <button type="submit" title="send" class="input-group-addon">
                    <img src="/assets/img/arrow-right.svg" alt="send">
                </button>
            </div>
        </form>

    `
}) 