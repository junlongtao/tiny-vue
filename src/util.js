export function toArray(list, start) {
    return [].slice.call(list)
}

export function extend(to, from){
    var keys = Object.keys(from)
    var i = keys.length
    while(i--){w
        to[keys[i]] = from[keys[i]]
    }
    return to
}