var a = "42";
var b = "0";
var c = 42;
var d = 0;
console.log(a+b)
console.log(c+d)

a = [1,2];
b = [3,4];
console.log(a+b)

a = [] + {};
b = {} + []; //在浏览器控制台打印会打印0 前面的{}被当作是代码块 返回的结果是 +[]
console.log(a);
console.log(b);

a = {
    valueOf () {
        return 42
    },
    toString(){
        return 4
    }
}

console.log(a + "")  // 隐式强制类型转换会先调用对象的valueOf方法
console.log(String(a))  //显式强制类型转换会直接调用对象的toString方法

a = "3.14";
b = 0;
console.log(a-b)

a = [3]
b = [2]
console.log(a-b)  //这里a和b首先会被转换成字符串然后在转换成数字