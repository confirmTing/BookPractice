/*
* @Author: confirmTing
* @Date:   2017-03-27 11:16:14
* @Last Modified by:   confirmTing
* @Last Modified time: 2017-03-28 17:11:55
*/

'use strict';
;(function() {
	var initFlag = false,reg = /xyz/.test(function(){xyz;})?/\b_super\b/g:/.*/g;
	Object.subClass = function subClass(properties){
		var _super = this.prototype;
		initFlag = true;
		var proto = new this();
		initFlag = false;
		for(var k in properties){
			proto[k] = typeof properties[k] === "function" && typeof _super[k] === "function" && reg.test(properties[k])?
			(function(key,fn){
				return function(){
					var oldSuper = this._super;
					this._super = _super[key];
					var result = fn.apply(this,arguments);
					this._super = oldSuper;
					return result;
				}
			})(k,properties[k]):properties[k];
		}

		function Class(){
			if (!initFlag&&this.init) {
				this.init.apply(this,arguments);
			}
		}
		Class.prototype = proto;
		Class.prototype.constructor = Class;
		Class.subClass = subClass;
		return Class;
	}
})();

var Person = Object.subClass({
	init(flag){
		this.dancing = flag;
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
});

var person = new Person(true);
console.log(person.dance());
console.log(person instanceof Person);

var ninja = new Ninja();
console.log(ninja.dance());
console.log(ninja instanceof Person);
