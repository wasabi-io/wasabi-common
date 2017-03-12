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
    static has(src: any[], index?: number): boolean;
    /**
     * Gets length of the given array.
     * @param src {any[]}
     * @returns {number}
     */
    static getLength(src: any[]): number;
    /**
     * Removes value by the given index from the given array
     * @param src {any[]}
     * @param index {number}
     * @return {any[]}
     */
    static remove(src: any[], index: number): any[];
    /**
     * Removes value from the given array
     * @param src {any[]}
     * @param value {any}
     * @return {any[]}
     */
    static removeValue(src: any[], value: any): any[];
}
