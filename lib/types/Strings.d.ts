/**
 * A class which provides some operations on String
 * @export
 * @class Strings
 */
export default class Strings {
    static has(value: string): boolean;
    /**
     *
     * @param value
     * @return {any}
     */
    static toString(value: string): string;
    /**
     * The startsWith() method determines whether a string begins with the characters of another string, returning true or false as appropriate.
     * @param value
     * @param searchString
     * @param position
     * @return {boolean}
     */
    static startsWith(value: string, searchString: string, position?: number): boolean;
    /**
     * The endsWith() method determines whether a string ends with the characters of another string, returning true or false as appropriate.
     * @param value
     * @param searchString
     * @param position
     * @return {boolean}
     */
    static endsWith(value: string, searchString: string, position?: number): boolean;
    /**
     * trimming space from both side of the string
     * @param value
     * @return {string}
     */
    static trim(value: string): string;
    /**
     * trimming space from left side of the string
     * @param value
     * @return {string}
     */
    static lTrim(value: string): string;
    /**
     * trimming space from right side of the string
     * @param value
     * @return {string}
     */
    static rTrim(value: string): string;
    /**
     *
     * @param value
     * @return {string}
     */
    static capitalizeFirstLetter(value: any): any;
    /**
     *
     * @param value
     * @param padString
     * @param length
     * @return {string}
     */
    static lPad(value: string, padString: any, length: any): string;
    /**
     *
     * @param value
     * @param padString
     * @param length
     * @return {string}
     */
    static rPad(value: string, padString: any, length: any): string;
    /**
     *
     * @param value
     * @param length
     * @return {any}
     */
    static partsByNumber(value: string, length: number): string[];
}
