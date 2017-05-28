//promise都是异步的，即使是立即决议的promise
function createPromise() {
    return new Promise(resolve => {
        resolve(2)
    })
}

let p = createPromise();
// promise一旦决议任何通过then注册的回调都会在下一个异步时间点上依次执行
p.then(data => {
    //这里新添加的回调无法影响或延误对其他回调的调用
    p.then(data => {
        console.log('C-1');
    })
    console.log('A-1');
})

p.then(data => {
    console.log('B-1');
})

// 通常情况下如果两个promise都已经决议那么p1.then()应该先于p2.then()
//但是读下面这种场景不适用

let p3 = new Promise(resolve => {
    resolve("B-2")
});

let p1 = new Promise(resolve => {
    resolve(p3)
});

let p2 = new Promise(resolve => {
    resolve("A-2")
});
// p1不是用立即值而是用另一个promise p3决议，规定的行为是把p3异步的展开到p1，所以p1的回调排在了p2的回调之后
//好的编码实践方案不应该依赖回调执行的顺序
p1.then(v => {
    console.log(v);
});

p2.then(v => {
    console.log(v);
});
