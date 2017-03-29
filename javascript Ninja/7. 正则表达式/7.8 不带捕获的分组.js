/*
* @Author: confirmTing
* @Date:   2017-03-29 17:19:44
* @Last Modified by:   confirmTing
* @Last Modified time: 2017-03-29 17:36:37
*/

'use strict';

// "?:" 被动字表达式可以避免不必要的捕获

var pattern = /((?:ninja-)+)sword/;
var pattern2 = /((ninja-)+)sword/;
var str = "ninja-ninja-ninja-sword";
var ninjas = str.match(pattern);
var ninjas2 = str.match(pattern2);
console.log(ninjas);
console.log(ninjas2);
