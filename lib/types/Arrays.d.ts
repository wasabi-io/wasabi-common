/**
 * A class which provides some operations on Array
 * @export
 * @class Arrays
 */
export default class Arrays {
    static has(value: string[]): boolean;
    /**
     * gets length of the keys which are defined in the given object.
     * @param obj
     * @returns {number}
     */
    static getLength(value: string[]): number;
    /**
     *
     * @param src
     * @param value
     * @return {any[]}
     */
    static cleanValueFromArray(src: any[], value: any): any[];
}
