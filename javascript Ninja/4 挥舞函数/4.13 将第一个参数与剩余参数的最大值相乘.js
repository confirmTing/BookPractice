/*
* @Author: confirmTing
* @Date:   2017-03-23 14:35:05
* @Last Modified by:   confirmTing
* @Last Modified time: 2017-03-23 14:50:01
*/

'use strict';

function multiMax() {
	return [].shift.call(arguments) * Math.max.apply(null,arguments);
}

function multiMax2(multi) {
	return multi * Math.max.apply(null,[].slice.call(arguments,1));
}

console.log(multiMax2(2,4,5,8));