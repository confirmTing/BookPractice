/*
* @Author: confirmTing
* @Date:   2017-03-23 14:58:05
* @Last Modified by:   confirmTing
* @Last Modified time: 2017-03-23 16:49:53
*/

'use strict';

function isFunction(val){
	return {}.toString.call(val) ==="[object Function]";
}

function addMethod(obj,name,fn) {
	var old = obj[name];
	if (typeof fn !=="function"||typeof obj !=="object") {
		console.err("参数错误");
		return
	}
	obj[name] = function(){
		if (fn.length === arguments.length) {
			return fn.apply(this,arguments);
		}
		return typeof old === "function"&&old.apply(this,arguments);
	}
}

let ninja = {};
addMethod(ninja,"whatever",function(){
	console.log("默认");
})
addMethod(ninja,"whatever",function(a){
	console.log(a);
})
addMethod(ninja,"whatever",function(a,b){
	console.log(a,b);
})
addMethod(ninja,"whatever",function(a,b,c){
	console.log(a,b,c);
})

ninja.whatever();
ninja.whatever("啦啦啦");
ninja.whatever("啦啦啦","b");
ninja.whatever("啦啦啦","b","c");
ninja.whatever("啦啦啦","b","c","d");

console.log(isFunction(ninja.whatever))
