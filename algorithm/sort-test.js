const utils = require("./utils");
const bubbleSort = require("./bubble-sort");
const selectionSort = require("./selection-sort");
const insertionSort = require("./insertion-sort");
const shellSort = require("./shell-sort");

let arr = utils.range(10000, () => {
  return utils.random(200);
});
console.log(arr);

console.time("bubble");
const v1 = bubbleSort(arr);
console.timeEnd("bubble");

console.time("selection");
const v2 = selectionSort(arr);
console.timeEnd("selection");

console.time("insertion");
const v3 = insertionSort(arr);
console.timeEnd("insertion");

console.time("shellSort");
const v4 = shellSort([5, 3, 1], arr);
console.timeEnd("shellSort");

console.log(utils.arrayEqual(v1, v2, v3, v4));
