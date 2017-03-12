"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Functions_1 = require("../util/Functions");
/**
 * A class which provides some operations on String
 * @export
 * @class Strings
 */
var Strings = (function () {
    function Strings() {
    }
    /**
     * Checks the given array is exist or not or index is exist or not.
     * @param src {string}
     * @param index? { number }
     * @return {boolean}
     */
    Strings.has = function (src, index) {
        if (!Functions_1.has(src))
            return false;
        src = src.trim();
        return ((Functions_1.has(index) && src.length > index) || src.length > 0);
    };
    /**
     * Gets length of the given value {string}.
     * @param value
     * @returns {number}
     */
    Strings.getLength = function (value) {
        return Strings.has(value) ? value.length : 0;
    };
    /**
     * Returns toString of the given value {string}
     * @param value
     * @return {any}
     */
    Strings.toString = function (value) {
        if (value === null || value === undefined)
            return "";
        return value.toString();
    };
    /**
     * Returns toString of the given value {string}
     * Determines whether a string begins with the characters of another string, returning true or false as appropriate.
     * @param value
     * @param searchString
     * @param position
     * @return {boolean}
     */
    Strings.startsWith = function (value, searchString, position) {
        if (!value || !searchString || value.length < searchString.length) {
            return false;
        }
        position = position || 0;
        return value.substr(position, searchString.length) === searchString;
    };
    /**
     * Determines whether a string ends with the characters of another string, returning true or false as appropriate.
     * @param value
     * @param searchString
     * @param position
     * @return {boolean}
     */
    Strings.endsWith = function (value, searchString, position) {
        if (!value || !searchString || value.length < searchString.length) {
            return false;
        }
        position = position || value.length;
        return value.substring(position - searchString.length, position) === searchString;
    };
    /**
     * Trims space from both side of the given value {string}
     * @param value
     * @return {string}
     */
    Strings.trim = function (value) {
        if (!value)
            return "";
        return value.replace(/^\s+|\s+$/g, "");
    };
    /**
     * Trims space from left side of the given value {string}
     * @param value
     * @return {string}
     */
    Strings.lTrim = function (value) {
        if (!Functions_1.has(value))
            return "";
        return value.replace(/^\s+/, "");
    };
    /**
     * Trims space from right side of the given value {string}
     * @param value
     * @return {string}
     */
    Strings.rTrim = function (value) {
        if (!Functions_1.has(value))
            return "";
        return value.replace(/\s+$/, "");
    };
    /**
     * Changes first character as uppercase character of the given value {string}
     * @param value {string}
     * @return {string}
     */
    Strings.capitalizeFirstLetter = function (value) {
        if (!Functions_1.has(value))
            return "";
        return value.charAt(0).toUpperCase() + value.slice(1);
    };
    /**
     * Puts the given pad {string} by (the given value minus the given length) from left side of the given value {string}
     * @param value {string}
     * @param pad {string}
     * @param length {number}
     * @return {string}
     */
    Strings.lPad = function (value, pad, length) {
        if (!Strings.has(value))
            value = "";
        while (value.length < length)
            value = pad + value;
        return value;
    };
    /**
     * Puts the given pad {string} by (the given value minus the given length) from right side of the given value {string}
     * @param value {string}
     * @param pad {string}
     * @param length {number}
     * @return {string}
     */
    Strings.rPad = function (value, pad, length) {
        if (!Strings.has(value))
            value = "";
        while (value.length < length)
            value = value + pad;
        return value;
    };
    /**
     * Splits the given value {string} by the given length as equals parts.
     * @param value
     * @param length
     * @return {any}
     */
    Strings.partsByNumber = function (value, length) {
        if (!Strings.has(value))
            return [];
        if (value.length < length)
            return [value];
        var values = [];
        var start = 0;
        while (start < value.length) {
            values.push(value.substring(start, start + length));
            start = start + length;
        }
        return values;
    };
    return Strings;
}());
exports.default = Strings;
//# sourceMappingURL=Strings.js.map