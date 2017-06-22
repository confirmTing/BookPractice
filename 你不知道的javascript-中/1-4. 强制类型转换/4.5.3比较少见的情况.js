Number.prototype.valueOf = function(){
    return 3
}

console.log("new Number(2) == 3",new Number(2) == 3)
console.log("Number(2) == 3", Number(2) == 3)

//![]返回false 然后就变成了[] == false 最终返回true
console.log([] == ![])
//2 == "2"
console.log(2 == [2])
//"" == ""  [null].toStrng()返回""
console.log(String([null]))
console.log(`"" == [null]: ${"" == [null]}`)

console.log(0 == "\n")
console.log(0 == " ")
console.log(0 == " \n\t\r")

console.log(true == 'true')
console.log(Infinity == Infinity)
