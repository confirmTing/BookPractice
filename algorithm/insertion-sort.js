module.exports = function insertionSort(arr) {
  const result = [...arr];
  for (let i = 1, len = result.length; i < len; i++) {
    let temp = result[i];
    let j = i;
    while (j > 0 && result[j - 1] > temp) {
      result[j] = result[j - 1];
      j -= 1;
    }
    result[j] = temp;
  }
  return result;
};
