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
    Strings.has = function (value) {
        return Functions_1.has(value) && value.trim() !== "";
    };
    /**
     *
     * @param value
     * @return {any}
     */
    Strings.toString = function (value) {
        if (value === null || value === undefined)
            return "";
        return value.toString();
    };
    /**
     * The startsWith() method determines whether a string begins with the characters of another string, returning true or false as appropriate.
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
     * The endsWith() method determines whether a string ends with the characters of another string, returning true or false as appropriate.
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
     * trimming space from both side of the string
     * @param value
     * @return {string}
     */
    Strings.trim = function (value) {
        return value.replace(/^\s+|\s+$/g, "");
    };
    /**
     * trimming space from left side of the string
     * @param value
     * @return {string}
     */
    Strings.lTrim = function (value) {
        return value.replace(/^\s+/, "");
    };
    /**
     * trimming space from right side of the string
     * @param value
     * @return {string}
     */
    Strings.rTrim = function (value) {
        return value.replace(/\s+$/, "");
    };
    /**
     *
     * @param value
     * @return {string}
     */
    Strings.capitalizeFirstLetter = function (value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    };
    /**
     *
     * @param value
     * @param padString
     * @param length
     * @return {string}
     */
    Strings.lPad = function (value, padString, length) {
        if (!Strings.has(value))
            value = "";
        while (value.length < length)
            value = padString + value;
        return value;
    };
    /**
     *
     * @param value
     * @param padString
     * @param length
     * @return {string}
     */
    Strings.rPad = function (value, padString, length) {
        if (!Strings.has(value))
            value = "";
        while (value.length < length)
            value = value + padString;
        return value;
    };
    /**
     *
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