/*
* @Author: confirmTing
* @Date:   2017-03-27 11:16:14
* @Last Modified by:   confirmTing
* @Last Modified time: 2017-03-27 11:45:17
*/

'use strict';
;(function(){
	var initializing = false,supperPattern = /xyz/.test(function(){xyz;})?/\b_supper\b/:/.*/;
	Object.subClass = function subClass(properties){
		var _super = this.prototype;
		initializing = true;
		var proto = new this();
		initializing = false;
		for(var key in properties){
			proto[key] = typeof properties[key] === "function" && typeof _super[key] === "function" && supperPattern.test(properties[key])?
			(function(key,fn){
				return function(){
					var tmp = this._super;
					this._super = _super[key];
					var ret = fn.apply(this,arguments);
					this._super = tmp;
					return ret;
				}
			})(key,properties[key]):properties[key];
		}

		function Class(){
			if (!initializing && this.init) {
				this.init.apply(this,arguments)
			}
		}
		Class.prototype = proto;
		Class.constructor = Class;
		Class.subClass = subClass;
		return Class;
	}
})();

var Person = Object.subClass({
	init(isDancing){
		this.dancing = isDancing;
	},
	dance(){
		return this.dancing;
	}
});

var Ninja = Person.subClass({
	init(){
		this._super(false);
	},
	dance(){
		return this._super();
	},
	swingSword(){
		return true;
	}
})
// console.log(/xyz/.test(function(){xyz;}));   //检测函数是否能序列化为字符串
var person = new Person(true);
console.log(person.dance());
var ninja = new Ninja();
console.log(ninja);

