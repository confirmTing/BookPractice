/*
* @Author: confirmTing
* @Date:   2017-03-29 13:50:25
* @Last Modified by:   confirmTing
* @Last Modified time: 2017-04-05 15:38:50
*/

'use strict';
var html = '<div class="test"><b>Hello</b> <i>World!</i></div>';
var html2 = '<b class="test">Hello</b> <i>World!</i>';
var reg = /<(\w+[^>]*)>(.*?)<\/\1>/g;
var reg2 = /<(\w+[^>]*)\s*(\w*[^>]*)>(.*?)<\/\1>/g;
// var match = reg.exec(html);
// var match2 = reg2.exec(html2);
// console.log(match);
// console.log(match2);
// console.log(reg2.exec(html2));

var str = "fontFamily";
str = str.replace(/([A-Z])/g,"-$1").toLowerCase();
console.log(str)