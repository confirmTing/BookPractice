const {construct} = require('../utils');
const _ = require('../underscore');
// const _ = require('../../框架源码练习/underscore/underscore');
let library = [{title: 'SICP', isbn: '001', ed: 1}, {title: 'SICP', isbn: '002', ed: 2}, {
    title: 'Joy',
    isbn: '003',
    ed: 1
}];

// console.log(_.findWhere(library, {title: 'SICP', ed: 2}));
// console.log(_.where(library, {title: 'SICP'}));

function project(table, keys) {
    return _.map(table, function (obj) {
        return _.pick.apply(null, construct(obj, keys))
    })
}

console.log(_.pick.apply(null, [ { title: 'SICP', isbn: '001', ed: 1 }, [ 'title', 'isbn' ] ]));


let editionResults = project(library, ['title', 'isbn']);
console.log('editionResults:', editionResults);

function rename(obj, newNames) {
    return _.reduce(newNames, (o, curVal, key) => {
        if (_.has(obj, key)) {
            o[curVal] = obj[key];
            return o;
        }
        return o;
    }, _.omit(...construct(obj, _.keys(newNames))))
}

// console.log(_.omit({a: 1, b: 2}, ['a']))

console.log('rename', rename({a: 1, b: 2}, {a: 'AAA'}));
