var a = "42";

//这里的匹配算法与===相同
switch(a){
    case 42:
    console.log('匹配算法与===相同，这里不会运行')
    break;
    case "42":
    console.log(a)
    break;
    default:
    console.log('...')
}

// switch(true) case后可跟表达式 其实是拿表达式的结果跟true进行全等比较
switch(true){
    case a == 42:
    console.log('case 后可跟表达式')
    break
    default:
    console.log('...')
}

var a = 'hello world',b = 10;
switch(true){
    case (a || b == 10):
    console.log('never run')
    break
    case !!(a || b == 10):
    console.log('yes')
    break
    default :
    console.log('...')
}

a = 10;

switch (a) {
    case 1:
    case 2:
    default:
    console.log('default')
    // break  这里如果不加break 代码就会继续往下执行直到遇到break
    case 3:
    console.log(3)
    break
    case 4:
    console.log(4)
}
