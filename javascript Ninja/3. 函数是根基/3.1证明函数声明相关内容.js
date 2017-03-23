function test1(){
	return true;
}

console.log(test1.name)

var test2 = function(){
	return true;
}

var test3 = test1;
console.log("21:",test1.name)
console.log("22:",test3.name)
console.log(function(){}.name)

console.log(test2.name)
console.log(test3)

var obj = {};
var b = {}
obj[b] = 123;
console.log(obj)
obj.test1 = function(){}
console.log("24:",obj.test1.name)

function Ninja(){
	this.skulk = function(){return this;}
}

var whatever = Ninja();
console.log(whatever,global.skulk);

function forEach(arr,callback) {
	for (var i=0,len=arr.length;i<len;i++) {
		if(!callback.call(arr[i],arr[i],i,arr)){
			break;
		}
	}
}

var testArr = ["a","b","c"];
forEach(testArr,function(val,index){
	if (index===1) {
		return
	}
	console.log(val,"+++++++",this)
})