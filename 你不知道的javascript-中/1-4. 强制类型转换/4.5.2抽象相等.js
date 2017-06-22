var a = "42"
var b = 42

// 如果一个是数字一个是字符串 则把字符串转换成数字然后进行比较
console.log(a == b)

c = true

//如果有一个值是布尔类型则会把布尔值转成数字然后进行比较
console.log(a == c)
console.log("1" == true)
console.log(0 == false)

a = null;
var d;
//null和undefined可以互相转化也和自身相等 且这两个值跟 "",0,false比较都返回false
console.log(a == d)
console.log(a == false)
console.log(d == false)
console.log(a == 0)
console.log(d == 0)
console.log(a == "")
console.log(d == "")

a = 42;
b = [42]
//如果一个值为对象会先把对象转换成基本类型值然后再进行比较
console.log(a == b)

//因为null和undefined没有对应的封装对象所以null和undefined不能被封装，结果和Object()返回结果相同
a = null
b = Object(a)
console.log(a == b)   // null == {}
a = undefined
b = Object(a)
console.log(a == b)   //undefined == {}

//NaN 可以被封装为数字封装对象但是NaN不等于NaN
a = NaN
b = Object(a)
console.log(a == b)  //NaN == NaN
