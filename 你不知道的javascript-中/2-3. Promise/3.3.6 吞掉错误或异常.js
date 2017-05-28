//resolve不会执行，因为没有foo，代码会出错，promise会帮我们捕捉异常并使这个Promise被拒绝
let p = new Promise(resolve => {
    foo();
    resolve(2);
})

p.then(v => {
    console.log(v);
}, err => {
    console.log(err);
});

let p1 = new Promise(resolve => {
    resolve(42);
});

p1.then(v => {
    foo(); //then本身就会返回一个promise 所以这里的错误也被promise捕捉了
    console.log(v);
}, err => {
    console.log(err);
}).catch(err => {
    console.log(err);
});
