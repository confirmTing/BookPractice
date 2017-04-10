var underscore = require("./myUnderscore.js");
underscore.each("123", function (el, index,list,nicai) {
	console.log(`el:${el},index:${index},${nicai}`);
});

function testPush(len) {
	var stratTime = Date.now(), endTime, results = [];
	for (var i = 0; i < len; i++) {
		results.push(i);
	}
	endTime = Date.now();
	console.log(`push运行时间：${endTime - stratTime}`);
}
var results = Array(3);
function test(len) {
	var stratTime = Date.now(), endTime;
	for (var i = 0; i < len; i++) {
		results[i] = i;
	}
	endTime = Date.now();
	console.log(`=运行时间：${endTime - stratTime}`);
}

function testEach(obj) {
	var stratTime = Date.now(), endTime,result = -Infinity,value;
	for(var i = 0;(value=obj[i++])!== undefined;){
		if (value>result) {
			result = value;
		}
	}
	endTime = Date.now();
	console.log(`Each运行时间：${endTime - stratTime}`);
	return result
}

function random (min, max) {
	if (max == null) {
		max = min;
		min = 0;
	}
	return min + Math.round(Math.random() * (max - min));
};

function shuffle(obj){
	var len = obj.length,rand,result=Array(len);
	for (var i = 0; i < len; i++) {
		rand = random(0,i)
		// console.log(rand,i)
		if (rand !== i) {
			result[i] = result[rand];
		}
		result[rand] = obj[i];
	}
	return result
}

// test(3);
// var max = testEach(results);
// console.log(shuffle(results))
// testPush(50000000);

var hasEnumBug = { toString: null }.propertyIsEnumerable("toString");
// console.log(hasEnumBug)
function initial(arr, n, guard) {
	var num = (n == null || guard ? 1 : n);
	num = Math.max(0, num);
	return [].slice.call(arr, 0, arr.length-num);
}
// console.log(initial([1,2,3,4,5],2));

var flatten = function (input, shallow, strict, startIndex) {
	var output = [], idx = 0;
	for (var i = startIndex || 0, len = input.length; i < len; i++) {
		var value = input[i];
		if ( underscore.isArray(value) || underscore.isArguments(value)) {
			if (!shallow) value = flatten(value, shallow, strict);
			var j = 0, length = value.length;
			output.length += length;
			while (j < length) {
				output[idx++] = value[j++]
			}
		} else if (!strict) {
			output[idx++] = value;
		}
	}
	return output;
}

// console.log(flatten([1,[2,3,[4,5]]],true,false));

function range(start, stop, step) {
	if (stop == null) {
		stop = start || 0;
		start = 0;
	}
	step = step || 1;
	var len = Math.max(Math.ceil((stop - start) / step), 0);
	var result = Array(len);
	for (var i = 0; i < len; i++ , start += step) {
		result[i] = start;
	}
	return result;
}

// console.log(range(0,-10,-1))

function testDefer(){
	underscore.defer(function(){
		console.log("defer");
	});
	return console.log("before");
}
// testDefer()

// console.log(underscore.pick({name: 'moe', age: 50, userid: 'moe1'}, 'name', 'age'));

console.log(underscore.isFunction(function(){}));

console.log(underscore.pick({name: 'moe', age: 50, userid: 'moe1'}, function(value, key, object) {
  return underscore.isNumber(value);
}));