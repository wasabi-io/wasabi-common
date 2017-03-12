"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Functions_1 = require("../util/Functions");
var Type_1 = require("../lang/Type");
var Types_1 = require("../util/Types");
var Assertions_1 = require("../util/Assertions");
var hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * A class which provides some operations on Object
 * @export
 * @class Objects
 */
var Objects = (function () {
    function Objects() {
    }
    /**
     *
     * @param value
     * @return {boolean}
     */
    Objects.has = function (value) {
        return Functions_1.has(value) && Objects.getLength(value) > 0;
    };
    /**
     * gets length of the keys which are defined in the given object.
     * @param obj
     * @returns {number}
     */
    Objects.getLength = function (obj) {
        var i = 0;
        for (var key in obj) {
            if (Objects.hasProperty(obj, key))
                i++;
        }
        return i;
    };
    /**
     *
     * Checks the given given Object has key or not.
     * @param object
     * @param key
     * @returns {boolean}
     */
    Objects.hasProperty = function (object, key) {
        return hasOwnProperty.call(object, key);
    };
    /**
     * Provides to navigate in the given Object and create an array from the result of the callback function.
     * if the result of the callback is empty then ignores it.
     * @param obj
     * @param callback
     * @returns {Array<T>}
     */
    Objects.map = function (obj, callback) {
        var result = [];
        for (var key in obj) {
            if (Objects.hasProperty(obj, key)) {
                var callbackResult = callback(obj[key], key, obj);
                if (!Type_1.default.hasNot(callbackResult)) {
                    result[result.length] = callbackResult;
                }
            }
        }
        return result;
    };
    /**
     * Provides to navigate in the given Object and can broken if return false from callback function.
     * @param obj
     * @param callback
     * @returns {boolean}
     */
    Objects.forEach = function (obj, callback) {
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) {
                var callbackResult = callback(obj[key], key, obj);
                if (callbackResult === false) {
                    return false;
                }
            }
        }
        return true;
    };
    /**
     * gets keys of the given object as string[].
     * @param obj
     * @returns {string[]}
     */
    Objects.getKeys = function (obj) {
        var keys = [];
        for (var key in obj) {
            if (Objects.hasProperty(obj, key))
                keys.push(key);
        }
        return keys;
    };
    /**
     *
     * @param parentProp
     * @param key
     * @param value
     * @param keys
     */
    Objects.addValue = function (parentProp, key, value, keys) {
        if (keys && keys.length > 0) {
            var prop = parentProp[key];
            if (!Assertions_1.default.isObject(prop))
                prop = parentProp[key] = {};
            var childKey = keys[0];
            keys.shift();
            Objects.addValue(prop, childKey, value, keys);
            keys.unshift(childKey);
        }
        else {
            parentProp[key] = value;
        }
    };
    /**
     *
     * @param parentProp
     * @param key
     * @param keys
     * @returns {any}
     */
    Objects.getValue = function (parentProp, key, keys) {
        var prop = parentProp[key];
        if (prop && keys && keys.length > 0) {
            for (var i = 0; i < keys.length; i++) {
                prop = prop[keys[i]];
                if (!prop)
                    return null;
            }
        }
        return prop;
    };
    /**
     *
     * @param parentProp
     * @param key
     * @param keys
     * @returns {any}
     */
    Objects.getValueByKeys = function (parentProp, keys) {
        var prop = parentProp;
        for (var i = 0; i < keys.length; i++) {
            prop = prop[keys[i]];
            if (!prop)
                return null;
        }
        return prop;
    };
    Objects.clone = function (obj, ignoreList) {
        return Types_1.default.getClone(obj, ignoreList);
    };
    /**
     * Provides to merge src and destination by ignoreList.
     * @param src
     * @param dest
     * @param ignoreList specifies get clone of the element by type or not clones just return its.
     * @returns {any}
     */
    Objects.merge = function (src, dest, ignoreList) {
        if (src == null)
            return dest;
        if (dest == null)
            return Objects.clone(src, ignoreList);
        if (Assertions_1.default.isObject(src)) {
            for (var key in src) {
                if (Objects.hasProperty(src, key)) {
                    if (Assertions_1.default.isObject(src[key]) && Assertions_1.default.isObject(dest[key])) {
                        Objects.merge(src[key], dest[key]);
                    }
                    else {
                        dest[key] = src[key];
                    }
                }
            }
        }
        return dest;
    };
    Objects.mergeDefaults = function (defaults, props) {
        if (defaults == null)
            return props;
        if (props == null)
            return Objects.clone(defaults, []);
        if (Assertions_1.default.isObject(defaults)) {
            for (var key in defaults) {
                if (Objects.hasProperty(defaults, key)) {
                    if (props[key]) {
                        if (Assertions_1.default.isObject(defaults[key]) && Assertions_1.default.isObject(props[key])) {
                            props[key] = Objects.mergeDefaults(defaults[key], props[key]);
                        }
                    }
                    else {
                        props[key] = defaults[key];
                    }
                }
            }
        }
        return props;
    };
    return Objects;
}());
exports.default = Objects;
//# sourceMappingURL=Objects.js.map