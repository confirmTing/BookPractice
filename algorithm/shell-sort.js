module.exports = function shellSort(gaps, array) {
  const arr = [...array];
  for (let g = 0, len = gaps.length; g < len; g++) {
    const currentGap = gaps[g];
    for (let i = currentGap, len = arr.length; i < len; i++) {
      let temp = arr[i];
      let j = i;
      for (; j >= gaps[g] && arr[j - currentGap] > temp; j -= currentGap) {
        arr[j] = arr[j - currentGap];
      }
      arr[j] = temp;
    }
  }
  return arr;
};
