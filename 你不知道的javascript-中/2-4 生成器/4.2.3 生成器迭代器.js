//通常在实际的javascript程序中使用while...true且没有break或者return的话，但是如果有yield就完全没有问题
function *someThing() {
    let nextValue;
    while (nextValue == null || nextValue < 20) {
        if (nextValue == null) {
            nextValue = 1;
        }else{
            nextValue *= 2;
        }
        yield nextValue;
    }
}

let it = someThing();
let res = it.next();
console.log(res);
res = it.next();
console.log(res);
res = it.next();
console.log(res);
// someThing是一个生成器而不是迭代器， 我们调用生成器会返回一个迭代器，它也有一个Symbol.iterator函数，基本上这个函数做的事情就是 return this，换句话说生成器的迭代器也是一个iterable
for (let v of someThing()) {
    if (v > 10) {
        break;
    }
    console.log('v:', v);
}

//停止生成器
function *someThing2() {
    try{
        let nextValue;
        while (true) {
            if (nextValue == null) {
                nextValue = 1;
            }else{
                nextValue *= 3;
            }
            yield nextValue;
        }
    } finally {
        //执行一些清理工作
        console.log('cleaning up ...');
    }
}
//for...of循环的“异常结束”(return,break,未捕获异常)引起，会向生成器的迭代器发送一个信号使其终止
//我们也可以手工使用生成器的迭代器的return方法来实现这一点
let it2 = someThing2();
for (let v of it2) {
    console.log('v2:', v);
    if (v > 20) {
        //调用return后会立即终止生成器，然后会运行finally语句，它还会把传入的内容当作value值返回，此时done为true
        console.log(it2.return('Hello World!'));
    }
}
