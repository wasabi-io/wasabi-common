/**
 *
 */
export interface ObjectsProps {
    [key: string]: any;
}
/**
 * A class which provides some operations on Object
 * @export
 * @class Objects
 */
export default class Objects {
    /**
     *
     * @param value
     * @return {boolean}
     */
    static has(value: Object): boolean;
    /**
     * gets length of the keys which are defined in the given object.
     * @param obj
     * @returns {number}
     */
    static getLength(obj: Object): number;
    /**
     *
     * Checks the given given Object has key or not.
     * @param object
     * @param key
     * @returns {boolean}
     */
    static hasProperty(object: Object, key: string): any;
    /**
     * Provides to navigate in the given Object and create an array from the result of the callback function.
     * if the result of the callback is empty then ignores it.
     * @param obj
     * @param callback
     * @returns {Array<T>}
     */
    static map<T>(obj: Object, callback: (item: any, key?: string, obj?: Object) => T): T[];
    /**
     * Provides to navigate in the given Object and can broken if return false from callback function.
     * @param obj
     * @param callback
     * @returns {boolean}
     */
    static forEach(obj: Object, callback: (item: any, key?: string, obj?: Object) => boolean | void): boolean;
    /**
     * gets keys of the given object as string[].
     * @param obj
     * @returns {string[]}
     */
    static getKeys(obj: Object): string[];
    /**
     *
     * @param parentProp
     * @param key
     * @param value
     * @param keys
     */
    static addValue(parentProp: ObjectsProps, key: string, value: any, keys?: string[]): void;
    /**
     *
     * @param parentProp
     * @param key
     * @param keys
     * @returns {any}
     */
    static getValue(parentProp: ObjectsProps, key: string, keys?: string[]): any;
    /**
     *
     * @param parentProp
     * @param key
     * @param keys
     * @returns {any}
     */
    static getValueByKeys(parentProp: ObjectsProps, keys?: string[]): any;
    static clone(obj: Object, ignoreList?: string[]): Object;
    /**
     * Provides to merge src and destination by ignoreList.
     * @param src
     * @param dest
     * @param ignoreList specifies get clone of the element by type or not clones just return its.
     * @returns {any}
     */
    static merge(src: any, dest: any, ignoreList?: string[]): any;
    static mergeDefaults(defaults: any, props: any): any;
}
