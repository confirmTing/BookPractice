/*
* @Author: confirmTing
* @Date:   2017-03-28 17:15:29
* @Last Modified by:   confirmTing
* @Last Modified time: 2017-03-28 17:19:09
*/

'use strict';

var reg = /<(\w+)>(.*)<\/\1>/;

var result = "<strong>123</strong>".match(reg);
console.log(result);
