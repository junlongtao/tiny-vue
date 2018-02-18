let uid = 0

export default function Dep(){
    this.id = uid++
    this.subs = []
}


Dep.target = null

Dep.prototype.addSub = function(){
    this.subs.push(sub)
}

Dep.prototype.removeSub = function(sub){
    this.subs.$remove(sub)
}

Dep.prototype.depend = function(){
    Dep.target.addDep(this)
}

Dep.prototype.notify = function(){
    var subs = this.subs
    for(var i=0,len=subs.length; i<len; i++){
        subs[i].update()
    }
}