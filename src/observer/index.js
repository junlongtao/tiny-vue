Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
        var value = getter ? getter.call(obj) : val
        if (Dep.target) {
            dep.depend()
        }
        return value
    }
})