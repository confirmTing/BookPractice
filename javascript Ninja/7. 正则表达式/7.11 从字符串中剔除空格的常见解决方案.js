/*
* @Author: confirmTing
* @Date:   2017-03-30 13:46:11
* @Last Modified by:   confirmTing
* @Last Modified time: 2017-03-30 14:12:18
*/

'use strict';

var testStr = "\r\n teestStrtestStrttStrtes \r\n";

//实现1
function trim(str){
	console.log(Date.now())
	str = str.replace(/^\s*|\s*$/g,"");
	console.log(Date.now())
	return str;
}

function trimL(str){
	return str.replace(/^\s*/,"");
}

function trimR(str){
	return str.replace(/\s*$/,"");
}

var str = trim(testStr);
// console.log();
// console.log(trimL(testStr));
// console.log(trimR(testStr));

//实现2
//针对短字符串而言较实现1更优，但是针对文档而言性能更差
function trim2(str){
	console.log(Date.now())
	str = str.replace(/^\s*/g,"").replace(/\s*$/,"");
	console.log(Date.now())
	return str;
}

//实现3
//针对短字符串性能略逊一筹，但是针对长文档性能大幅提升
function trim3(str){
	// console.log(Date.now())
	str = str.replace(/^\s*/g,"");
	var reg = /\s/,i = str.length;
	while(reg.test(str[i--]));
	// console.log(Date.now())
	return str.slice(0,i+1)
}

// trim3(testStr);