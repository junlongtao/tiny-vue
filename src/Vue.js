import {toArray} from './util.js'
import {compile} from "./complie";
import {observe} from "./observer";
import Directive from "./Directive";

class Vue {
    constructor(options) {
        this.init(options)
    }

    init(options) {
        this._directives = []
        this._watchers = []

        const el = document.querySelector(options.el)
        options._containerAttrs = toArray(el.attributes)

        this.$options = options
        for (let k in options.methods) {
            this[k] = options.methods[k]
        }

        this._initData()

        this._compile(el, options)
    }

    _initData() {
        //get data
        var dataFn = this.$options.data
        this._data = typeof dataFn === 'function' ? dataFn() : dataFn

        //proxy
        for (var key in this._data) {
            Object.defineProperty(this, key, {
                configurable: true,
                enumerable: true,
                get: function proxyGetter() {
                    return this._data[key]
                },
                set: function proxySetter(val) {
                    this._data[key] = val
                }
            })
        }

        console.log(this)
        observe(this._data, this)
    }

    _compile(el, options) {
        const linkFn = compile(el, options)
        if (linkFn) linkFn(this, el)
    }

    _bindDir(descriptor, el) {
        this._directives.push(new Directive(descriptor, this, el))
    }
}

Object.defineProperty(Vue.prototype, '$data', {
    get() {
        return this._data
    },

    set(newData) {
        if (newData !== this._data) {
            this._setData(newData)
        }
    }
})

window.Vue = Vue

export default Vue