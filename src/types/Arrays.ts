import { has } from "../util/Functions";

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
    static has(src: any[], index?: number): boolean {
        if(!has(src)) return false;
        return has(index)? src.length > index : src.length > 0
    }
    /**
     * Gets length of the given array.
     * @param src {any[]}
     * @returns {number}
     */
    public static getLength(src: any[]): number {
        return Arrays.has(src) ? src.length: 0;
    }

    /**
     * Removes value by the given index from the given array
     * @param src {any[]}
     * @param index {number}
     * @return {any[]}
     */
    public static remove(src: any[], index: number): any[] {
        if(!has(src)) return src;
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
            if (src[i] == value) {
                src.splice(i, 1);
                i--;
            }
        }
        return src;
    }
}