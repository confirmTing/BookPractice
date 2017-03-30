/*
* @Author: confirmTing
* @Date:   2017-03-30 13:06:14
* @Last Modified by:   confirmTing
* @Last Modified time: 2017-03-30 13:23:31
*/

'use strict';
var str = "foo=1&foo=2&blah=a&foo=3&blah=b";

function compress(source){
	var reg = /([^&=]+)=([^&]*)/g;
	var result = {};
	source.replace(reg,function(all,key,val){
		result[key] = result[key]?(result[key]+","+val):val;
		return "";
	})
	var str = "";
	for(var k in result){
		if (!result.hasOwnProperty(k)) {
			continue;
		}
		str += k+"="+result[k]+"&";
	}
	str = str.slice(0,-1);
	return str;
}

console.log(compress(str));
