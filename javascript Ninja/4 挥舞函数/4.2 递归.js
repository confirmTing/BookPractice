/*
* @Author: confirmTing
* @Date:   2017-03-20 15:34:04
* @Last Modified by:   confirmTing
* @Last Modified time: 2017-03-23 17:15:47
*/

'use strict';

var chirp = function(n){
	return n>1?chirp(--n)+"-chirp":"chirp";
	// return n>1?arguments.callee(--n)+"-chirp":"chirp";
}
console.log(chirp(3));

var ninja = {
	chirp:function chirp(n){
		return n>1?chirp(--n)+"-chirp":"chirp";
	}
}

console.log(ninja.chirp(3));
var samural = {
	chirp:ninja.chirp,
}
ninja = {}
console.log(samural.chirp)