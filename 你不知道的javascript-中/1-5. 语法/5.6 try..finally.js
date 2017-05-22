//finally 始终会执行先return 随后执行finally
function foo() {
    try {
        return 42;
    } finally {
        console.log("Hello")
    }
}

console.log(foo())

//如果finally抛出异常，函数终止，返回值被丢弃
foo = function() {
    try {
        return 42;
    } finally {
        throw 'oops';
    }
}

// console.log(foo())

//continue 和 break语句也是如此
for (var i = 0; i < 3; i++) {
    try {
        continue
    } finally {
        console.log(i)
    }
}

//finally返回值会覆盖try和catch中return的返回值
foo = function() {
    try{
        return 1
    } finally {
        return 2
    }
}

var bar = function () {
    try{
        throw 42
    } catch (e) {
        return 1
    } finally {
        console.log('bar')
    }
}

var baz = function () {
    try{
        throw 42
    } catch (e) {
        return 1
    } finally {
        return 2
    }
}

console.log("foo():",foo())
console.log("bar():",bar())
console.log("baz():",baz())

foo = function() {
    bar:{
        try{
            return 1
        }finally{
            break bar;
        }
    }

    console.log("break bar 跳过return语句")
}
foo()