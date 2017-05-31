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
        [Symbol.iterator] () {
            return this;
        },
        next () {
            if (nextVal == null) {
                nextVal = 1;
            } else {
                nextVal *= 2;
            }
            console.log(nextVal);
            return {value: nextVal, done: false}
        }
    }
})();

someThing.next();
someThing.next();
someThing.next();

for(let v of someThing){
    if (v > 20) {
        break;
    }
}
