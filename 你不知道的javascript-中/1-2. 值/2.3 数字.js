
// 2.3.4整数检测

if (!Number.isInteger){
    Number.isInteger = function(num){
        return typeof num === "number" && num % 1 === 0
    }
}

console.log(42.1 % 1)

console.log(Number.isInteger(42))
console.log(Number.isInteger(42.0))
console.log(Number.isInteger(42.1))

if (!Number.isSafeInteger) {
    Number.isSafeInteger = function (num) {
        return Math.abs(num) <= Number.MAX_SAFE_INTEGER;
    }
}