// p1和p2的行为完全一致
let p1 = new Promise(resolve => {
    resolve(42);
});
//向Promise.resolve() 传递一个立即值就会返回一个promise
let p2 = Promise.resolve(42);

p1.then(data => {
    console.log(data)
});
p2.then(data => {
    console.log(data)
});
//向Promise.resolve() 传递一个promise会返回同一个promise
let p3 = Promise.resolve(p2);
console.log("p2 === p3 -> %s", p2 === p3);
p3.then(data => {
    console.log(data)
});

// obj是一个thenable，不是一个真正的promise
let obj = {
    then(cb, errcb) {
        cb(42);
        errcb('不应该运行...');
    }
};

obj.then(data => {
    console.log('likePromise: %s', data)
}, err => {
    console.log(err);
});
//虽然obj不是promise我们还是可以把他传递给Promise.resolve()他将返回一个规范化后的结果
//Promise.resolve可以接受任何thenable
let likePromise = Promise.resolve(obj);
console.log('likePromise === obj -> %s', likePromise === obj);
likePromise.then(data => {
    console.log('likePromise: %s', data)
}, err => {
    console.log(err);
});
