// 1:回调函数版本
function add(getX, getY, cb) {
    var x, y;
    getX(val => {
        x = val;
        if (y != null) {
            cb(x + y);
        }
    })
    getY(val => {
        y = val;
        if (x != null) {
            cb(x + y);
        }
    })
}

function getX(cb) {
    console.log('getX...');
    setTimeout(() => {
        cb(2)
    }, 500)
}

function getY(cb) {
    console.log('getY...');
    setTimeout(() => {
        cb(6)
    }, 1000)
}

add(getX, getY, sum => {
    console.log(sum);
})

// 2：Promise版本

function fetchX() {
    console.log('fetchX...')
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(2)
        }, 1500)
    })
}

function fetchY() {
    console.log('fetchY...')
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(5)
        },1000)
    })
}

function addByPromise(...args) {
    //Promise.all()也会创建一个promise,链式调用.then创建了另外一个Promise这个promise由return sun=...这一行立即决议
    return Promise.all(args).then(values => {
        return sum = values.reduce((pre, cur) => {
            console.log('当前值为：%s', cur);
            return pre + cur;
        }, 0);
    })
}
//添加的promise结果对应上面的values顺序不会改变
addByPromise(fetchX(), fetchY()).then(sum => {
    console.log(sum);
});

//.then接收两个回调函数一个是成功的回调，参数是成功的结果，一个是错误的回调，参数是失败原因
