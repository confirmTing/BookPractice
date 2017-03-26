/*
* @Author: confirmTing
* @Date:   2017-03-26 22:05:11
* @Last Modified by:   confirmTing
* @Last Modified time: 2017-03-26 22:34:35
*/

'use strict';

function wrap(object,method,wrapper){
	var fn = object[method];
	object[method] = function(){
		return wrapper.apply(this,[fn.bind(this)].concat(arguments));
	}
}

var obj = {
	data:"data",
	test (){
		console.log(this.data);
		console.log("1111");
	}
}

wrap(obj,"test",function(fn){
	fn();
	console.log(arguments);
})


obj.test(1,2,3)
