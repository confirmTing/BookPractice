function checker(...validators) {
    return function (obj) {
        return validators.reduce((errs, check) => {
            if (check(obj)){
                return errs;
            }
            errs.push(check.message);
            return errs;
        }, [])
    }
}

function aMap(obj) {
    return {}.toString.call(obj) == '[object Object]';
}

function validator(message, fun) {
    let f = function (...args) {
        return fun.apply(fun, args);
    }
    f.message = message;
    return f;
}

let checkCommand = checker(validator('must be a map', aMap));

console.log(checkCommand({}));


function hasKeys(...keys) {
    let f = function (obj) {
        return keys.every(k => {
            return obj[k] != void 0;
        })
    }
    f.message = 'must have values for keys:' + keys.join(" ");
    return f;
}

checkCommand = checker(validator('must be a map', aMap), hasKeys('msg', 'type'));

console.log(checkCommand({msg: 1}));
