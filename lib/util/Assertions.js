"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../prototype");
var Type_1 = require("../lang/Type");
var Types_1 = require("./Types");
/**
 * A class which
 * @export
 * @class Strings
 */
var Assertions = (function () {
    function Assertions() {
    }
    /**
     * @param o
     * @return {boolean}
     * @public
     */
    Assertions.isPrimitive = function (o) {
        var type = Types_1.default.getType(o);
        return type.isPrimitive();
    };
    /**
     * @param o
     * @return {boolean}
     * @public
     */
    Assertions.isJsonType = function (o) {
        var element = Types_1.default.getType(o);
        return element ? element.isJsonType() : false;
    };
    /**
 * @param o
 * @return {boolean}
 * @public
 */
    Assertions.isNativeType = function (o) {
        var element = Types_1.default.getType(o);
        return element ? element.isNativeType() : false;
    };
    /**
     *
     * @param o
     * @return {boolean}
     * @public
     */
    Assertions.isObject = function (o) {
        return Type_1.default.getRawName(o) === Types_1.default.ToString.Object;
    };
    /**
     *
     * @param o
     * @return {boolean}
     * @public
     */
    Assertions.isNumber = function (o) {
        return Type_1.default.getRawName(o) === Types_1.default.ToString.Number;
    };
    /**
     *
     * @param o
     * @return {boolean}
     * @public
     */
    Assertions.isBoolean = function (o) {
        return Type_1.default.getRawName(o) === Types_1.default.ToString.Boolean;
    };
    /**
     *
     * @param o
     * @return {boolean}
     * @public
     */
    Assertions.isArray = function (o) {
        return Type_1.default.getRawName(o) === Types_1.default.ToString.Array;
    };
    /**
     *
     * @param o
     * @return {boolean}
     * @public
     */
    Assertions.isString = function (o) {
        return Type_1.default.getRawName(o) === Types_1.default.ToString.String;
    };
    /**
     *
     * @param o
     * @return {boolean}
     * @public
     */
    Assertions.isDate = function (o) {
        return Type_1.default.getRawName(o) === Types_1.default.ToString.Date;
    };
    /**
     *
     * @param o
     * @return {boolean}
     * @public
     */
    Assertions.isRegExp = function (o) {
        return Type_1.default.getRawName(o) === Types_1.default.ToString.RegExp;
    };
    /**
     *
     * @param o
     * @return {boolean}
     * @public
     */
    Assertions.isNull = function (o) {
        return Type_1.default.getRawName(o) === Types_1.default.ToString.Null;
    };
    /**
     *
     * @param o
     * @return {boolean}
     * @public
     */
    Assertions.isFunction = function (o) {
        return Type_1.default.getRawName(o) === Types_1.default.ToString.Function;
    };
    /**
     *
     * @param o
     * @return {boolean}
     * @public
     */
    Assertions.isUndefined = function (o) {
        return Type_1.default.getRawName(o) === Types_1.default.ToString.Undefined;
    };
    Assertions.has = function (o) {
        return !Types_1.default.hasNot(o);
    };
    Assertions.hasNot = function (o) {
        return Types_1.default.hasNot(o);
    };
    Assertions.equals = function (src, dest) {
        return Types_1.default.equals(src, dest);
    };
    return Assertions;
}());
exports.default = Assertions;
//# sourceMappingURL=Assertions.js.map