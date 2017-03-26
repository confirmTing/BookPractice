/*
* @Author: confirmTing
* @Date:   2017-03-26 18:18:24
* @Last Modified by:   confirmTing
* @Last Modified time: 2017-03-26 18:27:58
*/

'use strict';
Function.prototype.partial = function(){
	var fn = this,args = [].slice.call(arguments);
	return function(){
		var arg = 0;
		for(var i=0;i<args.length&&arg<arguments.length;i++){
			if (!args[i]) {
				args[i] = arguments[i++];
			}
		}
		return fn.apply(this,args);
	}
}

String.prototype.csv = String.prototype.split.partial(/\s*,\s*/g);

var result  = "a, b , c ".csv();
console.log(result);


var delay = setTimeout.partial(undefined,1000);

delay(function(){
	console.log("aaaaaaaaa");
})
