//自己写的promise.all
function promiseAll(vals) {
    if (!Array.isArray(vals)) {
        throw new Error('参数错误');
    }
    return new Promise((resolve, reject) => {
        let result = [], num = 0, len = vals.length;
        for(let i = 0, len = vals.length; i < len; i++){
            Promise.resolve(vals[i]).then(v => {
                result.push(v);
                if (++num == len) {
                    resolve(result);
                }
            }, reject)
        }
    })
}
//向Promise.all传入空数组会立即决议
Promise.all([]).then(vals => {
    console.log(vals)
});

//向Promise.race传入空数组将永远不会决议
Promise.race([]).then(v => {
    console.log(v)
});
