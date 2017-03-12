import "../prototype";
/**
 * A class which
 * @export
 * @class Strings
 */
export default class Assertions {
    /**
     * @param o
     * @return {boolean}
     * @public
     */
    static isPrimitive(o: any): boolean;
    /**
     * @param o
     * @return {boolean}
     * @public
     */
    static isJsonType(o: any): boolean;
    /**
 * @param o
 * @return {boolean}
 * @public
 */
    static isNativeType(o: any): boolean;
    /**
     *
     * @param o
     * @return {boolean}
     * @public
     */
    static isObject(o: any): boolean;
    /**
     *
     * @param o
     * @return {boolean}
     * @public
     */
    static isNumber(o: any): boolean;
    /**
     *
     * @param o
     * @return {boolean}
     * @public
     */
    static isBoolean(o: any): boolean;
    /**
     *
     * @param o
     * @return {boolean}
     * @public
     */
    static isArray(o: any): boolean;
    /**
     *
     * @param o
     * @return {boolean}
     * @public
     */
    static isString(o: any): boolean;
    /**
     *
     * @param o
     * @return {boolean}
     * @public
     */
    static isDate(o: any): boolean;
    /**
     *
     * @param o
     * @return {boolean}
     * @public
     */
    static isRegExp(o: any): boolean;
    /**
     *
     * @param o
     * @return {boolean}
     * @public
     */
    static isNull(o: any): boolean;
    /**
     *
     * @param o
     * @return {boolean}
     * @public
     */
    static isFunction(o: any): boolean;
    /**
     *
     * @param o
     * @return {boolean}
     * @public
     */
    static isUndefined(o: any): boolean;
    static has(o: any): boolean;
    static hasNot(o: any): boolean;
    static equals(src: any, dest: any): boolean;
}
