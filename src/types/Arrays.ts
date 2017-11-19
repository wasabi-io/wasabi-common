import {Props} from "wasabi-common/lib/types/Objects";
import Collection from "../collection/Collection";
import {has} from "../util/Functions";
import Types from "../util/Types";

/**
 * A class which provides some operations on Array
 * @export
 * @class Arrays
 */
export default class Arrays {

    /**
     * Checks the given array is exist or not or index is exist or not.
     * @param src {any[]}
     * @param index? { number }
     * @return {boolean}
     */
    public static has(src: any[], index?: number): boolean {
        if (!has(src)) {
            return false;
        }
        return has(index) ? src.length > index : src.length > 0;
    }

    /**
     * Gets length of the given array.
     * @param src {any[]}
     * @returns {number}
     */
    public static getLength(src: any[]): number {
        return Arrays.has(src) ? src.length : 0;
    }

    /**
     * Provides to add the given item to the given array by index.
     * @param src
     * @param value
     * @param index
     * @return {boolean}
     */
    public static add(src: any[], value: any, index: number): boolean {
        if (!src) {
            return false;
        }
        if (index > 0) {
            if (index < src.length) {
                src.splice(index, 0, value);
                return true;
            } else if (index === src.length) {
                src[index] = value;
                return true;
            }
            return false;
        }
        return false;
    }

    /**
     * Removes value by the given index from the given array
     * @param src {any[]}
     * @param index {number}
     * @return {any[]}
     */
    public static remove(src: any[], index: number): any[] {
        if (!has(src)) {
            return src;
        }
        src.splice(index, 1);
        return src;
    }

    /**
     * Removes value from the given array
     * @param src {any[]}
     * @param value {any}
     * @return {any[]}
     */
    public static removeValue(src: any[], value: any) {
        for (let i = 0; i < src.length; i++) {
            if (src[i] === value) {
                src.splice(i, 1);
                i--;
            }
        }
        return src;
    }

    /**
     * Provides to push the given src array to the destination array.
     * @param {any[]} src
     * @param {any[]} destination
     * @return {any[]}
     */
    public static pushAll(src: any[], destination: any[]) {
        if (!Arrays.has(src)) {
            return destination;
        }
        if (!destination) {
            destination = [];
        }
        Collection.forEachArray(src, (item: any) => {
            destination.push(item);
        });
        return destination;
    }

    /**
     * Provides to removes the given source array to the given destination array.
     * @param src
     * @param dest
     * @return {any}
     */
    public static removeAll<T>(src: T[], dest: T[]): T[] {
        if (!dest) {
            return [];
        }
        if (!src || src.length === 0) {
            return dest.slice(0);
        }
        const newArray = [];
        for (const value of dest) {
            if (src.indexOf(value) === -1) {
                newArray.push(value);
            }
        }
        return newArray;
    }

    /**
     * Provides to navigate in the given Object and create an array from the result of the callback function.
     * if the result of the callback is empty then ignores it.
     * @param {any[]} array
     * @param {(item: any, index?: number, obj?: Object) => T} callback
     * @returns {Array<T>}
     */
    public static map<T>(array: any[], callback: (item: any, index?: number, obj?: Props) => T): T[] {
        const result = [];
        for (let i = 0; i < array.length; i++) {
            const callbackResult = callback(array[i], i, array);
            if (has(callbackResult)) {
                result[result.length] = callbackResult;
            }
        }
        return result;
    }

    /**
     * Provides to navigate in the given Object and can broken if return false from callback function.
     * @param {any[]} array
     * @param {(item: any, index?: number, obj?: Object) => boolean | void} callback
     * @returns {boolean}
     */
    public static forEach(array: any[], callback: (item: any, index?: number, obj?: Props) => boolean | void): boolean {
        for (let i = 0; i < array.length; i++) {
            const callbackResult = callback(array[i], i, array);
            if (callbackResult === false) {
                return false;
            }
        }
        return true;
    }

    /**
     *
     * Merges the given arrays.
     * @param {Array<T>[]} arrays
     * @return {T[]}
     */
    public static merge(...arrays: any[][]): any[] {
        const resultArray: any[] = [];
        for (const array of arrays) {
            if (!array) {
                continue;
            }
            for (const element of array) {
                labelSwitch: switch (Types.getRawName(element)) {
                    case Types.ToString.Array:
                    case Types.ToString.Object:
                        for (const result of resultArray) {
                            if (Types.equals(result, element)) {
                                break labelSwitch;
                            }
                        }
                        resultArray.push(element);
                        break;
                    default:
                        if (resultArray.indexOf(element) === -1) {
                            resultArray.push(element);
                        }
                }
            }
        }
        return resultArray;
    }
}
