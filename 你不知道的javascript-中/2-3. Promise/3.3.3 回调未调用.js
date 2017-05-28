//用于超时一个promise的工具
function timeoutPromise(delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("Timeout!");
            console.log('Timeout...'); //这里会执行
            resolve('不会执行到这里');
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
//后续详细讲解promise超时用法
Promise.race([foo(), timeoutPromise(3000)]).then(data => {
    console.log('及时完成');
}, err => {
    console.log(err);
});

//promise.then的调用次数是一次，未被调用的情况属于上面的超时问题，如果你注册了多个回调函数，注册了几个就会执行几个