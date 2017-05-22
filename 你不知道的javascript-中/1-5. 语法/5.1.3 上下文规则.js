function bar(params) {
    return "42"
}

//标签语句  continue foo的意思是执行foo循环的下一轮循环
foo: for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
        if (j === i) {
            continue foo;
        }
        if (i * j % 2 == 1) {
            continue;
        }
        console.log(i, j)
    }
}

console.log("--------------------------------break foo Start--------------------------------")
// break foo 是跳出foo所在的循环的意思
foo: for (var i = 1; i < 4; i++) {
    for (var j = 1; j < 4; j++) {
        if (i * j > 3) {
            console.log('停止：%s*%s',i,j)
            break foo;
        }
        console.log(i ,j)
    }
}
console.log("--------------------------------break foo End--------------------------------")

var a,b,c;
if (a) {
    
} else if (b) {
    
}else{

}
//上述代码其实就是为了简化if else实际是下面这样的

if (a) {
    
} else {
    if (b) {
        
    } else {
        
    }
}