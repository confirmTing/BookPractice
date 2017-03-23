/*
* @Author: confirmTing
* @Date:   2017-03-20 16:09:57
* @Last Modified by:   confirmTing
* @Last Modified time: 2017-03-20 16:14:18
*/

'use strict';

var store = {
	id:1,
	cache:{},
	add:function(fn){
		if (!!fn.id) {
			return console.log("函数已经添加过了")
		}
		fn.id = this.id++;
		this.cache[fn.id] = fn;
		console.log("添加成功");
	}
}

function test(){}

store.add(test);
store.add(test);

console.log(test.id);
console.dir(store)