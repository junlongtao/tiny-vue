import {observe} from './observe'

export default function (Vue) {
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

    Vue.prototype._initState = function () {
        this._initData()
    }

    Vue.prototype._initData = function () {
        var dataFn = this.$options.data
        var data = this._data = dataFn ? (typeof dataFn == 'function' ? dataFn() : dataFn) : {}
        var keys = Object.keys(data)
        var i, key
        i = keys.length
        while(i--){
            key = keys[i]
            this._proxy(key)
        }

        observe(data, this)
    }

    Vue.prototype._proxy = function(key){
        var self = this
        Object.defineProperty(self, key, {
            configurable: true,
            enumerable: true,
            get: function proxyGetter() {
                return self._data[key]
            },
            set: function proxyGetter(val){
                self._data[key] = val
            }
        })
    }
}