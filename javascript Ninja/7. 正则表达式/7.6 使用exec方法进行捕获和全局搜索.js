/*
* @Author: confirmTing
* @Date:   2017-03-29 13:34:21
* @Last Modified by:   confirmTing
* @Last Modified time: 2017-03-29 13:49:58
*/

'use strict';
var html = '<div class="test"><b>Hello</b> <i>World!</i></div>';
var reg2 = /<(\/?)(\w+)([^>]*?)>/g;
var match,num=0;
while(match = reg2.exec(html)){
	console.log(match);
	num++;
}
console.log(num);
