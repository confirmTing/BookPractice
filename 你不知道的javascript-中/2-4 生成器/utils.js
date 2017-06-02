function run2(gen, ...args) {
    let it;
    it = gen.apply(null, args);
    return (function handleNext(v) {
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
    })();
}

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

function request(url) {
    return new Promise((resolve, reject) => {
        let rand = Math.random();
        setTimeout(() => {
            if (rand > 0.9) {
                //不管这里是reject一个Error实例还是别的，生成器如果有try...catch都会捕获这个拒绝原因
                reject(`数字太大${rand}`);
            }
            resolve(url + (rand*10).toFixed(0));
        }, rand * 100)
    })
}

module.exports = {
    run,
    run2,
    request
}
