function ajax(url, cb) {
    setTimeout(() => {
        let err = Math.random() > 0.5 ? new Error("数字太大")  : null;
        cb(err, {url});
    })
}

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

function foo(x, y) {
    return request('' + x +y);
}

function *main() {
    try{
        let text = yield foo(11, 31);
        console.log('text:', text);
    } catch (err) {
        console.log('err:', err);
    }
}

let it = main();
let res = it.next();
res.value.then(v => {
    it.next(v);
}, err => {
    it.throw(err);
});
