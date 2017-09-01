import { has } from "../util/Functions";
import Types from "../util/Types";
import Validations from "../util/Validations";
import Collection, {MapItems} from "../collection/Collection";

export interface Props<V = any> {
    [key: string]: V
}
/**
 * Defines to return boolean or void in the callback
 * @export
 * @interface ForEachCallback
 * ForEach Callback interface
 */
export interface ForEachCallback {
    (item: any, key?: string, obj?: Props): boolean | void
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
 * @static
 * @class Objects
 */
export default class Objects {
    /**
     *
     * Checks the given Object (is exist or not) or (the given key is exist or not}
     * @public
     * @static
     * @param src {T}
     * @param key? {string}
     * @return {boolean}
     */
    public static has<T extends Props>(src: T, key?: string): boolean {
        return has(src) && ( has(key) ? src.hasOwnProperty(key): Objects.getLength(src) > 0);
    }
    /**
     * Gets length of the given object keys
     * @public
     * @static
     * @param src
     * @returns {number}
     */
    public static getLength<T extends Props>(src: T): number {
        let i = 0;
        Collection.forEachObject(src, () =>  i++);
        return i;
    }

    /**
     * Removes value by the given key from the given object
     * @public
     * @static
     * @param src {T}
     * @param key {any}
     * @return {T}
     */
    public static remove<R extends Props, T extends R>(src: T, key: any): T {
        if(!has(src)) return src;
        delete src[key];
        return src;
    }

    /**
     * Removes value from the given object
     * @public
     * @static
     * @param src {T}
     * @param value {any}
     * @return {T}
     */
    public static removeValue<T extends Props>(src: T, value: any): T {
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
     * @public
     * @static
     * @param {MapItems<T>} map
     * @param {(value: T, key: K) => U} callback
     * @returns {Array<U>}
     */
    public static map<T, U, K>(map: MapItems<T>, callback: (value: T, key: K) => U ): Array<U> {
        return Collection.mapObject(map, callback);
    }

    /**
     * Provides to navigate in the given Object and can broken if return false from callback function.
     * @public
     * @static
     * @param {MapItems<T>} map
     * @param {(value: T, key: K) => (void | boolean)} callback
     * @returns {boolean}
     */
    public static forEach<T, U, K>(map: MapItems<T>, callback: (value: T, key: K) => void | boolean ): boolean {
        return Collection.forEachObject(map, callback);
    }
    /**
     * Gets keys of the given object as string[].
     * @public
     * @static
     * @param src {T}
     * @returns {string[]}
     */
    public static getKeys<T extends Props>(src: T): string[] {
        let keys: string[] = [];
        if(!has(src)) return keys;
        for(let key in src) {
            if(src.hasOwnProperty(key)) keys.push(key);
        }
        return keys;
    }

    /**
     * Adds value by key or keys to the given source Object
     * @public
     * @static
     * @param src {T}
     * @param key {string}
     * @param value {any}
     * @param keys? {string[]}
     * @return {T}
     */
    public static addValue<T extends Props>(src: T, key: string, value: any, keys?: string[]): T {
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
     * @public
     * @static
     * @param src {T}
     * @param key {string}
     * @param keys? {string[]}
     * @returns {T}
     */
    public static getValue<T extends Props, U>(src: T, key: string, keys?: string[]): U {
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
     * @public
     * @static
     * @param src {T}
     * @param ignoreList? {string[]}
     * @return {T}
     */
    public static clone<T extends Props>(src: T, ignoreList?: string[]): T {
        return Types.getClone(src, ignoreList);
    }

    /**
     * Merges the given source object and destination object by ignoreList.
     * @public
     * @static
     * @param src {S}
     * @param dest {D}
     * @param ignoreList? {string[]} specifies get clone of the element by type or not clones just return its.
     * @returns {any}
     */
    public static merge<S extends Props, D extends Props, R extends S & D>(src: S, dest: D, ignoreList?: string[]): R {
        if (src == null) return dest as R;
        if (dest == null) return Objects.clone(src,ignoreList) as R;
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
        return dest as R;
    }

    /**
     * Merges the given default props and the given props
     * @public
     * @static
     * @param defaults {D}
     * @param props {P}
     * @return {any}
     */
    public static mergeDefaults<D extends Props, P extends Props, R extends D & P>(defaults: D, props: P): R {
        if (defaults == null) return props as R;
        if (props == null) return Objects.clone(defaults,[]) as R;
        if(Validations.isObject(defaults)) {
            Collection.forEachObject(defaults,(item, key: any) => {
                if(has(props[key])) {
                    if(Validations.isObject(item) && Validations.isObject(props[key])) {
                        props[key] = Objects.mergeDefaults(item, props[key]);
                    }
                } else {
                    props[key] = item;
                }
            });
            for (let key in defaults) {
                if (defaults.hasOwnProperty(key)) {

                }
            }
        }
        return props as R;
    }
}