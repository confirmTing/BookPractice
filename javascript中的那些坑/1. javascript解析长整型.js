/*
 * @Author: confirmTing
 * @Date:   2017-03-31 10:48:02
 * @Last Modified by:   confirmTing
 * @Last Modified time: 2017-03-31 10:50:58
 */

'use strict';

var obj = {
	num: 160811004938657922,
	num2: 1608110049386579222,
}
var str = JSON.stringify(obj);
console.log(str);

var str2 = '{"num":160811004938657922,"num2":1608110049386579222}';
// str2 = str2.replace(/:(\d{17,})/g,function(all,value){
// 	// console.log(arguments);
// 	return ":\""+value+"\"";
// })
str2 = str2.replace(/:(\d{17,})/g, ":\"$1\"");
console.log(str2);
var obj2 = JSON.parse(str2);
console.log(obj2);
