//有限的参数
function onlyOne(a,b){
    return !!((a && !b) || (!a && b));
}

var a = 1;
var b = NaN;

console.log(onlyOne(a,b));
console.log(onlyOne(a,a));

//无限的参数
function onlyOneBest(...args){
    // var sum = 0;
    // args.forEach(item => {
    //    if(item) sum += item;   //过滤掉假值和NaN
    // })
    // return sum === 1;
    var result = args.reduce((prev,cur,index,arr) => {
        // console.log(prev, cur, index, arr)
        return prev + !!cur
    }, 0)
    return result === 1;
}

console.log(onlyOneBest(a,a,b))
console.log(onlyOneBest(a,b,b,b,b,b,b))
