/*
* @Author: confirmTing
* @Date:   2017-03-26 21:32:05
* @Last Modified by:   confirmTing
* @Last Modified time: 2017-03-26 22:04:43
*/

'use strict';

Function.prototype.memorized = function(){
	console.log(this.name)
	this._values = this._values||{};
	var str = [].join.call(arguments,"");
	return this._values[str]?this._values[str]:this._values[str] = this.apply(this,arguments);
}

Function.prototype.memorize = function(){
	var fn = this;
	return function(){
		return fn.memorized.apply(fn,arguments);
	}
}

var isPrime = function(value){
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
}.memorize();

console.log(isPrime(3))
console.log(isPrime(3))
