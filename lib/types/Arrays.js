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
    Arrays.has = function (value) {
        return Functions_1.has(value) && value.length > 0;
    };
    /**
     * gets length of the keys which are defined in the given object.
     * @param obj
     * @returns {number}
     */
    Arrays.getLength = function (value) {
        return Arrays.has(value) ? value.length : 0;
    };
    /**
     *
     * @param src
     * @param value
     * @return {any[]}
     */
    Arrays.cleanValueFromArray = function (src, value) {
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