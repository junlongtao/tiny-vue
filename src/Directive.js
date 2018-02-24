import {extend} from "./util";
import Watcher from './Watcher'

export default function Directive(descriptor, vm, el){
    this.descriptor = descriptor
    this.vm = vm
    this.el = el
    this.expression = descriptor.expression
}

//bind主要逻辑
Directive.prototype._bind = function() {
    var def = this.descriptor.def
    if (typeof def === 'function') {
        this.update = def
    } else {
        extend(this, def)
    }

    if (this.bind) this.bind()
    if (this.update) this.update()

    if (this.update) {
        const dir = this
        this._update = function (val, oldVal) {
            dir.update(val, oldVal)
        }
    } else {
        this._update = function () {
        }
    }


    var watcher = new Watcher(
        this.vm,
        this.expression,
        this._update
    )
    this._watcher = watcher

    if (this.update) {
        this.update(watcher.value)
    }
}