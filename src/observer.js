import Dep from './Dep'

function Observer(value) {
    this.value = value
    this.dep = new Dep()
    this.walk(value)
}

Observer.prototype.walk = function (obj) {
    var keys = Object.keys(obj)
    for (var i = 0, l = keys.length; i < l; i++) {
        this.convert(keys[i], obj[keys[i]])
    }
}

Observer.prototype.convert = function (key, val) {
    defineReactive(this.value, key, val)
}

Observer.prototype.addVm = function (vm) {
    (this.vm || (this.vms = [])).push(vm)
}

export function observe(value, vm) {
    const ob = new Observer(value)
    ob.addVm(vm)
    return ob
}

export function defineReactive(obj, key, val) {
    var dep = new Dep()

    var property = Object.getOwnPropertyDescriptor(obj, key)
    if (property && property.configurable === false) {
        return
    }

    var getter = property && property.get
    var setter = property && property.set

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get() {
            var value = getter ? getter.call(obj) : val
            if (Dep.target) {
                dep.depend()
            }
            return value
        },
        set(newVal) {
            var value = getter ? getter.call(obj) : val
            if (newVal === value) {
                return
            }

            val = newVal
            dep.notify()
        }
    })
}





