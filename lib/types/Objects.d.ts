/**
 * Object interface
 */
export interface ObjectsProps {
    [key: string]: any;
}
/**
 * Defines to return boolean or void in the callback
 * @export
 * @interface ForEachCallback
 * ForEach Callback interface
 */
export interface ForEachCallback {
    (item: any, key?: string, obj?: ObjectsProps): boolean | void;
}
/**
 * Defines to return value in the callback
 * @export
 * @interface MapCallback
 * Map Callback interface
 */
export interface MapCallback {
    (item: any, key?: string, obj?: Object): any;
}
/**
 * A class which provides some operations on Object {@see ObjectsProps}
 * @export
 * @class Objects
 */
export default class Objects {
    /**
     *
     * Checks the given Object (is exist or not) or (the given key is exist or not}
     * @param src {T}
     * @param key? {string}
     * @return {boolean}
     */
    static has<T extends ObjectsProps>(src: T, key?: string): boolean;
    /**
     * Gets length of the given object keys
     * @param src
     * @returns {number}
     */
    static getLength<T extends ObjectsProps>(src: T): number;
    /**
     * Removes value by the given key from the given object
     * @param src {T}
     * @param key {any}
     * @return {T}
     */
    static remove<T extends ObjectsProps>(src: T, key: any): T;
    /**
     * Removes value from the given object
     * @param src {T}
     * @param value {any}
     * @return {T}
     */
    static removeValue<T extends ObjectsProps>(src: T, value: any): T;
    /**
     * Provdes to navigate in the given Object and create an array from the result of the callback function.
     * if the result of the callback is empty then ignores it.
     * @param obj
     * @param callback
     * @returns {Array<T>}
     */
    static map<T extends ObjectsProps, M extends ObjectsProps>(obj: Object, callback: MapCallback): any[];
    /**
     * Provides to navigate in the given Object and can broken if return false from callback function.
     * @param obj { T }
     * @param callback
     * @returns {boolean}
     */
    static forEach<T extends ObjectsProps>(obj: T, callback: ForEachCallback): boolean;
    /**
     * Gets keys of the given object as string[].
     * @param src {T}
     * @returns {string[]}
     */
    static getKeys<T extends ObjectsProps>(src: T): string[];
    /**
     * Adds value by key or keys to the given source Object
     * @param src {T}
     * @param key {string}
     * @param value {any}
     * @param keys? {string[]}
     * @return {T}
     */
    static addValue<T extends ObjectsProps>(src: T, key: string, value: any, keys?: string[]): T;
    /**
     * Gets value by the given key or keys from the given source object
     * @param src {T}
     * @param key {string}
     * @param keys? {string[]}
     * @returns {T}
     */
    static getValue<T extends ObjectsProps>(src: T, key: string, keys?: string[]): T;
    /**
     * Clones the given source object
     * @param src {T}
     * @param ignoreList? {string[]}
     * @return {T}
     */
    static clone<T extends ObjectsProps>(src: T, ignoreList?: string[]): T;
    /**
     * Merges the given source object and destination object by ignoreList.
     * @param src {S}
     * @param dest {D}
     * @param ignoreList? {string[]} specifies get clone of the element by type or not clones just return its.
     * @returns {any}
     */
    static merge<S extends ObjectsProps, D extends ObjectsProps>(src: S, dest: D, ignoreList?: string[]): S | D;
    /**
     * Merges the given default props and the given props
     * @param defaults {S}
     * @param props {P}
     * @return {any}
     */
    static mergeDefaults<D extends ObjectsProps, P extends ObjectsProps>(defaults: D, props: P): D | P;
}
