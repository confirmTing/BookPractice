let {run, request} = require('./utils');

function *foo() {
    //这里Promise是同步的现等待第一个执行完毕才执行第二个效率比较低
    try {
        let start = Date.now();
        let x = yield request('http://');
        let y = yield request('http://');
        console.log(`x的值为${x},y的值为${y},foo运行时间为${Date.now() - start}毫秒`);
    }catch (err) {
        console.log('err:', err);
    }
}

run(foo);

function *betterFoo() {
    try {
        // 这样就可以让Promise并发执行而不是等待第一个Promise决议才去执行第二个
        let start = Date.now();
        let p1 = request('http://');
        let p2 = request('http://');
        let x = yield p1;
        let y = yield p2;
        console.log(`x的值为${x},y的值为${y},betterFoo运行时间为${Date.now() - start}毫秒`);
    }catch (err) {
        console.log('err2:', err);
    }
}

function *betterFoo2() {
    try {
        // 这样就可以让Promise并发执行而不是等待第一个Promise决议才去执行第二个
        let start = Date.now();
        let [x, y] = yield Promise.all([request('http://'), request('http://')])
        console.log(`x的值为${x},y的值为${y},betterFoo2运行时间为${Date.now() - start}毫秒`);
    }catch (err) {
        console.log('err2:', err);
    }
}

//隐藏的Promise
function bar(url1, url2) {
    return Promise.all([
        request(url1),
        request(url2)
    ]);
}

function *betterFoo3() {
    try {
        let start = Date.now();
        let [x, y] = yield bar('http://', 'http://');
        console.log(`x的值为${x},y的值为${y},betterFoo3运行时间为${Date.now() - start}毫秒`);
    }catch (err) {
        console.log('err2:', err);
    }
}

run(betterFoo3);
