let obj = {
    then (resolve, reject) {
        reject(Promise.resolve('oops'));
    }
}
//reject始终用于拒绝
//reject 不会像resolve一样进行展开，如果向reject传入一个Promise/thenable值，它会把这个值原封不动的设置为拒绝理由
Promise.resolve(obj).then(v => {
    console.log('v:', v)
}, err => {
    console.log('err:', err);
});

//resolve通常用于标识Promise已经完成
new Promise(resolve => {
    resolve(Promise.reject('oops2'));
}).then(v => {
    console.log('v2:', v);
}, err => {
    console.log('err2:', err);
});
