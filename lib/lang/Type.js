"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../prototype");
/**
 * When you use Object.prototype.toString.call(src) then it returns somethings like that [object ...].
 * Then you can seperate it and get type name from the result.
 * @type {string}
 */
var TYPE_PREFIX = "[object ";
/**
 * Provides to get type name of the give type.
 * @type {()=>string}
 */
var toString = Object.prototype.toString;
var Type = (function () {
    /**
     * sets initial properties to type from the given properties which implements IType<T> interfaces.
     * Check the given property if property not exist then apply standart properties which are defined as static members.
     * @param type
     */
    function Type(type) {
        this.hasNot = type.hasNot ? type.hasNot : Type.hasNot;
        this.isPrimitive = type.isPrimitive ? type.isPrimitive : Type.isPrimitive;
        this.isJsonType = type.isJsonType ? type.isJsonType : Type.isJsonType;
        this.isNativeType = type.isNativeType ? type.isNativeType : Type.isNativeType;
        this.getClone = type.getClone ? type.getClone : Type.getClone;
        this.getName = Type.getName;
        this.getSize = type.getSize ? type.getSize : Type.getSize;
        this.equals = type.equals ? type.equals : Type.equals;
    }
    /**
     * Checks the given value is Empty or not.
     * @param o
     * @return {boolean}
     */
    Type.hasNot = function (o) {
        return o === null || o === undefined;
    };
    return Type;
}());
/**
 * gets Raw Name of the given type like [object ...]
 * @param o
 * @returns {any}
 */
Type.getRawName = function (o) {
    return toString.call(o);
};
/**
 * gets type name of the given value.
 * @param o
 * @return {string}
 */
Type.getName = function (o) {
    var typeObjectString = toString.call(o);
    var startIndex = TYPE_PREFIX.length;
    var length = typeObjectString.length - startIndex - 1;
    return typeObjectString.substr(startIndex, length);
};
/**
 * Checks the given value is Json Type or not.
 * @return {boolean}
 */
Type.isJsonType = function () { return true; };
/**
 * Checks the given value is primitive or not. Primitive mean you can use `=` (equality) sign on primitive types
 * @return {boolean}
 */
Type.isPrimitive = function () { return true; };
/**
 * Checks the given value is Native Type or not. Native types is used in core javascript library.
 * @return {boolean}
 */
Type.isNativeType = function () { return true; };
/**
 * gets clone of the given value.
 * @param o
 * @return {any}
 */
Type.getClone = function (o) {
    return o;
};
/**
 * gets size of the given value
 * @param o
 * @return {number}
 */
Type.getSize = function (o) {
    return 0;
};
Type.equals = function (src, dest) {
    return src === dest;
};
exports.default = Type;
//# sourceMappingURL=Type.js.map