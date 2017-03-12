import { has } from "../util/Functions";
import Type from "../lang/Type";
import Types from "../util/Types";
import Assertions from "../util/Assertions";

const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 *
 */
export interface ObjectsProps {
    [key: string]: any
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
    static has(value: Object): boolean {
        return has(value) && Objects.getLength(value) > 0
    }
    /**
     * gets length of the keys which are defined in the given object.
     * @param obj
     * @returns {number}
     */
    public static getLength(obj: Object): number {
        let i = 0;
        for(let key in  obj) {
            if(Objects.hasProperty(obj, key)) i++;
        }
        return i;
    }
    /**
     *
     * Checks the given given Object has key or not.
     * @param object
     * @param key
     * @returns {boolean}
     */
    public static hasProperty(object: Object, key: string) {
        return hasOwnProperty.call(object, key);
    }
    /**
     * Provides to navigate in the given Object and create an array from the result of the callback function.
     * if the result of the callback is empty then ignores it.
     * @param obj
     * @param callback
     * @returns {Array<T>}
     */
    public static map<T>(obj: Object, callback: (item: any, key?: string, obj?: Object) => T): T[] {
        let result = [];
        for(let key in  obj) {
            if(Objects.hasProperty(obj, key)) {
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
     * @param obj
     * @param callback
     * @returns {boolean}
     */
    public static forEach(obj: Object, callback: (item: any, key?: string, obj?: Object) => boolean | void): boolean {
        for(let key in  obj) {
            if(hasOwnProperty.call(obj, key)) {
                let callbackResult = callback(obj[key], key, obj);
                if(callbackResult === false) {
                    return false;
                }
            }
        }
        return true;
    }
    /**
     * gets keys of the given object as string[].
     * @param obj
     * @returns {string[]}
     */
    public static getKeys(obj: Object): string[] {
        let keys: string[] = [];
        for(let key in  obj) {
            if(Objects.hasProperty(obj, key)) keys.push(key);
        }
        return keys;
    }

    /**
     *
     * @param parentProp
     * @param key
     * @param value
     * @param keys
     */
    public static addValue(parentProp: ObjectsProps, key: string, value: any, keys?: string[]) {
        if(keys && keys.length > 0) {
            let prop = parentProp[key];
            if(!Assertions.isObject(prop)) prop = parentProp[key] = {};
            let childKey = keys[0];
            keys.shift();
            Objects.addValue(prop, childKey, value, keys);
            keys.unshift(childKey);
        } else {
            parentProp[key] = value;
        }
    }

    /**
     *
     * @param parentProp
     * @param key
     * @param keys
     * @returns {any}
     */
    public static getValue(parentProp: ObjectsProps, key: string, keys?: string[]): any  {
        let prop = parentProp[key];
        if(prop && keys && keys.length > 0) {
            for(let i = 0 ; i < keys.length; i++) {
                prop = prop[keys[i]];
                if(!prop) return null;
            }
        }
        return prop;
    }

    /**
     *
     * @param parentProp
     * @param key
     * @param keys
     * @returns {any}
     */
    public static getValueByKeys(parentProp: ObjectsProps, keys?: string[]): any  {
        let prop = parentProp;
        for(let i = 0 ; i < keys.length; i++) {
            prop = prop[keys[i]];
            if(!prop) return null;
        }
        return prop;
    }

    public static clone(obj: Object, ignoreList?: string[]): Object {
        return Types.getClone(obj, ignoreList);
    }

    /**
     * Provides to merge src and destination by ignoreList.
     * @param src
     * @param dest
     * @param ignoreList specifies get clone of the element by type or not clones just return its.
     * @returns {any}
     */
    public static merge(src: any, dest: any, ignoreList?: string[]): any {
        if (src == null) return dest;
        if (dest == null) return Objects.clone(src,ignoreList);
        if(Assertions.isObject(src)) {
            for (let key in src) {
                if (Objects.hasProperty(src, key)) {
                    if (Assertions.isObject(src[key]) && Assertions.isObject(dest[key])) {
                        Objects.merge(src[key], dest[key])
                    } else{
                        dest[key] = src[key];
                    }
                }
            }
        }
        return dest;
    }

    public static mergeDefaults(defaults: any, props: any) {
        if (defaults == null) return props;
        if (props == null) return Objects.clone(defaults,[]);
        if(Assertions.isObject(defaults)) {
            for (let key in defaults) {
                if (Objects.hasProperty(defaults, key)) {
                    if(props[key]) {
                        if(Assertions.isObject(defaults[key]) && Assertions.isObject(props[key])) {
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