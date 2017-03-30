/*
* @Author: confirmTing
* @Date:   2017-03-30 14:52:08
* @Last Modified by:   confirmTing
* @Last Modified time: 2017-03-30 16:20:18
*/

'use strict';
var str = '<b>Hello</b>\r\n<i>World</i>';
var reg = /.*/;
// console.log(reg.exec(str)[0]);

var reg2 = /[\s\S]*/;
var reg2 = /.*|\s*/;
console.log(reg2.exec(str)[0]);

var reg3 = /(?:.|\s)*/;
// console.log(reg3.exec(str)[0]);
