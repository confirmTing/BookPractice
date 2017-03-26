/*
* @Author: confirmTing
* @Date:   2017-03-26 21:20:40
* @Last Modified by:   confirmTing
* @Last Modified time: 2017-03-26 21:41:59
*/

'use strict';

Function.prototype.memory = function(){
	this._values = this._values||{};
	var str = [].slice.call(arguments).join("");
	return this._values[str]?this._values[str]:this._values[str]=this.apply(this,arguments);
}

function isPrime(value){
	if (isNaN(+value)) {
		console.log("必须是数字");
		return;
	}
	var prime = value!=1;
	for(var i=2;i<value;i++){
		if (value%i==0) {
			prime = false;
			break;
		}
	}
	return prime;
}

console.log(isPrime.memory(3))
console.log(isPrime._values)