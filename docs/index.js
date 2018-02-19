import Vue from '../src/Vue'
new Vue({
    el: '#a',
    data: {
        message: 1
    },
    methods: {
        increase() {
            this.message += 1
        }
    }
})