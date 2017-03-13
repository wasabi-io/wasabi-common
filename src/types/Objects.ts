import { has } from "../util/Functions";
import Type from "../lang/Type";
import Types from "../util/Types";
import Validations from "../util/Validations";

/**
 * Object interface
 */
export interface ObjectProps {
    [key: string]: any
}

/**
 * Defines to return boolean or void in the callback
 * @export
 * @interface ForEachCallback
 * ForEach Callback interface
 */
export interface ForEachCallback {
    (item: any, key?: string, obj?: ObjectProps): boolean | void
}

/**
 * Defines to return value in the callback
 * @export
 * @interface MapCallback
 * Map Callback interface
 */
export interface MapCallback {
    (item: any, key?: string, obj?: Object): any
}
/**
 * A class which provides some operations on Object {@see ObjectProps}
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
    static has<T extends ObjectProps>(src: T, key?: string): boolean {
        return has(src) && ( has(key) ? src.hasOwnProperty(key): Objects.getLength(src) > 0);
    }
    /**
     * Gets length of the given object keys
     * @param src
     * @returns {number}
     */
    public static getLength<T extends ObjectProps>(src: T): number {
        let i = 0;
        if(!has(src)) return i;
        for(let key in  src) {
            if(src.hasOwnProperty(key)) i++;
        }
        return i;
    }

    /**
     * Removes value by the given key from the given object
     * @param src {T}
     * @param key {any}
     * @return {T}
     */
    public static remove<T extends ObjectProps>(src: T, key: any): T {
        if(!has(src)) return src;
        delete src[key];
        return src;
    }

    /**
     * Removes value from the given object
     * @param src {T}
     * @param value {any}
     * @return {T}
     */
    public static removeValue<T extends ObjectProps>(src: T, value: any): T {
        if(!has(src)) return src;
        for(let key in  src) {
            if(src.hasOwnProperty(key)) {
                if (src[key] == value) {
                    delete src[key];
                }
            }
        }
        return src;
    }
    /**
     * Provdes to navigate in the given Object and create an array from the result of the callback function.
     * if the result of the callback is empty then ignores it.
     * @param obj
     * @param callback
     * @returns {Array<T>}
     */
    public static map<T extends ObjectProps, M extends ObjectProps>(obj: Object, callback: MapCallback ): any[] {
        let result = [];
        if(!obj) return result;
        for(let key in  obj) {
            if(obj.hasOwnProperty(key)) {
                let callbackResult = callback(obj[key], key, obj);
                if(!Type.hasNot(callbackResult)) {
                    result[result.length] = callbackResult;
                }
            }
        }
        return result;
    }

    /**
     * Provides to navigate in the given Object and can broken if return false from callback function.
     * @param obj { T }
     * @param callback
     * @returns {boolean}
     */
    public static forEach<T extends ObjectProps>(obj: T, callback: ForEachCallback): boolean {
        if(!has(obj)) return true;
        for(let key in  obj) {
            if(obj.hasOwnProperty(key)) {
                let callbackResult = callback(obj[key], key, obj);
                if(callbackResult === false) {
                    return false;
                }
            }
        }
        return true;
    }
    /**
     * Gets keys of the given object as string[].
     * @param src {T}
     * @returns {string[]}
     */
    public static getKeys<T extends ObjectProps>(src: T): string[] {
        let keys: string[] = [];
        if(!has(src)) return keys;
        for(let key in src) {
            if(src.hasOwnProperty(key)) keys.push(key);
        }
        return keys;
    }

    /**
     * Adds value by key or keys to the given source Object
     * @param src {T}
     * @param key {string}
     * @param value {any}
     * @param keys? {string[]}
     * @return {T}
     */
    public static addValue<T extends ObjectProps>(src: T, key: string, value: any, keys?: string[]): T {
        if(keys && keys.length > 0) {
            let prop = src[key];
            if(!Validations.isObject(prop)) prop = src[key] = {};
            let childKey = keys[0];
            keys.shift();
            Objects.addValue(prop, childKey, value, keys);
            keys.unshift(childKey);
        } else {
            src[key] = value;
        }
        return src;
    }

    /**
     * Gets value by the given key or keys from the given source object
     * @param src {T}
     * @param key {string}
     * @param keys? {string[]}
     * @returns {T}
     */
    public static getValue<T extends ObjectProps>(src: T, key: string, keys?: string[]): T  {
        let prop = src[key];
        if(prop && keys && keys.length > 0) {
            for(let i = 0 ; i < keys.length; i++) {
                prop = prop[keys[i]];
                if(!prop) return null;
            }
        }
        return prop;
    }

    /**
     * Clones the given source object
     * @param src {T}
     * @param ignoreList? {string[]}
     * @return {T}
     */
    public static clone<T extends ObjectProps>(src: T, ignoreList?: string[]): T {
        return Types.getClone(src, ignoreList);
    }

    /**
     * Merges the given source object and destination object by ignoreList.
     * @param src {S}
     * @param dest {D}
     * @param ignoreList? {string[]} specifies get clone of the element by type or not clones just return its.
     * @returns {any}
     */
    public static merge<S extends ObjectProps, D extends ObjectProps>(src: S, dest: D, ignoreList?: string[]): S | D {
        if (src == null) return dest;
        if (dest == null) return Objects.clone(src,ignoreList);
        if(Validations.isObject(src)) {
            for (let key in src) {
                if (src.hasOwnProperty(key)) {
                    if (Validations.isObject(src[key]) && Validations.isObject(dest[key])) {
                        Objects.merge(src[key], dest[key])
                    } else{
                        dest[key] = src[key];
                    }
                }
            }
        }
        return dest;
    }

    /**
     * Merges the given default props and the given props
     * @param defaults {S}
     * @param props {P}
     * @return {any}
     */
    public static mergeDefaults<D extends ObjectProps, P extends ObjectProps>(defaults: D, props: P): D | P {
        if (defaults == null) return props;
        if (props == null) return Objects.clone(defaults,[]);
        if(Validations.isObject(defaults)) {
            for (let key in defaults) {
                if (defaults.hasOwnProperty(key)) {
                    if(props[key]) {
                        if(Validations.isObject(defaults[key]) && Validations.isObject(props[key])) {
                            props[key] = Objects.mergeDefaults(defaults[key], props[key]);
                        }
                    } else {
                        props[key] = defaults[key];
                    }
                }
            }
        }
        return props;
    }
}