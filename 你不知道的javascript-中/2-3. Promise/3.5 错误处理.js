// 我们常用的错误处理就是try...catch但是他只能是同步的，无法用户异步代码模式

/*try{
    setTimeout(() => {
        foo()
    },0)
}catch(e){
    console.log(e);
}*/

//如果一开始就没有正确的使用Promise API将会立即抛出一个错误，如：
// new Promise(); //需接受一个函数作为参数
// Promise.all()
// Promise.race(42)

//绝望的陷阱
// 为了避免丢失被忽略和抛弃的Promise错误，我们可以在最后以一个catch结尾
new Promise(resolve => {
    foo()
}).catch(err => {
    //console.log(err);
});


//成功的坑
let p1 = Promise.reject(13).defer();

new Promise(resolve => {
    resolve(21);
}).then(v => {
    return p1;
}, err => {
    console.log(err);
});
