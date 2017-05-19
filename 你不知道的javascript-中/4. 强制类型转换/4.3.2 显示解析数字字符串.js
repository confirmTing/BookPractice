console.log(Number("42"))
console.log(Number("42px"))
console.log(parseInt("42"))
console.log(parseInt("42px"))
//es5 之前parseInt需要传递第二个参数否则可能会出现意想不到的bug

console.log(parseInt(1/0,19))  //18
console.log("步奏解析开始...")
console.log((1/0).toString())  //Infinity
console.log(parseInt("I",19))
console.log(parseInt("n",19))
console.log("步奏解析结束...")

//小数位7位按指数显示
//parseInt第一个参数如果不是字符串会先转换成字符串
console.log(0.000000001.toString())
console.log(parseInt(0.0000001))

