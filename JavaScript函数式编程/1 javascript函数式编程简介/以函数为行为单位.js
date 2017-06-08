const {fail, note, warn} = require('../utils');
const _ = require('../underscore');

//没有对参数进行检查
function nativeNth(a, index) {
    return a[index];
}

function isIndexed(data) {
    return _.isArray(data) || _.isString(data);
}

function nth(a, index) {
    if (!_.isNumber(index)) return fail('Expected a number as the index');
    if (!isIndexed(a)) return fail('not supported on non-indexed type');
    if (index < 0 || index > a.length - 1) return fail('index value is out of bounds');
    return a[index];
}

console.log(nth({}, -1));
console.log(nth([1,2], 0));
console.log(nth("letters", 1));

//没有给定参数的情况下sort方法执行的是字符串比较
let arr = [2,3,-1,-6,0,-108,42,10,-0];
console.log(arr.sort());
//在对数字排序的时候我们需要一个比较器
console.log(arr.sort((x,y) => x - y));

function compareLessThanOrEqual(x, y) {
    if (x < y) return -1;
    if (x > y) return 1;
    return 0;
}

function lessOrEqual(x, y) {
    return x > y;
}

function isEqual(x, y) {
    return x === y;
}
console.log('isEqual', arr.sort(isEqual));
console.log(arr.sort(compareLessThanOrEqual));
console.log('lessOrEqual:', arr.sort(lessOrEqual));

function comparator(pred) {
    return function (x, y) {
        if (pred(x, y)) return -1;
        if (pred(y, x)) return 1;
        return 0;
    }
}

console.log('comparator:', arr.sort(comparator(lessOrEqual)));
console.log('comparator2:', arr.sort(comparator(_.isEqual)));
