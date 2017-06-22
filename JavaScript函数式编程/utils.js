const _ = require('./underscore');

function fail(thing) {
    // throw new Error(thing);
    console.error(`Error:${thing}`);
}

function warn(thing) {
    console.warn(`Warning:${thing}`);
}

function note(thing) {
    console.log(`Note:${thing}`);
}

function existy(x) {
    return x != null;
}

//判断x是否是true的同义词
function truthy(x) {
    return x !== false && existy(x);
}

function cat(...args) {
    let head = args.shift();
    if (existy(head)) {
        return head.concat(args);
    } else {
        return [];
    }
}

function construct(head, tail) {
    let result = cat([head], _.toArray(tail));
    return result
}

module.exports = {
    fail,
    warn,
    note,
    existy,
    truthy,
    construct,
    _
}
