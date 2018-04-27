const string = 'BBC ABCDAB ABCDABCDABDE'
const p = 'ABCDABD'

const simpleStr = 'abcd';
const pStr = 'bc';

// 暴力查找
function indexOf(originStr, pStr) {
  const originStrLen = originStr.length;
  const pStrLen = pStr.length;

  for (let i = 0; i < originStrLen - pStrLen; i++) {
    let j = 0;
    for (; j < pStr.length; j++) {
      if (originStr[i + j] !== pStr[j]) {
        break;
      }
    }
    if (j === pStrLen) {
      return i;
    }
  }
  return -1;
}

console.log(indexOf(simpleStr, pStr));
console.log(indexOf(string, p));

function getFailure(pat) {
  let arr = new Array(pat.length);
  let j = 0, k = -1;
	arr[0] = -1;
	while (j < (pat.length - 1)) {
    if (k == -1 || pat[k] == pat[j]) {
      arr[++j] = ++k;
    } else {
      k = arr[k];
    }
  }
  return arr;
}

function KMP_FIND(ob, pat) {
  const n = pat.length;
  const m = ob.length;
  let f = getFailure(pat);
  let i = 0, j = 0;
	while (i < m && j < n && (m-i) >= (n-j)) {
		if(j == -1 || ob[i] == pat[j]) {
      i++;
      j++;
		} else {
      j = f[j];
    }
	}
	if(j < n) return -1;
	return i - j;
}

const index = KMP_FIND(string, p);
console.log(index);
