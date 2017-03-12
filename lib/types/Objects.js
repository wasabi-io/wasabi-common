"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Functions_1 = require("../util/Functions");
var Type_1 = require("../lang/Type");
var Types_1 = require("../util/Types");
var Assertions_1 = require("../util/Assertions");
/**
 * A class which provides some operations on Object {@see ObjectsProps}
 * @export
 * @class Objects
 */
var Objects = (function () {
    function Objects() {
    }
    /**
     *
     * Checks the given Object (is exist or not) or (the given key is exist or not}
     * @param src {T}
     * @param key? {string}
     * @return {boolean}
     */
    Objects.has = function (src, key) {
        return Functions_1.has(src) && (Functions_1.has(key) ? src.hasOwnProperty(key) : Objects.getLength(src) > 0);
    };
    /**
     * Gets length of the given object keys
     * @param src
     * @returns {number}
     */
    Objects.getLength = function (src) {
        var i = 0;
        if (!Functions_1.has(src))
            return i;
        for (var key in src) {
            if (src.hasOwnProperty(key))
                i++;
        }
        return i;
    };
    /**
     * Removes value by the given key from the given object
     * @param src {T}
     * @param key {any}
     * @return {T}
     */
    Objects.remove = function (src, key) {
        if (!Functions_1.has(src))
            return src;
        delete src[key];
        return src;
    };
    /**
     * Removes value from the given object
     * @param src {T}
     * @param value {any}
     * @return {T}
     */
    Objects.removeValue = function (src, value) {
        if (!Functions_1.has(src))
            return src;
        for (var key in src) {
            if (src.hasOwnProperty(key)) {
                if (src[key] == value) {
                    delete src[key];
                }
            }
        }
        return src;
    };
    /**
     * Provdes to navigate in the given Object and create an array from the result of the callback function.
     * if the result of the callback is empty then ignores it.
     * @param obj
     * @param callback
     * @returns {Array<T>}
     */
    Objects.map = function (obj, callback) {
        var result = [];
        if (!obj)
            return result;
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
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
     * @param obj { T }
     * @param callback
     * @returns {boolean}
     */
    Objects.forEach = function (obj, callback) {
        if (!Functions_1.has(obj))
            return true;
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                var callbackResult = callback(obj[key], key, obj);
                if (callbackResult === false) {
                    return false;
                }
            }
        }
        return true;
    };
    /**
     * Gets keys of the given object as string[].
     * @param src {T}
     * @returns {string[]}
     */
    Objects.getKeys = function (src) {
        var keys = [];
        if (!Functions_1.has(src))
            return keys;
        for (var key in src) {
            if (src.hasOwnProperty(key))
                keys.push(key);
        }
        return keys;
    };
    /**
     * Adds value by key or keys to the given source Object
     * @param src {T}
     * @param key {string}
     * @param value {any}
     * @param keys? {string[]}
     * @return {T}
     */
    Objects.addValue = function (src, key, value, keys) {
        if (keys && keys.length > 0) {
            var prop = src[key];
            if (!Assertions_1.default.isObject(prop))
                prop = src[key] = {};
            var childKey = keys[0];
            keys.shift();
            Objects.addValue(prop, childKey, value, keys);
            keys.unshift(childKey);
        }
        else {
            src[key] = value;
        }
        return src;
    };
    /**
     * Gets value by the given key or keys from the given source object
     * @param src {T}
     * @param key {string}
     * @param keys? {string[]}
     * @returns {T}
     */
    Objects.getValue = function (src, key, keys) {
        var prop = src[key];
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
     * Clones the given source object
     * @param src {T}
     * @param ignoreList? {string[]}
     * @return {T}
     */
    Objects.clone = function (src, ignoreList) {
        return Types_1.default.getClone(src, ignoreList);
    };
    /**
     * Merges the given source object and destination object by ignoreList.
     * @param src {S}
     * @param dest {D}
     * @param ignoreList? {string[]} specifies get clone of the element by type or not clones just return its.
     * @returns {any}
     */
    Objects.merge = function (src, dest, ignoreList) {
        if (src == null)
            return dest;
        if (dest == null)
            return Objects.clone(src, ignoreList);
        if (Assertions_1.default.isObject(src)) {
            for (var key in src) {
                if (src.hasOwnProperty(key)) {
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
    /**
     * Merges the given default props and the given props
     * @param defaults {S}
     * @param props {P}
     * @return {any}
     */
    Objects.mergeDefaults = function (defaults, props) {
        if (defaults == null)
            return props;
        if (props == null)
            return Objects.clone(defaults, []);
        if (Assertions_1.default.isObject(defaults)) {
            for (var key in defaults) {
                if (defaults.hasOwnProperty(key)) {
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