var a = [42],b = ["43"];
// 先转换类型如果出现数字则全部转成数字比较
console.log(a < b)

a = ["42"]
b = ["042"]
console.log(a < b)

a = {
    b:42
}

b = {
    b:42
}
// a和b均转化成 "[object Object]"
console.log(a < b)
console.log(a == b) //相等比较不会转换
console.log(a > b)
//<=是不大于的意思 所以 !(a < b) 所以是true
console.log(a <= b)
//同上
console.log(a >= b)

a = [42]
b = "043"
console.log(a < b)//字符串比较