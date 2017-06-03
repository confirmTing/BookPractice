let {run, request} = require('./utils');
function *foo() {
    console.log('*foo starting...');
    let x = yield 2;
    let y = yield 3;
    console.log(`x:${x},y:${y}`);
    console.log('*foo finshed...');
}

function *bar() {
    console.log(yield 1);
    console.log(run(foo));
    console.log(yield 5);
}

//*bar2 把自己的迭代控制委托给了*foo
function *bar2() {
    console.log(yield 1);
    //调用foo创建了一个迭代器，然后yield *把迭代器实例控制（当前*bar生成器）委托给/转移到*foo()迭代器
    console.log('foo:', yield *foo());
    console.log(yield 5);
}
let it = bar();
let res = it.next();
// while (!res.done){
//     res = it.next(res.value);
// }

function *foo2() {
    let r1 = yield request('http://');
    return yield request(`${r1}http://`);
}

function *bar3() {
    let r1 = yield request('http://');
    let r3 = yield *foo2();
    console.log(`r1:${r1}，r3:${r3}`);
}
run(bar3);
