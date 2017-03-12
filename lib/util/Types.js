"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Type_1 = require("../lang/Type");
var hasOwnProperty = Object.prototype.hasOwnProperty;
var UnknownType = new Type_1.default({
    hasNot: function (o) { return Type_1.default.hasNot(o); },
    isPrimitive: function () { return false; },
    isJsonType: function () { return false; },
    isNativeType: function () { return false; },
    getSize: function (o) {
        var size = 0;
        for (var key in o) {
            if (hasOwnProperty.call(o, key)) {
                size += 2 * key.length;
                size += Types.getSize(o[key]);
            }
        }
        return size;
    },
    getClone: function (o, ignoreList) {
        return o;
    }
});
/**
 * Provides most used operations on types
 */
var Types = (function () {
    function Types() {
    }
    /**
     * finds @see Type by given object
     * @param {any} o
     * @return {IType<any>} provides most used operation on type
     * @public
     */
    Types.getType = function (o) {
        var type = Types.Map[Type_1.default.getRawName(o)];
        return type ? type : UnknownType;
    };
    /**
    * finds @see Type by given name of object
     * @param {string} name
     * @return {IType<any>}
     * @public
     */
    Types.getTypeByName = function (name) {
        var type = Types.Map["[object " + name + "]"];
        return type ? type : UnknownType;
    };
    /**
     finds @see Type by given name of object
     * @param {any} o
     * @param {string[]} ignoreList
     * @returns {any}
     */
    Types.getClone = function (o, ignoreList) {
        var type = Types.getType(o);
        if (ignoreList && ignoreList.indexOf(type.getName(o))) {
            return o;
        }
        return type.getClone(o);
    };
    /**
     * gets size of the given value.
     * @param o
     * @return {number}
     */
    Types.getSize = function (o) {
        return Types.getType(o).getSize(o);
    };
    /**
     *
     * @param src
     * @param dest
     * @return {boolean}
     */
    Types.equals = function (src, dest) {
        return Types.getType(src).equals(src, dest);
    };
    /**
     * check value is empty or not by type
     * @param o
     * @return {boolean}
     */
    Types.hasNot = function (o) {
        return Types.getType(o).hasNot(o);
    };
    Types.addType = function (obj, type) {
        if (!type) {
            throw new Error("Given type ( " + type + " ) is empty or null !");
        }
        var key = typeof obj === "string" ? "[object " + obj + "]" : Type_1.default.getRawName(obj);
        var newType = Types.Map[key];
        if (newType) {
            throw new Error("You cannot add some types. That's used by core code.");
        }
        Types.Map[key] = type;
    };
    return Types;
}());
Types.Map = {};
Types.ToString = {
    Number: "[object Number]",
    Boolean: "[object Boolean]",
    Array: "[object Array]",
    String: "[object String]",
    Date: "[object Date]",
    RegExp: "[object RegExp]",
    Null: "[object Null]",
    Function: "[object Function]",
    Undefined: "[object Undefined]",
    Object: "[object Object]",
};
/**
 * gets type name of the given value.
 * @param o
 * @return {string}
 */
Types.getRawName = function (o) {
    return Type_1.default.getRawName(o);
};
/**
 * gets type name of the given value.
 * @param o
 * @return {string}
 */
Types.getName = function (o) {
    return Type_1.default.getName(o);
};
exports.default = Types;
var nullOrUndefined = new Type_1.default({
    hasNot: function () { return true; }
});
// Null Type
Types.Map[Types.ToString.Null] = nullOrUndefined;
// Undefined Type
Types.Map[Types.ToString.Undefined] = nullOrUndefined;
// Number Type
Types.Map[Types.ToString.Number] = new Type_1.default({
    getClone: function (o) {
        return Number(o);
    },
    getSize: function (o) { return 8; }
});
// Boolean Type
Types.Map[Types.ToString.Boolean] = new Type_1.default({
    getSize: function (o) { return 4; }
});
// String type
Types.Map[Types.ToString.String] = new Type_1.default({
    hasNot: function (o) { return Type_1.default.hasNot(o) || o.trim() === ""; },
    getClone: function (o) {
        return String(o);
    },
    getSize: function (o) {
        return 2 * o.length;
    }
});
// Date type
Types.Map[Types.ToString.Date] = new Type_1.default({
    isPrimitive: function () { return false; },
    isJsonType: function () { return false; },
    getClone: function (o) {
        return new Date(o.getTime());
    }
});
// Date type
Types.Map[Types.ToString.RegExp] = new Type_1.default({
    isPrimitive: function () { return false; },
    isJsonType: function () { return false; },
    getClone: function (o) {
        return new RegExp(o.source);
    }
});
// String type
Types.Map[Types.ToString.Function] = new Type_1.default({
    isPrimitive: function () { return false; },
    isJsonType: function () { return false; },
    getSize: function (o) {
        return o.toString().length * 2;
    }
});
// Array Type
Types.Map[Types.ToString.Array] = new Type_1.default({
    hasNot: function (o) { return Type_1.default.hasNot(o) || o.length === 0; },
    isPrimitive: function () { return false; },
    getClone: function (o, ignoreList) {
        var cloneArray = [];
        for (var i = 0; i < o.length; i++) {
            cloneArray[i] = Types.getClone(o[i], ignoreList);
        }
        return cloneArray;
    },
    getSize: function (o) {
        var size = 0;
        for (var i = 0; i < o.length; i++) {
            var itemSize = Types.getSize(o[i]);
            if (!Type_1.default.hasNot(itemSize)) {
                size += itemSize;
            }
        }
        return size;
    },
    equals: function (src, dest) {
        if (!src || !dest)
            return src === dest;
        var isEqual = Types.getType(src) === Types.getType(dest);
        if (!isEqual)
            return false;
        if (src.length !== dest.length)
            return false;
        for (var i = 0; i < src.length; i++) {
            var type1 = Types.getType(src[i]);
            if (!type1.equals(src[i], dest[i])) {
                return false;
            }
        }
        return true;
    }
});
Types.Map[Types.ToString.Object] = new Type_1.default({
    hasNot: function (o) {
        for (var key in o) {
            if (hasOwnProperty.call(o, key)) {
                return false;
            }
        }
        return true;
    },
    isPrimitive: function () { return false; },
    getClone: function (o, ignoreList) {
        var cloneObject = {};
        for (var key in o) {
            if (hasOwnProperty.call(o, key)) {
                cloneObject[key] = Types.getClone(o[key], ignoreList);
            }
        }
        return cloneObject;
    },
    getSize: function (o) {
        var size = 0;
        for (var key in o) {
            if (hasOwnProperty.call(o, key)) {
                size += 2 * key.length;
                size += Types.getSize(o[key]);
            }
        }
        return size;
    },
    equals: function (src, dest) {
        if (!src || !dest)
            return src === dest;
        var isEqual = Types.getType(src) === Types.getType(dest);
        if (!isEqual)
            return false;
        for (var key in src) {
            if (hasOwnProperty.call(src, key)) {
                var type1 = Types.getType(src[key]);
                if (!type1.equals(src[key], dest[key])) {
                    return false;
                }
            }
        }
        return isEqual;
    }
});
//# sourceMappingURL=Types.js.map