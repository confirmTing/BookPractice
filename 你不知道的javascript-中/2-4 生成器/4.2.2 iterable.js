let a = [1,3,5,7,9];
let it = a[Symbol.iterator]();
let res = it.next();
while(!res.done) {
    console.log(res.value)
    res = it.next();
}

//
console.log('for...of');
// for...of 循环期望someThing是iterable，于是它寻找并调用它的Symbol.iterator函数
for (let v of a) {
    console.log(v)
}
