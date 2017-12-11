// ethan
Function.prototype.customApply = function(obj) {
  obj.constructor.prototype['_temp'] = this;
  var str = '';
  if (arguments[1]) {
    for (var i = 0; i < arguments[1].length; i++) {
      str += ',' + arguments[1][i];
    }
    str = str.slice(1);
  }
  var funStr = 'obj._temp(' + str + ')';
  var result = eval(funStr);
  delete obj.constructor.prototype._temp;
  return result;
}

Function.prototype.customCall = function(obj) {
  return this.customApply(obj, [].slice.customApply(arguments, [1]));
}

var obj = {
  a: 'aaa'
}

function printA() {
  console.log(this.a);
}

function printAll() {
  console.log(typeof arguments, arguments);
  console.log.apply(console, arguments);
}

// printA.customCall(obj);

// 燎神版
Function.prototype.customApplyLiao = function(obj) {
  obj.constructor.prototype['_temp'] = this;
  var argStr = '';
  if(arguments[1]) {
    for(var i = 0; i < arguments[1].length; i++) {
      argStr += ',arguments[1]['+i+']';
    }
    argStr = argStr.slice(1); // Use slice(1) to remove the first ','
  }
  var functionStr = 'obj._temp('+argStr+')';
  var re = eval(functionStr);
  delete obj.constructor.prototype._temp;
  return re;
}

console.log(printAll.customApplyLiao([1,2,3], [1,2,3,4]));
console.log(printAll.customApply([1,2,3], [1,2,3,4]));
