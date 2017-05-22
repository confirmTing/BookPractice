function vowels(str){
    if(!str){
        return
    }
    var matchs = str.match(/[aeiou]/g)
    if (matchs) {
        return matchs
    }
}

console.log(vowels("hello World"))

//利用赋值表达式的副作用将两个if合并为一个
function vowels2(str) {
    var matchs;
    if (str && (matchs = str.match(/[aeiou]/g))) {
        return matchs
    }
}

console.log(vowels2("hello World"))
