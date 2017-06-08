;
(function () {
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
        if (_.isFunction(value)) return optimizeCb.apply(null, arguments);
        if (_.isObject(value)) return _.matcher(value);
        return _.property(value);
    }

    _.iteratee = function (value, context) {
        return cb(value, context, Infinity);
    }

    // 用于创建一个新对象继承另一个对象的内部函数
    var baseCreate = function (prototype) {
        if (!_.isObject(prototype)) return {};
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
        var i = 0,
            len;
        if (isArrayLike(obj)) {
            for (len = obj.length; i < len; i++) {
                iteratee(obj[i], i, obj);
            }
        } else {
            var keys = _.keys(obj);
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
            var currentKey = keys ? keys[i] : i;
            results[i] = iteratee(obj[currentKey], currentKey, obj);
        }
        return results;
    }

    function createReduce(dir) {
        function iterator(obj, iteratee, memo, keys, index, len) {
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
        var isFunction = _.isFunction(method);
        _.map(obj, function (value) {
            var fun = isFunction ? method : value[method];
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

    // 给定一个list，和 一个用来返回一个在列表中的每个元素键 的iterator 函数（或属性名）， 返回一个每一项索引的对象。和groupBy非常像，但是当你知道你的键是唯一的时候可以使用indexBy 。
    /**
     * var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
     _.indexBy(stooges, 'age');
     => {
		"40": {name: 'moe', age: 40},
		"50": {name: 'larry', age: 50},
		"60": {name: 'curly', age: 60}
		}
     */
    _.indexBy = group(function (result, value, key) {
        result[key] = value;
    })

    // 排序一个列表组成一个组，并且返回各组中的对象的数量的计数。类似groupBy，但是不是返回列表的值，而是返回在该组中值的数目。
    /**
     * _.countBy([1, 2, 3, 4, 5], function(num) {
		return num % 2 == 0 ? 'even': 'odd';
		});
     => {odd: 3, even: 2}
     */
    _.countBy = group(function (result, value, key) {
        if (_.has(result, key)) result[key]++
        else result[key] = 1;
    })

    // 把list(任何可以迭代的对象)转换成一个数组，在转换 arguments 对象时非常有用。
    _.toArray = function (obj) {
        if (!obj) return [];
        if (_.isArray(obj)) return slice.call(obj);
        if (isArrayLike(obj)) return _.map(obj, _.identity);
        return _.values(obj);
    }

    // 返回list的长度。
    _.size = function (obj) {
        if (!obj) return 0;
        return isArrayLike(obj) ? obj.length : _.keys(obj).length;
    }

    // 拆分一个数组（array）为两个数组：  第一个数组其元素都满足predicate迭代函数， 而第二个的所有元素均不能满足predicate迭代函数。
    /**
     * _.partition([0, 1, 2, 3, 4, 5], isOdd);
     => [[1, 3, 5], [0, 2, 4]]
     */
    _.partition = function (obj, predicate, context) {
        predicate = cb(predicate);
        var pass = [],
            fail = [];
        _.each(obj, function (el, index, list) {
            (predicate(el, index, list) ? pass : fail).push(value);
        })
        return [pass, fail];
    }

    // 返回array（数组）的第一个元素。传递 n参数将返回数组中从第一个元素开始的n个元素（愚人码头注：返回数组中前 n 个元素.）。
    _.first = _.head = _.take = function (arr, n, guard) {
        if (arr == null) return myUndefined;
        if (n == null || guard) return arr[0];
        return _.initial(arr, arr.length - n);
    }

    // 返回数组中除了最后一个元素外的其他全部元素。 在arguments对象上特别有用。传递 n参数将从结果中排除从最后一个开始的n个元素（愚人码头注：排除数组后面的 n 个元素）。
    _.initial = function (arr, n, guard) {
        return slice.call(arr, 0, Math.max(0, arr.length - (n == null || guard ? 1 : n)));
    }

    // 返回array（数组）的最后一个元素。传递 n参数将返回数组中从最后一个元素开始的n个元素（愚人码头注：返回数组里的后面的n个元素）。
    _.last = function (arr, n, guard) {
        if (arr == null) return myUndefined;
        if (n == null || guard) return arr[arr.length - 1];
        return _.rest(arr, Math.max(0, arr.length - n));
    }

    // 返回数组中除了第一个元素外的其他全部元素。传递 index 参数将返回从index开始的剩余所有元素 。
    _.rest = _.tail = _.drop = function (arr, n, guard) {
        return slice.call(arr, n == null || guard ? 1 : n);
    }

    // 返回一个除去所有false值的 array副本。 在javascript中, false, null, 0, "", undefined 和 NaN 都是false值.
    _.compact = function (arr) {
        return _.filter(arr, _.identity);
    }

    var flatten = function (input, shallow, strict, startIndex) {
        var output = [],
            idx = 0;
        for (var i = startIndex || 0, len = getLength(input); i < len; i++) {
            var value = input[i];
            if (isArrayLike(value) && _.isArray(value) || _.isArguments(value)) {
                if (!shallow) value = flatten(value, shallow, strict);
                var j = 0,
                    length = value.length;
                output.length += length;
                while (j < length) {
                    output[idx++] = value[j++];
                }
            } else if (!strict) {
                output[idx++] = value;
            }
        }
        return output;
    }

    // 将一个嵌套多层的数组 array（数组） (嵌套可以是任何层数)转换为只有一层的数组。 如果你传递 shallow参数，数组将只减少一维的嵌套。
    _.flatten = function (arr, shallow) {
        return flatten(arr, shallow, false);
    }

    // 返回一个删除所有values值后的 array副本。（愚人码头注：使用===表达式做相等测试。）
    /**without(array, *values)
     * _.without([1, 2, 1, 0, 3, 1, 4], 0, 1);
     => [2, 3, 4]
     */
    _.without = function (arr) {
        return _.difference(arr, slice.call(arguments, 1));
    }

    // 返回 array去重后的副本, 使用 === 做相等测试. 如果您确定 array 已经排序, 那么给 isSorted 参数传递 true值, 此函数将运行的更快的算法. 如果要处理对象元素, 传递 iteratee函数来获取要对比的属性.
    _.uniq = function (arr, isSorted, iteratee, context) {
        if (!_.isBoolean(isSorted)) {
            context = iteratee;
            iteratee = isSorted;
            isSorted = false;
        }
        if (iteratee != null) iteratee = cb(iteratee, context);
        var result = [],
            seen = [];
        for (var i = 0, len = getLength(arr); i < len; i++) {
            var value = arr[i],
                computed = iteratee ? iteratee(value, i, arr) : value;
            if (isSorted) {
                if (!i || seen !== computed) result.push(value);
                seen = computed;
            } else if (iteratee) {
                if (!_.contains(seen, computed)) {
                    seen.push(computed);
                    result.push(value);
                }
            } else if (!_.contains(result, value)) {
                result.push(value);
            }
        }
        return result;
    }

    // 返回传入的 arrays（数组）并集：按顺序返回，返回数组的元素是唯一的，可以传入一个或多个 arrays（数组）。
    _.union = function () {
        return _.uniq(flatten(arguments, true, true));
    }

    // 返回传入 arrays（数组）交集。结果中的每个值是存在于传入的每个arrays（数组）里。
    _.intersection = function (arr) {
        var result = [],
            argLen = arguments.length;
        for (var i = 0, len = getLength(arr); i < len; i++) {
            var item = arr[i];
            if (_.contains(result, item)) continue;
            for (var j = 1; i < argLen; j++) {
                if (!_.contains(arguments[j], item)) break;
            }
            if (j === argLen) result.push(item);
        }
        return result;
    }

    // 类似于without，但返回的值来自array参数数组，并且不存在于other 数组.
    // difference(array, *others)
    _.difference = function (arr) {
        var rest = flatten(arguments, true, true, 1)
        return _.filter(arr, function (value, index) {
            return !contains(rest, value);
        })
    }

    // 将 每个arrays中相应位置的值合并在一起。在合并分开保存的数据时很有用. 如果你用来处理矩阵嵌套数组时,_.zip.apply 可以做类似的效果。
    /**zip(*arrays)
     * _.zip(['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false]);
     => [["moe", 30, true], ["larry", 40, false], ["curly", 50, false]]
     */
    _.zip = function () {
        return _.unzip(arguments);
    }

    // 与zip功能相反的函数，给定若干arrays，返回一串联的新数组，其第一元素个包含所有的输入数组的第一元素，其第二包含了所有的第二元素，依此类推。通过apply用于传递数组的数组。
    /**
     * _.unzip([['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false]])
     => ["moe", 30, true], ["larry", 40, false], ["curly", 50, false]
     */
    _.unzip = function (arr) {
        var len = arr && _.max(arr, getLength).length || 0,
            result = Array(len);
        for (var i = 0; i < len; i++) {
            result[i] = _.pluck(arr, index);
        }
        return result;
    }

    // 将数组转换为对象。传递任何一个单独[key, value]对的列表，或者一个键的列表和一个值得列表。 如果存在重复键，最后一个值将被返回。
    /**
     * _.object(['moe', 'larry', 'curly'], [30, 40, 50]);
     => {moe: 30, larry: 40, curly: 50}
     _.object([['moe', 30], ['larry', 40], ['curly', 50]]);
     => {moe: 30, larry: 40, curly: 50}
     */
    _.object = function (list, values) {
        var result = {};
        for (var i = 0, len = getLength(list); i < len; i++) {
            if (values) {
                result[list[i]] = values[i];
            } else {
                result[list[i][0]] = list[i][1];
            }
        }
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
    // 类似于_.indexOf，当predicate通过真检查时，返回第一个索引值；否则返回-1。
    _.findIndex = createPredicateIndexFinder(1);

    // 和_.findIndex类似，但反向迭代数组，当predicate通过真检查时，最接近末端的索引值将被返回。
    _.findLastIndex = createPredicateIndexFinder(-1);

    // 使用二分查找确定value在list中的位置序号，value按此序号插入能保持list原有的排序。如果提供iterator函数，iterator将作为list排序的依据，包括你传递的value 。iterator也可以是字符串的属性名用来排序(比如length)。
    /**
     * _.sortedIndex([10, 20, 30, 40, 50], 35);
     => 3
     var stooges = [{name: 'moe', age: 40}, {name: 'curly', age: 60}];
     _.sortedIndex(stooges, {name: 'larry', age: 50}, 'age');
     => 1
     */
    _.sortedIndex = function (arr, obj, iteratee, context) {
        iteratee = cb(iteratee, context);
        var value = iteratee(obj),
            low = 0,
            high = getLength(arr);
        while (low < high) {
            var mid = Math.floor((low + high) / 2);
            if (iteratee(arr[mid] < value)) low = mid + 1;
            else high = mid;
        }
        return low;
    }

    function createIndexFinder(dir, predicateFind, sortedIndex) {
        return function (arr, item, idx) {
            var i = 0,
                len = getLength(arr);
            if (typeof idx === "number") {
                if (dir > 0) {
                    i = idx >= 0 ? idx : Math.max(idx + len, i);
                } else {
                    len = idx >= 0 ? Math.min(idx + 1, len) : idx + len + 1;
                }
            } else if (sortedIndex && idx && len) {
                idx = sortedIndex(arr, item);
                return arr[idx] === item ? idx : -1;
            }
            if (item !== item) {
                idx = predicateFind(slice.call(arr, i, len), _.isNaN);
                return idx >= 0 ? idx + i : -1;
            }
            for (idx = dir > 0 ? i : len - 1; idx >= 0 && idx < len; i += dir) {
                if (arr[idx] === item) return idx;
            }
            return -1;
        }
    }

    // 返回value在该 array 中的索引值，如果value不存在 array中就返回-1。使用原生的indexOf 函数，除非它失效。
    // 如果您正在使用一个大数组，你知道数组已经排序，传递true给isSorted将更快的用二进制搜索..,或者，传递一个数字作为第三个参数，
    // 为了在给定的索引的数组中寻找第一个匹配值。
    _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);

    // 返回value在该 array 中的从最后开始的索引值，如果value不存在 array中就返回-1。如果支持原生的lastIndexOf，将使用原生的lastIndexOf函数。传递fromIndex将从你给定的索性值开始搜索。
    _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

    // 一个用来创建整数灵活编号的列表的函数，便于each 和 map循环。如果省略start则默认为 0；step 默认为 1.返回一个从start 到stop的整数的列表，
    // 用step来增加 （或减少）独占。值得注意的是，如果stop值在start前面（也就是stop值小于start值），那么值域会被认为是零长度，而不是负增长。-如果你要一个负数的值域 ，请使用负数step.
    _.range = function (start, stop, step) {
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

    var executeBound = function (sourceFun, boundFun, context, callingContext, args) {
        if (!(callingContext instanceof boundFun)) return sourceFun.apply(context, args);
        var self = baseCreate(sourceFun.prototype);
        var result = sourceFun.apply(self, args);
        if (_.isObject(result)) return result;
        return self;
    }

    // 绑定函数 function 到对象 object 上, 也就是无论何时调用函数, 函数里的 this 都指向这个 object.任意可选参数 arguments 可以传递给函数 function ,
    // 可以填充函数所需要的参数,这也被称为 partial application。对于没有结合上下文的partial application绑定，请使用partial。
    // (愚人码头注：partial application翻译成“部分应用”或者“偏函数应用”。partial application可以被描述为一个函数，它接受一定数目的参数，
    // 绑定值到一个或多个这些参数，并返回一个新的函数，这个返回函数只接受剩余未绑定值的参数。
    // bind(function, object, *arguments)
    _.bind = function (fn, context) {
        if (nativeBind && fn.bind === nativeBind) return nativeBind.apply(fn, slice.call(arguments, 1));
        if (!_.isFunction(fn)) throw new TypeError("bind must be called on a function");
        var args = slice.call(arguments, 2);
        var bound = function () {
            return executeBound(fn, bound, context, this, args.concat(slice.call(arguments)));
        }
        return bound;
    }

    // 局部应用一个函数填充在任意个数的 arguments，不改变其动态this值。和bind方法很相近。你可以传递_ 给arguments列表来指定一个不预先填充，但在调用时提供的参数。
    /**partial(function, *arguments)
     * var subtract = function(a, b) { return b - a; };
     sub5 = _.partial(subtract, 5);
     sub5(20);
     => 15
     // Using a placeholder
     subFrom20 = _.partial(subtract, _, 20);
     subFrom20(5);
     => 15
     */
    _.partial = function (fn) {
        var boundArgs = slice.call(arguments, 1);
        return function bound() {
            var position = 0,
                len = boundArgs.length,
                args = Array(len);
            for (var i = 0; i < len; i++) {
                args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
            }
            while (position < arguments.length) {
                args.push(arguments[position++]);
            }
            return executeBound(fn, bound, this, this, args);
        }
    }

    // 把methodNames参数指定的一些方法绑定到object上，这些方法就会在对象的上下文环境中执行。绑定函数用作事件处理函数时非常便利，否则函数被调用时this一点用也没有。methodNames参数是必须的。
    /**
     * var buttonView = {
		label  : 'underscore',
		onClick: function(){ alert('clicked: ' + this.label); },
		onHover: function(){ console.log('hovering: ' + this.label); }
		};
     _.bindAll(buttonView, 'onClick', 'onHover');
     // When the button is clicked, this.label will have the correct value.
     jQuery('#underscore_button').bind('click', buttonView.onClick);
     */
    _.bindAll = function (obj) {
        var i, len = arguments.length,
            key;
        if (len <= 1) throw new Error("bindAll must be passed function names");
        for (i; i < len; i++) {
            key = arguments[i];
            obj[key] = _.bind(obj[key], obj);
        }
        return obj;
    }

    // Memoizes方法可以缓存某函数的计算结果。对于耗时较长的计算是很有帮助的。
    // 如果传递了 hashFunction 参数，就用 hashFunction 的返回值作为key存储函数的计算结果。hashFunction 默认使用function的第一个参数作为key。memoized值的缓存可作为返回函数的cache属性。
    _.memoize = function (fn, haser) {
        var memoize = function (key) {
            var cache = memoize.cache;
            var address = "" + (haser ? haser.apply(this, arguments) : key);
            if (!_.has(cache, address)) cache[address] = fn.apply(this, arguments);
            return cache[address];
        }
        memoize.cache = {};
        return memoize;
    }

    // 类似setTimeout，等待wait毫秒后调用function。如果传递可选的参数arguments，当函数function执行时， arguments 会作为参数传入。
    /**delay(function, wait, *arguments)
     * var log = _.bind(console.log, console);
     _.delay(log, 1000, 'logged later');
     => 'logged later' // Appears after one second.
     */
    _.delay = function (fn, wait) {
        var args = slice.call(arguments, 2);
        return setTimeout(function () {
            return fn.apply(null, args);
        }, wait);
    }

    // 延迟调用function直到当前调用栈清空为止，类似使用延时为0的setTimeout方法。对于执行开销大的计算和无阻塞UI线程的HTML渲染时候非常有用。
    // 如果传递arguments参数，当函数function执行时， arguments 会作为参数传入。
    _.defer = _.partial(_.delay, _, 1);

    // 创建并返回一个像节流阀一样的函数，当重复调用函数的时候，至少每隔 wait毫秒调用一次该函数。对于想控制一些触发频率较高的事件有帮助。
    // 默认情况下，throttle将在你调用的第一时间尽快执行这个function，并且，如果你在wait周期内调用任意次数的函数，都将尽快的被覆盖。
    // 如果你想禁用第一次首先执行的话，传递{leading: false}，还有如果你想禁用最后一次执行的话，传递{trailing: false}。
    // throttle(function, wait, [options])
    _.throttle = function (fn, wait, options) {
        var context, args, result, timeout = null,
            previous = 0;
        if (!options) options = {};
        var later = function () {
            previous = options.leading === false ? 0 : _.now();
            timeout = null;
            result = fn.apply(context, args);
            if (!timeout) context = args = null;
        }
        return function () {
            var now = _.now();
            if (!previous && options.leading === false) previous = now;
            var remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                previous = now;
                result = fn.apply(context, args);
                if (!timeout) context = args = null;
            } else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(later, remaining);
            }
            return result;
        }
    }

    // 返回 function 函数的防反跳版本, 将延迟函数的执行(真正的执行)在函数最后一次调用时刻的 wait 毫秒之后. 对于必须在一些输入（多是一些用户操作）停止到达之后执行的行为有帮助。
    // 例如: 渲染一个Markdown格式的评论预览, 当窗口停止改变大小之后重新计算布局, 等等.
    // 传参 immediate 为 true， debounce会在 wait 时间间隔的开始调用这个函数 。（愚人码头注：并且在 waite 的时间之内，不会再次调用。）在类似不小心点了提交按钮两下而提交了两次的情况下很有用。
    _.debounce = function (fn, wait, immediate) {
        var timeout, args, context, timestamp, result;
        var later = function () {
            var last = _.now() - timestamp;
            if (last < wait && last >= 0) {
                timeout = setTimeout(later, wait - last);
            } else {
                timeout = null;
                if (!immediate) {
                    result = fn.apply(context, args);
                    if (!timeout) context = args = null;
                }
            }
        }

        return function () {
            context = this;
            args = arguments;
            timestamp = _.now();
            var callNow = immediate && !timeout
            if (!timeout) timeout = setTimeout(later, wait);
            if (callNow) {
                result = fn.apply(context, args);
                context = args = null;
            }
            return result;
        }
    }

    // 将第一个函数 function 封装到函数 wrapper 里面, 并把函数 function 作为第一个参数传给 wrapper. 这样可以让 wrapper 在 function 运行之前和之后 执行代码, 调整参数然后附有条件地执行.
    /**wrap(function, wrapper)
     * var hello = function(name) { return "hello: " + name; };
     hello = _.wrap(hello, function(func) {
		return "before, " + func("moe") + ", after";
		});
     hello();
     => 'before, hello: moe, after'
     */
    _.wrap = function (fn, wrapper) {
        return _.partial(wrapper, fn);
    }

    // 返回一个新的predicate函数的否定版本。
    /**
     * var isFalsy = _.negate(Boolean);
     _.find([-2, -1, 0, 1, 2], isFalsy);
     => 0
     */
    _.negate = function (predicate) {
        return function () {
            return !predicate.apply(this, arguments);
        }
    }

    _.compose = function () {
        var args = arguments,
            start = args.length - 1;
        return function () {
            var i = start;
            var result = args[start].apply(this, arguments);
            while (i--) {
                result = args[i].call(this, result);
            }
            return result;
        }
    }

    // 创建一个函数, 只有在运行了 count 次之后才有效果. 在处理同组异步请求返回结果时, 如果你要确保同组里所有异步请求完成之后才 执行这个函数, 这将非常有用。
    _.after = function (count, fn) {
        return function () {
            if (--count < 1) {
                return fn.apply(this, arguments);
            }
        }
    }

    // 创建一个函数,调用小于count 次。 当count已经达到时，最后一个函数调用的结果将被记住并返回。
    _.before = function (count, fn) {
        var result;
        return function () {
            if (--count > 0) {
                result = fn.apply(this, arguments);
            }
            if (count <= 1) fn = null;
            return result;
        }
    }

    // 创建一个只能调用一次的函数。重复调用改进的方法也没有效果，只会返回第一次执行时的结果。 作为初始化函数使用时非常有用, 不用再设一个boolean值来检查是否已经初始化完成.
    _.once = _.partial(_.before, 2);

    var hasEnumBug = !{
        toString: null
    }.propertyIsEnumerable("toString");
    var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

    function collectNonEnumProps(obj, keys) {
        var nonEnumIdx = nonEnumerableProps.length;
        var constructor = obj.constructor;
        var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;
        var prop = "constructor";
        if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);
        while (nonEnumIdx--) {
            prop = nonEnumerableProps[nonEnumIdx];
            if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
                keys.push(prop);
            }
        }
    }

    // 检索object拥有的所有可枚举属性的名称。
    _.keys = function (obj) {
        if (!_.isObject(obj)) return [];
        if (nativeKeys) return nativeKeys(obj);
        var keys = [];
        for (var k in obj) {
            if (_.has(obj, k)) keys.push(k);
        }
        if (hasEnumBug) collectNonEnumProps(obj, keys);
        return keys;
    }

    // 检索object拥有的和继承的所有属性的名称。
    _.allKeys = function (obj) {
        if (!_.isObject(obj)) return [];
        var keys = [];
        for (var k in obj) {
            keys.push(k);
        }
        if (hasEnumBug) collectNonEnumProps(obj, keys);
        return keys;
    }

    // 返回object对象所有的属性值。
    _.values = function (obj) {
        var keys = _.keys(obj),
            len = keys.length;
        result = Array(len);
        for (var i = 0; i < len; i++) {
            result[i] = obj[keys[i]];
        }
        return result;
    }

    // 它类似于map，但是这用于对象。转换每个属性的值。
    _.mapObject = function (obj, iteratee, context) {
        iteratee = cb(iteratee, context);
        var keys = _.keys(obj),
            len = keys.length,
            result = {},
            currentKey, i = 0;
        for (; i < len; i++) {
            currentKey = keys[i];
            result[currentKey] = iteratee(obj[currentKey], i, context);
        }
        return result;
    }

    // 把一个对象转变为一个[key, value]形式的数组。
    _.pairs = function (obj) {
        var keys = _.keys(obj),
            len = keys.length;
        result = Array(len), currentKey, i = 0;
        for (; i < len; i++) {
            currentKey = keys[i];
            result[i] = [currentKey, obj[currentKey]];
        }
        return result;
    }

    // 返回一个object副本，使其键（keys）和值（values）对换。对于这个操作，必须确保object里所有的值都是唯一的且可以序列号成字符串.
    _.invert = function (obj) {
        var keys = _.keys(obj),
            len = keys.length,
            result = {},
            currentKey;
        for (var i = 0; i < len; i++) {
            currentKey = keys[i];
            result[obj[currentKey]] = currentKey;
        }
        return result;
    }

    // 返回一个对象里所有的方法名, 而且是已经排序的 — 也就是说, 对象里每个方法(属性值是一个函数)的名称.
    _.functions = _.methods = function (obj) {
        var result = [];
        for (var k in obj) {
            if (_.isFunction(obj[k])) result.push(k);
        }
        return result.sort();
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

    // 复制source对象中的所有属性覆盖到destination对象上，并且返回 destination 对象. 复制是按顺序的, 所以后面的对象属性会把前面的对象属性覆盖掉(如果有重复).
    // extend(destination, *sources)
    _.extend = createAssigner(_.allKeys);

    // 类似于 extend, 但只复制自己的属性(不包括继承过来的属性)覆盖到目标对象。
    _.extendOwn = _.assign = createAssigner(_.keys);

    // 返回测试通过的键。或者undefined
    _.findKey = function (obj, predicate, context) {
        predicate = cb(predicate, context);
        var keys = _.keys(obj),
            key;
        for (var i = 0, len = keys.length; i < len; i++) {
            key = keys[i];
            if (predicate(obj[key], i, obj)) return key;
        }
    }

    // 返回一个object副本，只过滤出keys(有效的键组成的数组)参数指定的属性值。或者接受一个判断函数，指定挑选哪个key。
    _.pick = function (object, oiteratee, context) {
        var result = {}, obj = object,
            keys, iteratee;
        if (obj == null) return result;
        if (_.isFunction(oiteratee)) {
            keys = _.allKeys(obj);
            iteratee = optimizeCb(oiteratee, context);
        } else {
            keys = flatten(arguments, false, false, 1);
            iteratee = function (value, key, obj) {
                return key in obj;
            }
            obj = Object(obj);
        }
        for (var i = 0, len = keys.length; i < len; i++) {
            var key = keys[i];
            if (iteratee(obj[key], i, obj)) result[key] = obj[key];
        }
        return result;
    }

    // 返回一个object副本，只过滤出除去keys(有效的键组成的数组)参数指定的属性值。 或者接受一个判断函数，指定忽略哪个key。
    _.omit = function (obj, iteratee, context) {
        if (_.isFunction(iteratee)) {
            iteratee = _.negate(iteratee);
        } else {
            var keys = _.map(flatten(arguments, false, false, 1), String);
            iteratee = function (value, key) {
                return !_.contains(keys, key);
            }
        }
        return _.pick(obj, iteratee, context);
    }

    // 用defaults对象填充object 中的undefined属性。 并且返回这个object。一旦这个属性被填充，再使用defaults方法将不会有任何效果。
    _.defaults = createAssigner(_.allKeys, true);

    // 创建具有给定原型的新对象， 可选附加props 作为 own的属性。 基本上，和Object.create一样， 但是没有所有的属性描述符。
    _.create = function (prototype, props) {
        var result = baseCreate(prototype);
        if (props) _.extendOwn(result, props);
        return result;
    }

    // 用 object作为参数来调用函数interceptor，然后返回object。这种方法的主要意图是作为函数链式调用 的一环, 为了对此对象执行操作并返回对象本身。
    _.tap = function (obj, interceptor) {
        interceptor(obj);
        return obj;
    }

    // 告诉你attrs中的键和值是否包含在object中。
    _.isMatch = function (object, attrs) {
        var keys = _.keys(attrs), len = keys.length;
        if (object == null) return !len;
        var obj = Object(object);
        for (var i = 0; i < len; i++) {
            var key = keys[i];
            if (attrs[key] !== obj[key] || !(key in obj)) return false;
        }
        return true;
    }

    // 创建 一个浅复制（浅拷贝）的克隆object。任何嵌套的对象或数组都通过引用拷贝，不会复制。
    _.clone = function (obj) {
        if (!_.isObject(obj)) return obj;
        return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
    }

    var eq = function (a, b, aStack, bStack) {
        if (a === b) return a !== 0 || 1 / a === 1 / b;
        if (a == null || b == null) return a === b;
        if (a instanceof _) a = a._wrapped;
        if (b instanceof _) b = b._wrapped;
        var className = toString.call(a);
        if (className !== toString.call(b)) return false;
        switch (className) {
            case '[object RegExp]':
            case '[object String]':
                return '' + a === '' + b;
            case '[object Number]':
                return +a === 0 ? 1 / +a === 1 / +b : +a === +b;
            case '[object Date]':
            case '[object Boolean]':
                return +a === +b;
        }

        var areArrays = className === '[object Array]';
        if (!areArrays) {
            if (typeof a !== "object" || typeof b !== "object") return false;
            var aCtor = a.constructor;
            var bCtor = b.constructor;
            if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor && _.isFunction(bCtor) && bCtor instanceof bCtor) && ('constructor' in a && 'constructor' in b)) {
                return false;
            }
        }
        aStack = aStack || [];
        bStack = bStack || [];
        var len = aStack.length;
        while (len--) {
            if (aStack[len] === a) return bStack[len] === b;
        }
        aStack.push(a);
        bStack.push(b);

        if (areArrays) {
            len = a.length;
            if (len !== b.length) return false;
            while (len--) {
                if (!eq(a.length, b.length, aStack, bStack)) return false;
            }
        } else {
            var keys = _.keys(a), key;
            len = keys.length;
            if (_.keys(b).length !== len) return false;
            while (len--) {
                key = keys[len];
                if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
            }
        }
        aStack.pop();
        bStack.pop();
        return true;
    }

    // 执行两个对象之间的优化深度比较，确定他们是否应被视为相等。
    _.isEqual = function (a, b) {
        return eq(a, b);
    }

    // 如果object 不包含任何值(没有可枚举的属性)，返回true。 对于字符串和类数组（array-like）对象，如果length属性为0，那么_.isEmpty检查返回true。
    _.isEmpty = function (obj) {
        if (obj == null) return true;
        if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
        return _.keys(obj).length === 0;
    }

    // 如果object是一个DOM元素，返回true。
    _.isElement = function (obj) {
        return !!(obj && obj.nodeType === 1);
    }

    // 如果object是一个数组，返回true。
    _.isArray = nativeIsArray || function (obj) {
            return toString.call(obj) === "[object Array]";
        }

    _.isObject = function(obj){
        var type = typeof obj;
        return type === "function" || type === "object" || !!obj;
    }

    _.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"], function (name) {
        _["is" + name] = function (obj) {
            return toString.call(obj) === "[object " + name + "]";
        }
    })

    // 在浏览器中定义方法的备份版本
    if (!_.isArguments(arguments)) {
        _.isArguments = function (obj) {
            return _.has(obj, "callee");
        }
    }

    // 优化isFunction方法，对于那些老的v8环境 IE 11 (#1621), and in Safari 8 (#1929).
    if (typeof /./ != "function" && typeof Int8Array != "object") {
        _.isFunction = function (obj) {
            return typeof obj === "function";
        }
    }

    // 如果object是一个有限的数字，返回true。
    _.isFinite = function (obj) {
        return isFinite(obj) && !isNaN(parseFloat(obj));
    }

    // 如果object是 NaN，返回true。 注意： 这和原生的isNaN 函数不一样，如果变量是undefined，原生的isNaN 函数也会返回 true 。
    _.isNaN = function (obj) {
        return _.isNumber(obj) && obj !== +obj;
    }

    // 如果object是一个布尔值，返回true，否则返回false。
    _.isBoolean = function (obj) {
        return obj === true || obj === false || toString.call(obj) == "[object Boolean]";
    }

    // 如果object的值是 null，返回true。
    _.isNull = function (obj) {
        return obj === null;
    }

    // 如果value是undefined，返回true。
    _.isUndefined = function (obj) {
        return obj === myUndefined;
    }

    // 对象是否包含给定的键吗？等同于object.hasOwnProperty(key)，但是使用hasOwnProperty 函数的一个安全引用，以防意外覆盖。
    _.has = function (obj, key) {
        return obj != null && hasOwn.call(obj, key);
    }

    // 放弃Underscore 的控制变量"_"。返回Underscore 对象的引用。
    _.noConflict = function () {
        root._ = previousUnderscore;
        return this;
    }

    // 返回与传入参数相等的值. 相当于数学里的: f(x) = x
    // 这个函数看似无用, 但是在Underscore里被用作默认的迭代器iterator.
    _.identity = function (value) {
        return value;
    }

    // 创建一个函数，这个函数 返回相同的值 用来作为_.constant的参数。
    _.constant = function (value) {
        return function () {
            return value;
        }
    }

    _.noop = function () { }

    // 和_.property相反。需要一个对象，并返回一个函数,这个函数将返回一个提供的属性的值。
    /**
     * var stooge = {name: 'moe'};
     _.propertyOf(stooge)('name');
     => 'moe'
     */
    _.propertyOf = function (obj) {
        return obj == null ? function () { } : function (key) {
            return obj[key];
        }
    }

    // 返回一个断言函数，这个函数会给你一个断言可以用来辨别给定的对象是否匹配attrs指定键/值属性。
    _.matcher = _.matches = function (attrs) {
        attrs = _.extend({}, attrs);
        return function (obj) {
            return _.isMatch(obj, attrs);
        }
    }

    // 调用给定的迭代函数n次,每一次调用iteratee传递index参数。生成一个返回值的数组。
    _.times = function (n, iteratee, context) {
        var result = Array(Math.max(0, n));
        iteratee = optimizeCb(iteratee, context, 1);
        for (var i = 0; i < n; i++) {
            result[i] = iteratee(i);
        }
        return result;
    }

    _.random = function (min, max) {
        if (max == null) {
            max = min;
            min = 0;
        }
        return min + Math.floor(Math.random * (max - min + 1));
    }

    _.now = Date.now || function () {
            return new Date().getTime();
        }

    var escapeMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;"
    }

    var unescapeMap = _.invert(escapeMap);

    var createEscaper = function (map) {
        var escaper = function (match) {
            return map[match];
        }
        var source = "(?:" + _.keys(map).join("|") + ")";
        var testRegexp = RegExp(source);
        var replaceRegexp = RegExp(source, "g");
        return function (string) {
            string = string == null ? "" : "" + string;
            return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
        }
    }

    // 转义HTML字符串，替换&, <, >, ", ', 和 /字符。
    _.escape = createEscaper(escapeMap);
    // 和escape相反。转义HTML字符串，替换&, &lt;, &gt;, &quot;, &#96;, 和 &#x2F;字符。
    _.unescape = createEscaper(unescapeMap);

    // 如果指定的property 的值是一个函数，那么将在object上下文内调用它;否则，返回它。如果提供默认值，并且属性不存在，那么默认值将被返回。如果设置defaultValue是一个函数，它的结果将被返回。
    /**
     * var object = {cheese: 'crumpets', stuff: function(){ return 'nonsense'; }};
     _.result(object, 'cheese');
     => "crumpets"
     _.result(object, 'stuff');
     => "nonsense"
     _.result(object, 'meat', 'ham');
     => "ham"
     */
    _.result = function (obj, property, fallback) {
        var value = obj == null ? myUndefined : obj[property];
        if (value === myUndefined) {
            value = fallback;
        }
        return _.isFunction(value) ? value.call(obj) : value;
    }

    var idCounter = 0;

    // 为需要的客户端模型或DOM元素生成一个全局唯一的id。如果prefix参数存在， id 将附加给它。
    _.uniqueId = function (prefix) {
        var id = ++idCounter + "";
        return prefix ? prefix + id : id;
    }

    _.templateSettings = {
        evalute: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    }

    var noMatch = /(.)^/;

    var escapes = {
        "'": "'",
        '\\': '\\',
        '\r': 'r',
        '\n': 'n',
        '\u2028': 'u2028',
        '\u2029': 'u2029'
    }

    var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

    var escapeChar = function (match) {
        return '\\' + escapes[match];
    }

    /**
     * template(templateString, [settings])
     * 将 JavaScript 模板编译为可以用于页面呈现的函数, 对于通过JSON数据源生成复杂的HTML并呈现出来的操作非常有用。
     * 模板函数可以使用 <%= … %>插入变量, 也可以用<% … %>执行任意的 JavaScript 代码。 如果您希望插入一个值, 并让其进行HTML转义,请使用<%- … %>。
     * 当你要给模板函数赋值的时候，可以传递一个含有与模板对应属性的data对象 。
     * 如果您要写一个一次性的, 您可以传对象 data 作为第二个参数给模板 template 来直接呈现, 这样页面会立即呈现而不是返回一个模板函数.
     *  参数 settings 是一个哈希表包含任何可以覆盖的设置 _.templateSettings.
     * var compiled = _.template("hello: <%= name %>");
     compiled({name: 'moe'});
     => "hello: moe"
     var template = _.template("<b><%- value %></b>");
     template({value: '<script>'});
     => "<b>&lt;script&gt;</b>"
     */
    _.template = function (text, settings, oldSettings) {
        if (!settings && oldSettings) settings = oldSettings;
        settings = _.defaults({}, settings, _.templateSettings);
        var matcher = RegExp([
                (settings.escape || noMatch).source,
                (settings.interpolate || noMatch).source,
                (settings.escape || noMatch).source
            ].join("|") + "|$", "g");

        var index = 0, source = "__p+='";
        text.replace(matcher, function (match, escape, interpolate, evalute, offset) {
            source += text.slice(index, offset).replace(escaper, escapeChar);
            index = offset + match.length;
            if (escape) {
                source += "'+\n((__t=(" + escape + "))===null?'':_.escape(__t))+\n'"
            } else if (interpolate) {
                source += "'+\n((__t=(" + interpolate + "))===null?'':__t)+\n'"
            } else if (evalute) {
                source += "';\n" + evaluate + "\n__p+='";
            }
            return match;
        })
        source += "';\n";
        if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';
        source = "var __t,__p = '', __j = Array.prototype.join,print = function(){__p+__j.call(arguments,'');};\n" + source + "return __p;\n";
        try {
            var render = new Function(settings.variable || 'obj', '_', source);
        } catch (e) {
            e.source = source;
            throw e;
        }

        var template = function (data) {
            return render.call(this, data, _);
        }
        var argument = settings.variable || "obj";
        template.source = "function(" + argument + "){\n" + source + "}";
        return template;
    }

    // 返回一个封装的对象. 在封装的对象上调用方法会返回封装的对象本身, 直道 value 方法调用为止.
    _.chain = function (obj) {
        var instance = _(obj);
        instance._chain = true;
        return instance;
    }

    var result = function (instance, obj) {
        return instance._chain ? _(obj)._chain() : obj;
    }

    // 允许用您自己的实用程序函数扩展Underscore。传递一个 {name: function}定义的哈希添加到Underscore对象，以及面向对象封装。
    _.mixin = function (obj) {
        _.each(_.functions(obj), function (name) {
            var fn = _[name] = obj[name];
            _.prototype[name] = function () {
                var args = [this._wrapped];
                push.apply(args, arguments);
                return result(this, fn.apply(_, args));
            }
        })
    }

    _.mixin(_);

    _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function (name) {
        var method = ArrayProto[name];
        _.prototype[name] = function () {
            var obj = this._wrapped;
            method.apply(obj, arguments);
            if ((name === "shift" || name === "splice") && obj.length === 0) delete obj[0];
            return result(this, obj);
        }
    })

    _.each(['concat', 'join', 'slice'], function (name) {
        var method = ArrayProto[name];
        _.prototype[name] = function () {
            return result(this, method.apply(this._wrapped, arguments));
        }
    })

    _.prototype.value = function () {
        return this._wrapped;
    }

    _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

    _.prototype.toString = function () {
        return '' + this._wrapped;
    }

    if (typeof define === "function" && define.amd) {
        define('underscore', [], function () {
            return _;
        });
    }

}.call(this));