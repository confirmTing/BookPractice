var {print} = require('../../utils')
var a = 42;
var b = 'foo'
print('%s && %s 结果是%s', a , b, a&&b)

var a = 42,b;
b = (a++,a)
console.log('b:%s',b)

