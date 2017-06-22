function fnull(fun, ...defaults) {
    return function (...args) {
        var args = args.map((e, i) => {
            // console.log(i, e)
            return e ? e : defaults[i];
        })
        return fun.apply(null, args)
    }
}

let nums = [1, 2, 3, null, 5];
let safeMult = fnull(function (total, n) {
    return total * n;
}, 1, 1);

console.log(nums.reduce(safeMult));

