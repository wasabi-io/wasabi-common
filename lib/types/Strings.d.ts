/**
 * A class which provides some operations on String
 * @export
 * @class Strings
 */
export default class Strings {
    /**
     * Checks the given array is exist or not or index is exist or not.
     * @param src {string}
     * @param index? { number }
     * @return {boolean}
     */
    static has(src: string, index?: number): boolean;
    /**
     * Gets length of the given value {string}.
     * @param value
     * @returns {number}
     */
    static getLength(value: string): number;
    /**
     * Returns toString of the given value {string}
     * @param value
     * @return {any}
     */
    static toString(value: string): string;
    /**
     * Returns toString of the given value {string}
     * Determines whether a string begins with the characters of another string, returning true or false as appropriate.
     * @param value
     * @param searchString
     * @param position
     * @return {boolean}
     */
    static startsWith(value: string, searchString: string, position?: number): boolean;
    /**
     * Determines whether a string ends with the characters of another string, returning true or false as appropriate.
     * @param value
     * @param searchString
     * @param position
     * @return {boolean}
     */
    static endsWith(value: string, searchString: string, position?: number): boolean;
    /**
     * Trims space from both side of the given value {string}
     * @param value
     * @return {string}
     */
    static trim(value: string): string;
    /**
     * Trims space from left side of the given value {string}
     * @param value
     * @return {string}
     */
    static lTrim(value: string): string;
    /**
     * Trims space from right side of the given value {string}
     * @param value
     * @return {string}
     */
    static rTrim(value: string): string;
    /**
     * Changes first character as uppercase character of the given value {string}
     * @param value {string}
     * @return {string}
     */
    static capitalizeFirstLetter(value: string): string;
    /**
     * Puts the given pad {string} by (the given value minus the given length) from left side of the given value {string}
     * @param value {string}
     * @param pad {string}
     * @param length {number}
     * @return {string}
     */
    static lPad(value: string, pad: any, length: any): string;
    /**
     * Puts the given pad {string} by (the given value minus the given length) from right side of the given value {string}
     * @param value {string}
     * @param pad {string}
     * @param length {number}
     * @return {string}
     */
    static rPad(value: string, pad: any, length: any): string;
    /**
     * Splits the given value {string} by the given length as equals parts.
     * @param value
     * @param length
     * @return {any}
     */
    static partsByNumber(value: string, length: number): string[];
}
