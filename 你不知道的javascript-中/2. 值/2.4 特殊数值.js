// 2.4.2 undefined
// 在非严格模式下，我们可以为全局标识符undefined赋值
var undefined //如果不全局声明变量全局标识符undefined可以赋值但是不会被改变值
function foo(){
    undefined = 1;
    console.log(undefined)
}
console.log(undefined)
foo()
console.log(undefined)

function foo2(){
    var undefined = 2;
    console.log(undefined)
}

foo2()

// void 运算符
// void 会让表达式不返回值
console.log(void 2, 2)
// 按照惯例我们用void 0 来获得undefined

// 2.4.3 特殊的数字
// 1.NAN
var a = 2 / "foo"
var b = "foo"
console.log(isNaN(a))
console.log(isNaN(b))
console.log(Number.isNaN(a))
console.log(Number.isNaN(b))

if (!Number.isNaN) {
    Number.isNaN = function(num) {
        return typeof num === "number" && isNaN(num);
    }
}

if (!Number.isNaN) {
    Number.isNaN = function(num) {
        return num !== num;
    }
}
// 2. 无穷数
console.log(Infinity / Infinity)
console.log(1 / Infinity)
console.log(-1 / Infinity)

// 3. 零值
console.log(0 / -3)
console.log(-0 * 3)
console.log((-0).toString())
console.log((-0) + "")

function isNegZero(n) {
    n = Number(n)
    return n === 0 && (1 / n === -Infinity)
}

console.log(isNegZero(0))
console.log(isNegZero(-0))

// 2.4.4 特殊等式
console.log("------------特殊等式------------")
console.log(Object.is(a,NaN))
console.log(Object.is(-0,-0))
console.log(Object.is(-0,0))

if (!Object.is) {
    Object.is = function(a, b){
        if (a === 0 && b === 0) {
            return 1 / a === 1 / b;
        } else if (b !== b){
            return a !== a;
        } else {
            return a === b;
        }
    }
}
