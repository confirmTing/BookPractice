function ajax(url, cb) {
    setTimeout(() => {
        let err = Math.random() > 0.5 ? new Error("数字太大")  : null;
        cb(err, {url});
    })
}

/*function foo(x, y, cb) {
    ajax('' + x + y, cb)
}

foo(11, 31, function (err, text) {
    if (err) {
        console.log('err:', err);
    }else{
        console.log("success:", text);
    }
});*/

if (!Promise.wrap) {
    Promise.wrap = function (fn) {
        return function (...args) {
            return new Promise((resolve, reject) => {
                fn.apply(null, args.concat((err, v) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(v);
                }))
            })
        }
    }
}

let request = Promise.wrap(ajax);
function foo2(x, y, cb) {
    request('' + x + y).then(v => {
        cb(null, v)
    },cb)
}
let betterFoo = Promise.wrap(foo2);

betterFoo(1, 2).then(v => {
    console.log('v2:', v)
}, err => {
    console.log('err2:', err)
});

function foo3(x, y) {
    return request('' + x + y)
}

foo3(3, 4).then(v => {
    console.log('v3:', v)
}, err => {
    console.log('err3:', err)
});
