export default {
    bind(){
        console.log(this)
        const el = this.descriptor.el
        if(this.descriptor.arg==='click'){
            el.addEventListener('click', this.vm[this.descriptor.value].bind(this.vm))
        }
    }
}