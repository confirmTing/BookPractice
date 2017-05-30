let promises = [];
for(let i = 0; i < 10; i++){
    promises.push(new Promise((resolve, reject) => {
        let rand = Math.ceil(Math.random() * 10);
        setTimeout(() => {
            if (rand > 2){
                resolve(rand);
            }
            reject(rand)
        }, rand * 100)
    }))
}

Promise.race(promises).then(v => {
    console.log('v:', v);
}, err => {
    console.log('err:', err)
});

//超时竞赛

//用于超时一个promise的工具
function timeoutPromise(delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("Timeout!");
        }, delay)
    })
}

function foo() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('setTimeout');
        }, 5000)
    });
}

function promiseObserve(p, cb) {
    p.then(v => {
        Promise.resolve(v).then(cb);
    }, err => {
        Promise.resolve(err).then(cb);
    })
    return p
}

//后续详细讲解promise超时用法
Promise.race([promiseObserve(foo(), (...args) => {
    console.log('args:', args);
}), timeoutPromise(3000)]).then(data => {
    console.log('及时完成');
}, err => {
    console.log(err);
});

for(let k in Promise){
    console.log(k, ':', Promise[k])
}