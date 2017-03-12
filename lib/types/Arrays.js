"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Functions_1 = require("../util/Functions");
/**
 * A class which provides some operations on Array
 * @export
 * @class Arrays
 */
var Arrays = (function () {
    function Arrays() {
    }
    /**
     * Checks the given array is exist or not or index is exist or not.
     * @param src {any[]}
     * @param index? { number }
     * @return {boolean}
     */
    Arrays.has = function (src, index) {
        if (!Functions_1.has(src))
            return false;
        return Functions_1.has(index) ? src.length > index : src.length > 0;
    };
    /**
     * Gets length of the given array.
     * @param src {any[]}
     * @returns {number}
     */
    Arrays.getLength = function (src) {
        return Arrays.has(src) ? src.length : 0;
    };
    /**
     * Removes value by the given index from the given array
     * @param src {any[]}
     * @param index {number}
     * @return {any[]}
     */
    Arrays.remove = function (src, index) {
        if (!Functions_1.has(src))
            return src;
        src.splice(index, 1);
        return src;
    };
    /**
     * Removes value from the given array
     * @param src {any[]}
     * @param value {any}
     * @return {any[]}
     */
    Arrays.removeValue = function (src, value) {
        for (var i = 0; i < src.length; i++) {
            if (src[i] == value) {
                src.splice(i, 1);
                i--;
            }
        }
        return src;
    };
    return Arrays;
}());
exports.default = Arrays;
//# sourceMappingURL=Arrays.js.map