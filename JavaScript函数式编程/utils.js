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

module.exports = {
    fail,
    warn,
    note,
    existy,
    truthy
}
