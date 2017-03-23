/*
* @Author: confirmTing
* @Date:   2017-03-23 15:48:19
* @Last Modified by:   confirmTing
* @Last Modified time: 2017-03-23 15:54:09
*/

'use strict';
// 数组中每个单词，首字母大写

// 一般写法
const arr = ['apple', 'pen', 'apple-pen'];
for(const i in arr){
  const c = arr[i][0];
  arr[i] = c.toUpperCase() + arr[i].slice(1);
}

console.log(arr);

// 函数式写法一
function upperFirst(word) {
  return word[0].toUpperCase() + word.slice(1);
}

function wordToUpperCase(arr) {
  return arr.map(upperFirst);
}

console.log(wordToUpperCase(['apple', 'pen', 'apple-pen']));

// 函数式写法二
console.log([].map.call(['apple', 'pen', 'apple-pen'], word => word[0].toUpperCase() + word.slice(1)));



// 优化写法 (嗯，你没看错，这就是 lodash 的链式写法)
const utils = {
  chain(a) {
    this._temp = a;
    return this;
  },
  sum(b) {
    this._temp += b;
    return this;
  },
  sub(b) {
    this._temp -= b;
    return this;
  },
  value() {
    const _temp = this._temp;
    this._temp = undefined;
    return _temp;
  }
};

console.log(utils.chain(1).sum(2).sum(3).sub(4).value());
