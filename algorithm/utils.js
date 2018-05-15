exports.random = function(start, end) {
  if (end === undefined) {
    end = start;
    start = 0;
  }
  const diff = end - start;

  return Math.round(Math.random() * diff + start);
};

exports.range = (rangeCount, cb) => {
  return [...Array(rangeCount - 1)].map(cb);
};

exports.swap = function swap(arr, i, j) {
  var old = arr[i];
  arr[i] = arr[j];
  arr[j] = old;
  return arr;
};

exports.arrayEqual = function(arr = [], ...args) {
  const str = arr.toString();
  return args.every((_arr, index) => {
    if (_arr.toString() === str) {
      return true;
    }
    console.log(arr, _arr, index);
    return false;
  });
};
