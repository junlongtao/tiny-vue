export default {
    bind(){

    },
    //通过update更新html
    update(value){
        const el = this.descriptor.el
        el.innerHTML = value
    }
}