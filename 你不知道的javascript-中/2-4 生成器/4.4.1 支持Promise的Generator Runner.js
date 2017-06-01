function ajax(url, cb) {
    setTimeout(() => {
        let err = Math.random() > 0.8 ? new Error("数字太大")  : null;
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

function run(gen, ...args) {
    let it;
    it = gen.apply(this, args);
    return Promise.resolve().then(function handleNext(v) {
        let next = it.next(v);
        return (function handleResult (next) {
            //生成器运行完毕了吗？
            if (next.done) {
                return next.value;
            }

            return Promise.resolve(next.value).then(
                handleNext,
                function handleErr(err) {
                    return Promise.resolve(it.throw(err)).then(handleResult);
                }
            )
        })(next);
    })
}

function foo(x, y) {
    return request('' + x +y);
}

function *main() {
    try{
        let text = yield foo(11, 31);
        let text2 = yield foo(22, 44);
        console.log('text:', text.url + '---' + text2.url);
    } catch (err) {
        console.log('err:', err);
    }
}

run2(main);

function run2(gen, ...args) {
    let it;
    it = gen.apply(null, args);
    return Promise.resolve().then(function handleNext(v) {
        let res = it.next(v);
        if (res.done){
            return res.value;
        }
        return (function (val) {
            Promise.resolve(val).then(
                handleNext,
                err => {
                    it.throw(err);
                }
            )
        })(res.value);
    })
}

//async 与 await 请安装node8.0版本
async function foo2() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(2)
        }, 500);
    })
}

async function main2() {
    // 如果你await了一个Promise 它会暂停这个函数直到Promise决议
    let res = await foo(1, 2);
    console.log('text2:', res);
    let text = await foo2();
    console.log('text2:', text);
}

main2();

