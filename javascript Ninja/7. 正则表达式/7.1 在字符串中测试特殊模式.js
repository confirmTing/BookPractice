/*
* @Author: confirmTing
* @Date:   2017-03-28 14:02:43
* @Last Modified by:   confirmTing
* @Last Modified time: 2017-03-29 11:27:48
*/

'use strict';

function isThisAZipCode(value){
	return /\d{5}-\d{4}/.test(value);
}
// console.log(isThisAZipCode("12345-6578"))
// console.log(/^test$/.test("test a"));
console.log(/[^test]/.test("test"));
console.log(/[^t]/.test("test"));
console.log(/[^test]/g.test("tat"));
// console.log(/^test/.test("test a"));
// console.log(/test$/.test("a test"));

// console.log("aaa".match(/a+/));
// console.log("aaa".match(/a+?/));
// console.log("aaa".match(/a*?/));