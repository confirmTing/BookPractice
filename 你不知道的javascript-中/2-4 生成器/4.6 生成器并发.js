let {request} = require('./utils');
let res = [];
function *reqData(url) {
    res.push(yield request(url));
}
let it1 = reqData('A');
let it2 = reqData('B');

let p1 = it1.next().value;
let p2 = it2.next().value;
//这里通过reqData生成器返回的request()的结果然后手动管理res结果的顺序
p1.then(data => {
    it1.next(data);
    return p2;
}, err => {
    console.log('err, it1:', err);
}).then(data => {
    it2.next(data);
    console.log('手动管理1：', res)
}, err => {
    console.log('err, it2:', err);
});

let res2 = [];
function *reqData2(url) {
    let data = yield request(url);
    yield;
    res2.push(data);
}

let it3 = reqData2('C');
let it4 = reqData2('D');
let p3 = it3.next().value;
let p4 = it4.next().value;
p3.then(data => {
    it3.next(data);
}, err => {
    console.log('err, it3:', err);
});
p4.then(data => {
    it4.next(data);
}, err => {
    console.log('err, it4:', err);
});

Promise.all([p3, p4]).then(() => {
    it3.next();
    it4.next();
    console.log(`手动管理2：${res2}`);
}, err => {
    console.log('err, Promise.all:', err);
});

function runAll(...gens) {
    return Promise.resolve().then(() => {
        let its = [], promises = [];
        gens.forEach((gen, index) => {
            let it = gen();
            let p = it.next().value;
            p.then(data => {
                it.next(data);
            }, err => {
                console.log(`err->${index}：${err}`);
            });
            promises.push(p);
            its.push(it);
        });
        return Promise.all(promises).then(() => {
            its.forEach(it => {
                it.next();
            })
        }, err => {
            console.log('err->Promise.all', err);
        })
    });
}

function runAll2(...gens) {
    let its = gens.map(gen => {
        return gen();
    });
    let promises = its.map(it => {
        return it.next().value;
    });
    return Promise.all(promises).then(datas => {
        its.forEach((it, i) => {
            it.next(datas[i]);
            it.next();
        })
    });
}

function testRunAll() {
    let res = [];
    runAll2(function *() {
        let data = yield request('E');
        yield;
        res.push(data);
    }, function *() {
        let data = yield request('F');
        yield;
        res.push(data);
    }).then(() => {
        console.log('testRunAll:', res);
    }, err => {
        console.log('出错啦：', err);
    })
}

testRunAll();
