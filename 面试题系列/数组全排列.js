function arrayAll(arr) {
  let sum = 0; // 全排列个数

  // 实现两数交换
  function swap(_arr, i, j) {
    const tmp = _arr[i];
    _arr[i] = _arr[j];
    _arr[j] = tmp;
  }

  // 递归实现数组全排列并打印
  const len = arr.length;
  function permutation(array, index) {
    if (index === len) {
      sum += 1;
      // console.log(array);
      return;
    }

    for (let i = index; i < len; i++) {
      // 将第i个元素交换至当前index下标处
      swap(array, index, i);
      // 以递归的方式对剩下元素进行全排列
      permutation(array, index + 1);
      // 将第i个元素交换回原处
      swap(array, index, i);
    }
  }

  permutation(arr, 0);
  console.log(sum);
}

arrayAll([1, 2, 3, 4])
