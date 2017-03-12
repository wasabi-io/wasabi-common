import { has } from "../util/Functions";

/**
 * A class which provides some operations on Array
 * @export
 * @class Arrays
 */
export default class Arrays {
    static has(value: string[]): boolean {
        return has(value) && value.length > 0
    }
    /**
     * gets length of the keys which are defined in the given object.
     * @param obj
     * @returns {number}
     */
    public static getLength(value: string[]): number {
        return Arrays.has(value) ? value.length: 0;
    }

    /**
     *
     * @param src
     * @param value
     * @return {any[]}
     */
    public static cleanValueFromArray(src: any[], value: any) {
        for (let i = 0; i < src.length; i++) {
            if (src[i] == value) {
                src.splice(i, 1);
                i--;
            }
        }
        return src;
    }
}