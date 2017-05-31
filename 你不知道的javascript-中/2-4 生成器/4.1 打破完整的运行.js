let x = 1;
function foo() {
    x++;
    bar();
    console.log(x)
}

function bar() {
    x++;
}

// foo();

function *foo2() {
    x++;
    yield;
    console.log('x:', x);
}
//这里并没有执行生成器*foo2，而是构造了一个迭代器，这个迭代器会控制他的执行
let it = foo2();
//启动了生成器，并运行了x++
it.next();
//此时*foo2在yeild处暂停，此时*foo仍是运行并且活跃的，只是处于暂停状态，这里调用bar()之后x值增加了1
bar();
//从暂停处恢复了生成器*foo的执行，并运行console.log(...)
it.next();
