// bad
for (var i = 0; i < array.length; i++) {
  // do something with array[i]
}

// better
for (var i = 0, len = array.length; i < len; i++) {
  // do something with array[i]
}

let i = array.length;
while(i--) {

}

// best，性能虽不及 for 和 while 循环，但是增强了代码的可读性
array.forEach((item) => {

});
