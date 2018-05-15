const swap = require("./utils").swap;

module.exports = function bubbleSort(arg) {
  const result = [...arg];
  for (let i = arg.length; i > 1; i--) {
    for (let j = 0; j <= i; j++) {
      if (result[j] > result[j + 1]) {
        swap(result, j, j + 1);
      }
    }
  }
  return result;
};
