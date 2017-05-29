//每次对Promise调用then都会立即返回一个新的promise
let p = new Promise(resolve => {
    resolve(21);
});

//不管从then调用的完成回调返回的值是什么，它都会被自动设置为被链接Promise的完成
let p1 = p.then(v => {
    console.log(v);
    return v * 2;
});
// 如果不显示返回一个值就会隐士返回undefined
p1.then(v => {
    console.log(v);
}).then(data => {
    console.log(data);
});

//如果步骤2需要等待步骤1处理一些事情我们还可以这么做
new Promise(resolve => {
    resolve(21);
}).then(v => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(v * 2);
        }, 1000)
    })
}).then(v => {
    console.log("异步：", v);
});
//在完成或者拒绝处理函数内部如果返回一个值或抛出一个异常，新返回的Promise（可连接的）的相应的决议
new Promise(resolve => {
    foo();
    resolve(21);
}).then(v => {
    return v * 2;
}).then(null, err => {
    console.log(err);
});
