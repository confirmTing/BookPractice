let name = Symbol("name");
console.log(name)
console.log(name.toString())
console.log(typeof name)

let obj = {};
let getName = Symbol("getName")
obj[name] = "张三";
obj[getName] = function(){
    return this[name]
}
console.log(Object.getOwnPropertySymbols(obj));
console.log(obj[getName]())

console.log(String(42))
console.log(String(function(){}))

let obj1 = {
    valueOf(){
        return "123"
    }
}
console.log(Number(obj1)+1)