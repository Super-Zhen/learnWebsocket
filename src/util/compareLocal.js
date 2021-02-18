module.exports= function (a,b) {
    return a.localeCompare(b)<0? [a,b]:[b,a]
}
