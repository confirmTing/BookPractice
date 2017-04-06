var underscore = require("./underscore.js");
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
		console.log(rand,i)
		if (rand !== i) {
			result[i] = result[rand];
		}
		result[rand] = obj[i];
	}
	return result
}

test(3);
var max = testEach(results);
console.log(shuffle(results))
// testPush(50000000);

var hasEnumBug = { toString: null }.propertyIsEnumerable("toString");
// console.log(hasEnumBug)