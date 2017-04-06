; (function () {
	var root = this,
		previousUnderscore = this._,
		ArrayProto = Array.prototype,
		ObjProto = Object.prototype,
		FunProto = Function.prototype,
		push = ArrayProto.push,
		slice = ArrayProto.slice,
		toString = ObjProto.toString,
		hasOwn = ObjProto.hasOwnProperty,
		nativeIsArray = Array.isArray,
		nativeKeys = Object.keys,
		nativeBind = FunProto.bind,
		nativeCreate = Object.create;

	// 代理原型交换的裸函数引用
	// Naked function reference for surrogate-prototype-swapping.
	var Ctor = function () { };

	// 为下面的Underscore创建一个安全引用。
	// Create a safe reference to the Underscore object for use below.
	var _ = function (obj) {
		if (obj instanceof _) return obj;
		if (!(this instanceof _)) return new _(obj);
		this._wrapped = obj;
	};

	if (typeof exports !== "undefined") {
		if (typeof module !== "undefined") {
			// 导出Underscre到Node.js
			exports = module.exports = _;
		}
		// 兼容旧的require() API
		exports._ = _;
	} else {
		// 浏览器环境添加全局Underscore
		root._ = _;
	}

	var myUndefined = void 0;
	// 添加版本号
	_.VERSION = "1.8.3";

	var optimizeCb = function (fn, context, argCount) {
		if (context === myUndefined) return fn;
		switch (argCount == null ? 3 : argCount) {
			case 1:
				return function (value) {
					return fn.call(context, value);
				};
			case 2:
				return function (value, other) {
					return fn.call(context, value, other);
				};
			case 3:
				return function (value, index, collection) {
					return fn.call(context, value, index, collection);
				};
			case 4:
				return function (accumulator, value, index, collection) {
					return fn.call(context, accumulator, value, index, collection);
				};
		}
		return function () {
			fn.apply(context, arguments);
		}
	};

	var cb = function (value, context, argCount) {
		if (value == null) return _.identity;
		if (_.isFun(value)) return optimizeCb.apply(null, arguments);
		if (_.isObj(value)) return _.matcher(value);
		return _.property(value);
	}

	_.iteratee = function (value, context) {
		return cb(value, context, Infinity);
	}

	//创建内部函数分配器
	var createAssigner = function (keysFun, undefinedOnly) {
		return function (obj) {
			var length = arguments.length;
			if (length < 2 || obj == null) return obj;
			for (var index = 0; index < length; index++) {
				var source = arguments[index],
					keys = keysFun(source),
					len = keys.length;
				for (var i = 0; i < len; i++) {
					var key = keys[i];
					if (!undefinedOnly || obj[key] === myUndefined) obj[key] = source[key];
				}
			}
			return obj;
		}
	}

	// 用于创建一个新对象继承另一个对象的内部函数
	var baseCreate = function (prototype) {
		if (!_.isObj(prototype)) return {};
		if (nativeCreate) return nativeCreate(prototype);
		Ctor.prototype = prototype;
		Ctor.constructor = Ctor;
		var result = new Ctor();
		Ctor.prototype = null;
		Ctor.constructor = null;
		return result;
	}

	_.property = function (key) {
		return function (obj) {
			return obj ? obj[key] : myUndefined;
		}
	}

	var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
	var getLength = _.property("length");

	var isArrayLike = function (collection) {
		var length = getLength(collection);
		return typeof length === "number" && length >= 0 && length <= MAX_ARRAY_INDEX;
	}

	_.each = _.forEach = function (obj, iteratee, context) {
		iteratee = optimizeCb(iteratee, context);
		var i, len;
		if (isArrayLike(obj)) {
			for (len = obj.length; i < len; i++) {
				iteratee(obj[i], i, obj);
			}
		} else {
			var keys = nativeKeys(obj);
			for (len = keys.length; i < len; i++) {
				iteratee(obj[keys[i]], keys[i], obj);
			}
		}
		return obj;
	}

	_.map = _.collect = function (obj, iteratee, context) {
		iteratee = cb(iteratee, context);
		var keys = !isArrayLike(obj) && _.keys(obj),
			len = (keys || obj).length,
			results = Array(len);
		for (var i = 0; i < len; i++) {
			var currentKey = keys ? keys[i] : index;
			results[index] = iteratee(obj[currentKey], currentKey, obj);
		}
		return results;
	}

	function createReduce(dir) {
		function iterator(obj, iteratee, memo, keys, index, length) {
			for (; index >= 0 && index < len; index += dir) {
				var currentKey = keys ? keys[index] : index;
				memo = iteratee(memo, obj[currentKey], currentKey, obj);
			}
			return memo;
		}

		return function (obj, iteratee, memo, context) {
			iteratee = optimizeCb(iteratee, context, 4);
			var keys = !isArrayLike(obj) && _.keys(obj),
				len = (keys || obj).length,
				index = dir > 0 ? 0 : len - 1;
			if (arguments.length < 3) {
				memo = obj[keys ? keys[index] : index];
				index += dir;
			}
			return iterator(obj, iteratee, memo, keys, index, len);
		}
	}

	_.reduce = _.flodl = _.inject = createReduce(1);
	_.reduceRight = _.flodr = createReduce(-1);

	_.find = _.detect = function (obj, predicate, context) {
		var key;
		if (isArrayLike(obj)) {
			key = _.findIndex(obj, predicate, context);
		} else {
			key = _.findKey(obj, predicate, context);
		}
		if (key !== myUndefined && key !== -1) return obj[key];
	}

	_.filter = _.select = function (obj, predicate, context) {
		predicate = cb(predicate, context);
		var results = [];
		_.each(obj, function (val, index, list) {
			if (predicate(val, index, list)) results.push(val);
		})
		return results;
	}

	_.reject = function (obj, predicate, context) {
		return _.filter(obj, _.negate(cb(predicate)), context)
	}

	// 确定所有元素是否匹配
	_.every = _.all = function (obj, predicate, context) {
		predicate = cb(predicate);
		var keys = !isArrayLike(obj) && _.keys(obj),
			len = (keys || obj).length;
		for (var i = 0; i < len; i++) {
			var currentKey = keys ? keys[i] : i;
			if (!predicate(obj[currentKey], i, obj)) return false;
		}
		return true;
	}

	// 至少有一个元素匹配
	_.some = _.any = function (obj, predicate, context) {
		predicate = cb(predicate);
		var keys = !isArrayLike(obj) && _.keys(obj),
			len = (keys || obj).length;
		for (var i = 0; i < len; i++) {
			var currentKey = keys ? keys[i] : i;
			if (predicate(obj[currentKey], i, obj)) return true
		}
		return false
	}

	// 确定数组或对象是否包含一个给定的项目
	_.contains = _.includes = _.include = function (obj, item, fromIndex, guard) {
		if (!isArrayLike(obj)) obj = _.values(obj);
		if (typeof fromIndex !== "number" || guard) fromIndex = 0;
		return _.indexOf(obj, item, fromIndex) > -1;
	}

	// 执行list中每个item 的 method方法
	// 调用集合中的每个项的方法（带参数）
	_.invoke = function (obj, method) {
		var args = slice.call(arguments, 2);
		var isFun = _.isFun(method);
		_.map(obj, function (value) {
			var fun = isFun ? method : value[method];
			return fun === null ? fun : fun.apply(value, args);
		})
	}

	// “map”的常用案例：获取属性的方便版本
	// pluck也许是map最常使用的用例模型的简化版本，即萃取数组对象中某属性值，返回一个数组。
	/*var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
	_.pluck(stooges, 'name');
	=> ["moe", "larry", "curly"]*/
	_.pluck = function (obj, key) {
		return _.map(obj, _.property(key));
	}

	// 遍历list中的每一个值，返回一个数组，这个数组包含attrs所列出的属性的所有的 键 - 值对。
	_.where = function (obj, attrs) {
		return _.filter(obj, _.matcher(attrs));
	}

	// 遍历整个list，返回匹配 attrs参数所列出的所有 键 - 值 对的第一个值。
	_.findWhere = function (obj, attrs) {
		return _.find(obj, _.matcher(attrs));
	}

	// 返回list中的最大值。如果传递iteratee参数，iteratee将作为list中每个值的排序依据。如果list为空，将返回-Infinity，所以你可能需要事先用isEmpty检查 list 。
	_.max = function (obj, iteratee, context) {
		var result = -Infinity,
			lastComputed = -Infinity,
			value, computed;
		if (iteratee == null && obj != null) {
			obj = isArrayLike(obj) ? obj : _.values(obj);
			for (var i = 0, len = obj.length; i < length; i++) {
				value = obj[i];
				if (value > result) {
					result = value;
				}
			}
		} else {
			iteratee = cb(iteratee, context);
			_.each(obj, function (el, index, list) {
				computed = iteratee(el, index, list);
				if (computed > lastComputed || result === -Infinity && lastComputed === -Infinity) {
					result = el;
					lastComputed = computed;
				}
			})
		}
		return result;
	}

	_.min = function (obj, iteratee, context) {
		var result = Infinity,
			lastComputed = Infinity,
			value, result;
		if (iteratee == null && obj != null) {
			obj = isArrayLike(obj) ? obj : _.values(obj);
			for (var i = 0, len = obj.length; i < len; i++) {
				value = obj[i];
				if (result > value) {
					result = value;
				}
			}
		} else {
			iteratee = cb(iteratee, context);
			_.each(obj, function (el, index, list) {
				computed = iteratee(el, index, list);
				if (computed < lastComputed || result === Infinity && lastComputed === Infinity) {
					lastComputed = computed;
					result = value;
				}
			})
		}
		return result;
	}

	// 洗牌
	_.shuffle = function (obj) {
		var set = isArrayLike(obj) ? obj : _.values(obj),
			len = set.length,
			result = Array(length),
			rand;
		for (var i = 0; i < len; i++) {
			rand = _.random(0, i);
			if (rand !== i) result[i] = result[rand];
			result[rand] = set[i];
		}
		return result;
	}

	// 从 list中产生一个随机样本。传递一个数字表示从list中返回n个随机元素。否则将返回一个单一的随机项。
	_.sample = function (obj, n, guard) {
		if (n == null || guard) {
			if (!isArrayLike(obj)) obj = _.values(obj);
			return obj[_.random(obj.length - 1)];
		}
		return _.shuffle(obj).slice(0, Math.max(0, n));
	}

	// 返回一个排序后的list拷贝副本。如果传递iteratee参数，iteratee将作为list中每个值的排序依据。迭代器也可以是字符串的属性的名称进行排序的(比如 length)。
	_.sortBy = function (obj, iteratee, context) {
		iteratee = cb(iteratee, context);
		return _.pluck(_.map(obj, function (el, index, list) {
			return {
				value: el,
				index: index,
				criteria: iteratee(el, index, list)
			}
		}).sort(function (left, right) {
			var a = left.criteria,
				b = right.criteria;
			if (a !== b) {
				if (a > b || a === myUndefined) return 1;
				if (a < b || b === myUndefined) return -1;
			}
			return left.index - right.index;
		}), "value");
	}

	var group = function (behavior) {
		return function (obj, iteratee, context) {
			var result = {};
			iteratee = cb(iteratee, context);
			_.each(obj, function (el, index) {
				var key = iteratee(el, index, obj);
				behavior(result, el, key);
			})
			return result;
		}
	}

	// 把一个集合分组为多个集合，通过 iterator 返回的结果进行分组. 如果 iterator 是一个字符串而不是函数, 那么将使用 iterator 作为各元素的属性名来对比进行分组.
	/**
	 * _.groupBy([1.3, 2.1, 2.4], function(num){ return Math.floor(num); });
		=> {1: [1.3], 2: [2.1, 2.4]}

		_.groupBy(['one', 'two', 'three'], 'length');
		=> {3: ["one", "two"], 5: ["three"]}
	 */
	_.groupBy = group(function (result, value, key) {
		if (_.has(result, key)) result[key].push(value);
		else result[key] = [value];
	})

	_.random = function (min, max) {
		if (max == null) {
			max = min;
			min = 0;
		}
		return min + Math.floor(Math.random * (max - min + 1));
	}

	function createPredicateIndexFinder(dir) {
		return function (arr, predicate, context) {
			predicate = cb(predicate, context);
			var len = getLength(arr),
				index = dir > 0 ? 0 : len - 1;
			for (; index >= 0 && index < len; index += dir) {
				if (predicate(arr[index], index, arr)) return index;
			}
			return -1;
		}
	}
	_.findIndex = createPredicateIndexFinder(1);
	_.findLastIndex = createPredicateIndexFinder(-1);

	var hasEnumBug = !{ toString: null }.propertyIsEnumerable("toString");
	var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

	function collectNonEnumProps(obj, keys) {
		var nonEnumIdx = nonEnumerableProps.length;
		var constructor = obj.constructor;
		var proto = (_.isFun(constructor) && constructor.prototype) || ObjProto;
		var prop = "constructor";
		if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);
		while (nonEnumIdx--) {
			prop = nonEnumerableProps[nonEnumIdx];
			if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
				keys.push(prop);
			}
		}
	}

	_.keys = function (obj) {
		if (!_.isObj(obj)) return [];
		if (nativeKeys) return nativeKeys(obj);
		var keys = [];
		for (var k in obj) {
			if (_.has(obj, k)) keys.push(k);
		}
		if (hasEnumBug) collectNonEnumProps(obj, keys);
		return keys;
	}

	_.findKey = function (obj, predicate, context) {
		predicate = cb(predicate, context);
		var keys = _.keys(obj);
	}
}.call(this));

