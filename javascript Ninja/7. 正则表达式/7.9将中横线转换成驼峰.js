/*
* @Author: x6s
* @Date:   2017-03-30 11:46:01
* @Last Modified by:   confirmTing
* @Last Modified time: 2017-03-30 13:02:48
*/

'use strict';

var str = "border-bottom-width".replace(/-(\w)/g,function(all,letter){
	console.log(arguments)
	return letter.toUpperCase();
})

console.log(str);
