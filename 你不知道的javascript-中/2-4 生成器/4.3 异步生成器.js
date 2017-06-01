function ajax(url, cb) {
    setTimeout(() => {
        let err = Math.random() > 0.5 ? new Error("数字太大")  : null;
        cb(err, {url});
    })
}

function foo(x, y) {
    ajax('' + x + y, (err, data) => {
        if (err) {
            it.throw(err);
        }else{
            it.next(data);
        }
    })
}

function *main() {
    try {
        let data = yield foo(11, 31);
        console.log(data);
    } catch (err) {
        console.log('err:', err);
    }
}

let it = main();
it.next();

//同步错误处理

function *main2() {
    let x = yield 'hello world!';
    console.log('x:', x);
}

let it2 = main2();
//如果生成器没有处理错误，错误就是抛到外部
try{
    it2.throw('oops');
}catch (err) {
    console.log('err2:', err);
}
