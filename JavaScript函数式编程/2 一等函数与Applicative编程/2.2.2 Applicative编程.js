const _ = require('../underscore');

function allOf(...args) {
    return _.reduceRight(args, (truth, f) => {
        return truth && f();
    }, true)
}

function anyOf(...args) {
    return _.reduceRight(args, (truth, f) => {
        return truth || f();
    }, false)
}

function t() {
    return true;
}

function f() {
    return false;
}

console.log(allOf(t,t,t));
console.log(allOf(t,t,t,f));
console.log(anyOf(f,f,f));
console.log(anyOf(t,t,t,f));
