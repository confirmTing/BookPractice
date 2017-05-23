function addAll(...args){
    let sum = 0;
    args.forEach(item => {
        sum += item;
    })
    return sum;
}

function safeAdd(nums, cb){
    try{
        return cb(...nums);
    }catch(e){
        var len = nums.length, middle = Math.floor(len / 2);
        beforeNums = nums.splice(0, middle);
        return safeAdd(beforeNums, cb) + safeAdd(nums, cb)
    }
}

let arr = [];
// 如果数组很大在浏览器就会报错 "RangeError:Maximum call stack size exceeded"
for(let i = 0;i<1000000;i++){
    arr.push(i)
}

let result = safeAdd(arr, addAll);
console.log(result)
