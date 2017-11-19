import "../prototype";
import Types from "../util/Types";
import {Props} from "./Objects";

/**
 * Provides some operations on Json Types.
 */
export default class Maps {
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
     *
     * @description Checks equal the string value of the given source  and  the string value of the given destination object( dest )
     *
     * @param {any} src Source object to compare the equality
     * @param {any} dest Destination object to compare the equality
     * @returns : {boolean} if the string value of the given source equals the string value of the given destination then "true" else "false"
     */
    public static equals(src: Props, dest: Props): boolean {
        return JSON.stringify(src) === JSON.stringify(dest);
    }

    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
     *
     * @description creates and returns clone of the given source object ( src )
     *
     * @param src the given source object
     * @returns the clonse of the given source object
     */
    public static deepCopy(src: Props): Props {
        return JSON.parse(JSON.stringify(src));
    }

    /* Returns the approximate memory usage, in bytes, of the specified object. The
     * parameter is:
     * object - the object whose size should be determined
     */
    public static sizeOf(object: Props): number {
        return Types.getSize(object);
    }
}
