// ------------ 第一种情况 ------------

// bad
if (flag) {
  if (condition) {
    // do something
  }
} else {
  // do something
}

// good
if (!flag) {
  // do something
  return;
}
if (condition) {
  // do something
}

// ------------ 第二种情况 ------------

if (value == 0) {
  return result0;
} else if (value == 1) {
  return result1;
} else if (value == 2) {
  return result2;
}

const results = [result0, result1, result2];
// return the correct result
return results[value];

const resultMap = {
  0: 'result0',
  1: 'result1',
  2: 'result2',
}

return resultMap[key];


// ------------ 第三种情况 ------------

// bad
const month = new Date().getMonth() + 1;
if (month > 6 && month < 10) {

}

// good 函数名可以起到注释的作用
function isSumber() {
 return month > 6 && month < 10;
}

if (isSumber()) {

}
