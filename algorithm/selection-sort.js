const swap = require("./utils").swap;

module.exports = function selectionSort(arr) {
  const result = [...arr];
  for (let i = 0, len = arr.length; i < len - 1; i++) {
    let small = i;
    for (let j = i + 1; j < len; j++) {
      if (result[j] < result[small]) {
        small = j;
      }
    }
    swap(result, i, small);
  }
  return result;
};
