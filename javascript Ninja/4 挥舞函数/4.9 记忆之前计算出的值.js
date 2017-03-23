/*
* @Author: confirmTing
* @Date:   2017-03-23 11:43:13
* @Last Modified by:   confirmTing
* @Last Modified time: 2017-03-23 13:50:35
*/

'use strict';

function isPrime(value){
	if (isNaN(+value)) {
		console.log("必须是数字");
		return;
	}
	isPrime.answers||(isPrime.answers = {});
	if (!!isPrime.answers[value]) {
		return isPrime.answers[value];
	}
	var prime = value!=1;
	for(var i=2;i<value;i++){
		if (value%i==0) {
			prime = false;
			break;
		}
	}
	return isPrime.answers[value] = prime;
}

function getPrime(start,end){
	if (isNaN(+start)||isNaN(+end)) {
		console.log("必须是数字");
		return;
	}
	getPrime.cache||(getPrime.cache={});
	var argumentStr = [].join.call(arguments,",");
	if (!!getPrime.cache[argumentStr]) {
		return getPrime.cache[argumentStr];
	}
	var arr = [];
	for(start;start<end;start++){
		if (isPrime(start)) {
			arr.push(start);
		}
	}
	return getPrime.cache[argumentStr] = arr.join(",");
}

// console.log(isPrime(12131321321323))
getPrime(3,99999)
console.log(Object.keys(getPrime.cache))
getPrime(3,"ss")
console.log(Object.keys(getPrime.cache))