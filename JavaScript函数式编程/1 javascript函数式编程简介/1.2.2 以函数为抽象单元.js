let _ = require('../underscore');
//原始的编程方式，如果我们想更改输出错误，信息，警告的方式就要修改相应的的代码
function parseAge(age) {
    if (!_.isString(age)) throw new Error('Expecting a string');
    console.log('attempting to parse an age');
    let a = parseInt(age);
    if (_.isNaN(a)) {
        console.log(`Could not parse age:${age}`);
        a = 0;
    }
    return a;
}

console.log(parseAge2("42"));
console.log(parseAge2("sf"));

//下面我们把parseAge拆分一下，把错误，信息，警告的概念抽象成不同的函数
function fail(thing) {
    throw new Error(thing);
}

function warn(thing) {
    console.warn(`Warning:${thing}`);
}

function note(thing) {
    console.log(`Note:${thing}`);
}

function parseAge2(age) {
    if (!_.isString(age)) fail('Expecting a string');
    note('attempting to parse an age');
    let a = parseInt(age);
    if (_.isNaN(a)) {
        warn(`Could not parse age:${age}`);
        a = 0;
    }
    return a;
}
