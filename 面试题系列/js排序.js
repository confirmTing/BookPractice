// 冒泡排序
function sort(obj) {
    obj = Object.assign([], obj);
    let i = 0, len = obj.length;
    for (; i < len - 1; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            if (obj[j] > obj[j + 1]) {
                let v = obj[j];
                obj[j] = obj[j + 1];
                obj[j + 1] = v;
            }
        }
    }
    return obj;
}

let arr = [4, 2, 1];

console.log(sort(arr));

// 快速排序
function quickSort(obj) {
    if (obj.length <= 1) {
        return obj;
    }
    let pivotIndex = Math.floor(obj.length / 2);
    let pivot = obj.splice(pivotIndex, 1)[0];
    let left = [], right = [];
    obj.forEach(v => {
        if (v < pivot) {
            left.push(v);
        } else {
            right.push(v);
        }
    })
    return quickSort(left).concat([pivot], quickSort(right));
}

console.log(quickSort(arr));
