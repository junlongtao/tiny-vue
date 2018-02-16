import {toArray} from './util'
import lifecycle from './lifecycle'
import state from './state'

class Vue{
    constructor(options){
        this.init(options)
    }

    init(options){
        this._directives = []
        this._watchers = []

        const el = document.querySelector(options.el)
        options._containerAttrs = toArray(el.attributes)

        this.$options = options
        for(let k in options.methods){
            this[k] = options.methods[k]
        }

        this._initState()

        this._compile(el, options)
    }
}

state(Vue)
lifecycle(Vue)

window.Vue = Vue