var obj = {
    index: 1
}
//在浏览器中可能会打印出index:2因为有些浏览器会把打印异步执行
console.log(obj)

obj.index++
