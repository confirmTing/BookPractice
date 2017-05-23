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

function safeAdd2(nums, cb){
    let promises = [];
    while(nums.length > 0){
        let beforeNums = nums.splice(0,10000);
        let promise = new Promise((resolve, reject) => {
            setTimeout(function() {
                resolve(cb(...beforeNums))
            }, 0);
        })
        promises.push(promise);
    }
    return promises
}

let arr1 = [], arr2 = [];
// 如果数组很大在浏览器就会报错 "RangeError:Maximum call stack size exceeded"
for(let i = 0;i<1000000;i++){
    arr1.push(i);
    arr2.push(i)
}
let beforeTime = Date.now();
let result = safeAdd(arr1, addAll);
let endTime = Date.now();
console.log(endTime - beforeTime)
console.log(result)
beforeTime = Date.now();
Promise.all(safeAdd2(arr2, addAll)).then(data => {
    let result = addAll(...data);
    endTime = Date.now();
    console.log(result)
    console.log(endTime - beforeTime)
})
