/*
* @Author: confirmTing
* @Date:   2017-03-26 18:03:45
* @Last Modified by:   confirmTing
* @Last Modified time: 2017-03-26 18:16:03
*/

'use strict';

Function.prototype.curry = function(){
	var fn = this,args = [].slice.call(arguments);
	return function(){
		args = args.concat([].slice.call(arguments));
		return fn.apply(this,args);
	}
}

function test(a,b){
	return a+b;
}

var aTest = test.curry(1);

console.log(aTest(3));