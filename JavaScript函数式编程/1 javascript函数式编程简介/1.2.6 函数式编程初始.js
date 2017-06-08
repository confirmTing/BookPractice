// 有时候我们可能会写这样的代码
/*
if (condition) {
    return _.isFunction(doSomething) ? doSomething() : doSomething;
} else {
    return undefined;
}*/
const _ = require('../underscore');
let {existy , truthy} = require('../utils');
//然而我们可以把这个逻辑封装起来
function doWhen(cond, action) {
    if (truthy(cond)) {
        return action();
    }
}

function executeIfHasField(target, name) {
    return doWhen(existy(target[name]), () => {
        let result = _.result(target, name);
        console.log(`the result is ${result}`);
        return result;
    })
}

executeIfHasField([1, 2, 3], 'reverse');
executeIfHasField({foo: 42}, 'foo');
executeIfHasField([1, 2, 3], 'notHere');
