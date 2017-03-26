/*
* @Author: confirmTing
* @Date:   2017-03-26 17:41:40
* @Last Modified by:   confirmTing
* @Last Modified time: 2017-03-26 17:44:32
*/

'use strict';

Function.prototype.bind=function(){
	var fn = this,args = [].slice.call(arguments),obj = args.shift();
	return function(){
		fn.apply(obj,args.concat([].slice.call(arguments)));
	}
}

var testObj = {};

function test(){
	console.log(testObj === this);
}

test();

test.bind(testObj)();
