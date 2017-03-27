/*
* @Author: confirmTing
* @Date:   2017-03-27 10:00:09
* @Last Modified by:   confirmTing
* @Last Modified time: 2017-03-27 10:31:24
*/

'use strict';

function Ninja(){
	this.swung = false;
}

var ninja = new Ninja();

Ninja.prototype.swingSword = function(){
	return this.swung;
}

console.log(ninja)
console.log(ninja.constructor)
console.log(ninja.swingSword())

console.log("123".constructor === String)
console.log("123" instanceof String)
