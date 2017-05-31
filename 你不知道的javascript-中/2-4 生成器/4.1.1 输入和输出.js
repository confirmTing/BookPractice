function *foo(x, y) {
    return x + y;
}

let iterator = foo(6, 7);
console.log(iterator)
//指示生成器从当前位置开始继续运行，停在下一个yeild处或知道生成器结束
let res = iterator.next();
//next调用的结果是一个对象，它有一个value属性，持有从*foo返回的值
console.log(res);

//迭代消息传递
function *foo2(x) {
    let y = x * (yield 'Hello');
    return y;
}
let it = foo2(6);
res = it.next();
console.log('foo2:', res);
res = it.next(7);
console.log('foo2:', res);
