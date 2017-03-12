import { has } from "../util/Functions";

/**
 * A class which provides some operations on String
 * @export
 * @class Strings
 */
export default class Strings {
    static has(value: string): boolean {
        return has(value) && value.trim() !== ""
    }
    /**
     *
     * @param value
     * @return {any}
     */
    public static toString(value: string): string {
        if(value === null || value === undefined) return "";
        return value.toString();
    }

    /**
     * The startsWith() method determines whether a string begins with the characters of another string, returning true or false as appropriate.
     * @param value
     * @param searchString
     * @param position
     * @return {boolean}
     */
    public static startsWith(value: string, searchString: string, position?: number): boolean {
        if (!value || !searchString || value.length < searchString.length) {
            return false;
        }
        position = position || 0;
        return value.substr(position, searchString.length) === searchString;
    }

    /**
     * The endsWith() method determines whether a string ends with the characters of another string, returning true or false as appropriate.
     * @param value
     * @param searchString
     * @param position
     * @return {boolean}
     */
    public static endsWith(value: string, searchString: string, position?: number): boolean {
        if (!value || !searchString || value.length < searchString.length) {
            return false;
        }
        position = position || value.length;
        return value.substring(position - searchString.length, position) === searchString;
    }

    /**
     * trimming space from both side of the string
     * @param value
     * @return {string}
     */
    static trim (value: string) {
        return value.replace(/^\s+|\s+$/g,"");
    }

    /**
     * trimming space from left side of the string
     * @param value
     * @return {string}
     */
    static lTrim (value: string) {
        return value.replace(/^\s+/,"");
    }

    /**
     * trimming space from right side of the string
     * @param value
     * @return {string}
     */
    static rTrim (value: string) {
        return value.replace(/\s+$/,"");
    }
    /**
     *
     * @param value
     * @return {string}
     */
    public static capitalizeFirstLetter(value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }

    /**
     *
     * @param value
     * @param padString
     * @param length
     * @return {string}
     */
    static lPad (value: string, padString, length) {
        if (!Strings.has(value)) value = "";
        while (value.length < length)
            value = padString + value;
        return value;
    }

    /**
     *
     * @param value
     * @param padString
     * @param length
     * @return {string}
     */
    static rPad (value: string, padString, length) {
        if (!Strings.has(value)) value = "";
        while (value.length < length)
            value = value + padString;
        return value;
    }

    /**
     *
     * @param value
     * @param length
     * @return {any}
     */
    static partsByNumber(value: string, length: number): string[] {
        if(!Strings.has(value)) return [];
        if(value.length < length) return [value];
        let values = [];
        let start = 0;
        while (start < value.length) {
            values.push(value.substring(start, start + length))
            start = start + length;
        }
        return values;
    }
}