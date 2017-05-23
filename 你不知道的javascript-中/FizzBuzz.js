//被三整除的数字是Fizz 被五整除的数字是Buzz 都能被整除的是FizzBuzz
function fizzBuzz(){
    let result = [];
    function isThree(num){
        return num % 3 == 0;
    }
    function isF(num){
        return num % 5 == 0;
    }
    function isTAndF(num){
        return isThree(num) && isF(num);
    }
    for(var i = 0; i < 100; i++){
        if(isTAndF(i)){
            result.push("FizzBuzz");
            continue;
        }
        if(isThree(i)){
            result.push("Fizz");
            continue;
        }
        if(isF(i)){
            result.push("Buzz");
            continue;
        }
        result.push(i);
    }
    return result;
}

var result = fizzBuzz();
console.log(result)

