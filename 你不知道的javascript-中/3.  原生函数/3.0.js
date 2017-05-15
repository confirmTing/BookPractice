var strObj = new String("smallMing");
var str = "smallMing"

console.log(strObj)
console.log(typeof strObj)            //'object'
console.log(typeof str)               // 'string'
console.log(strObj instanceof String) //true
console.log(str instanceof String)    // false
console.log({}.toString.call(strObj)) //[object String]
console.log({}.toString.call(str))    //[object String]
