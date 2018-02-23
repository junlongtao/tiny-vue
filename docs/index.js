import Vue from '../src/Vue'
new Vue({
    el: '#a',
    data: {
        count: 1
    },
    methods: {
        increase() {
            this.count += 1
        }
    }
})