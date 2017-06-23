/*
 * @Author: x6s
 * @Date:   2017-03-30 11:46:01
 * @Last Modified by:   confirmTing
 * @Last Modified time: 2017-03-30 13:02:48
 */

'use strict';

var str = "border-bottom-width".replace(/\b(\w)|-(\w)/g, function (all, $1, $2) {
    console.log(arguments)
    return ($1 || $2).toUpperCase();
})

console.log(str);
