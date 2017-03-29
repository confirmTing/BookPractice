/*
* @Author: confirmTing
* @Date:   2017-03-29 13:11:40
* @Last Modified by:   confirmTing
* @Last Modified time: 2017-03-29 13:49:51
*/

'use strict';
var html = '<div class="test"><b>Hello</b> <i>World!</i></div>';
var reg1 = /<(\/?)(\w+)([^>]*?)>/;  //非全局情况下具有捕获功能
var reg2 = /<(\/?)(\w+)([^>]*?)>/g;  //全局情况下返回的是所有的匹配结果列表
var results = html.match(reg1);
console.log(results);

var results2 = html.match(reg2);
console.log(results2);