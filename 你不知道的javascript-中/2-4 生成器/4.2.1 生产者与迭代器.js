let gimmeSomething = (function () {
    let nextVal;
    return function () {
        if (nextVal == null){
            nextVal = 1;
        }else{
            nextVal *= 2;
        }
        console.log(nextVal);
        return nextVal;
    }
})();

gimmeSomething();
gimmeSomething();
gimmeSomething();

//标准的迭代器接口
let someThing = (function () {
    let nextVal;
    return {
        [Symbol.iterator] () {//为for of迭代做准备
            return this;
        },
        next () {
            if (nextVal == null) {
                nextVal = 1;
            } else {
                nextVal *= 2;
            }
            console.log(nextVal);
            let done = false;
            if (nextVal > 20) {
                done = true;
            }
            return {value: nextVal, done}
        }
    }
})();
console.log('someThing...')
someThing.next();
someThing.next();
someThing.next();
// for...of 循环每次在迭代中自动调用next(),它不会向next传入任何值，并且会在接收到done:true自动停止
for(let v of someThing){}
//也可以手工循环
console.log('手工循环...');
for (let ret; (ret = someThing.next()) && !ret.done;) {
    console.log('走不到这里...');
}
