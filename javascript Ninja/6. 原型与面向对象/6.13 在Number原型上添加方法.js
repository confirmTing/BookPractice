/*
* @Author: confirmTing
* @Date:   2017-03-27 11:01:51
* @Last Modified by:   confirmTing
* @Last Modified time: 2017-03-27 11:03:26
*/

'use strict';

Number.prototype.add = function(n){
	return this + n;
}
var n = 5;
console.log(n.add(2));
// console.log(1.add(2));  //会报错
console.log((1).add(2));