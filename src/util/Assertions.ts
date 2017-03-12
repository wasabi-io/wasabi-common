import "../prototype";
import Type from "../lang/Type";
import Types from "./Types";
import {has} from "./Functions";


/**
 * A class which
 * @export
 * @class Strings
 */
export default class Assertions {
    /**
     * @param o
     * @return {boolean}
     * @public
     */
    public static isPrimitive(o: any): boolean {
        let type = Types.getType(o);
        return type.isPrimitive() ;
    }
    /**
     * @param o
     * @return {boolean}
     * @public
     */
    public static isJsonType(o: any): boolean {
        let element = Types.getType(o);
        return element ? element.isJsonType(): false ;
    }

        /**
     * @param o
     * @return {boolean}
     * @public
     */
    public static isNativeType(o: any): boolean {
        let element = Types.getType(o);
        return element ? element.isNativeType(): false ;
    }

    /**
     *
     * @param o
     * @return {boolean}
     * @public
     */
    public static isObject(o: any): boolean {
        return Type.getRawName(o) === Types.ToString.Object;
    }

    /**
     *
     * @param o
     * @return {boolean}
     * @public
     */
    public static isNumber(o: any): boolean {
        return Type.getRawName(o) === Types.ToString.Number;
    }
    /**
     *
     * @param o
     * @return {boolean}
     * @public
     */
    public static isBoolean(o: any): boolean {
        return Type.getRawName(o) === Types.ToString.Boolean;
    }
    /**
     *
     * @param o
     * @return {boolean}
     * @public
     */
    public static isArray(o: any): boolean {
        return Type.getRawName(o) === Types.ToString.Array;
    }
    /**
     *
     * @param o
     * @return {boolean}
     * @public
     */
    public static isString(o: any): boolean {
         return Type.getRawName(o) === Types.ToString.String;
    }
    /**
     *
     * @param o
     * @return {boolean}
     * @public
     */
    public static isDate(o: any): boolean {
        return Type.getRawName(o) === Types.ToString.Date;
    }
    /**
     *
     * @param o
     * @return {boolean}
     * @public
     */
    public static isRegExp(o: any): boolean {
        return Type.getRawName(o) === Types.ToString.RegExp;
    }
    /**
     *
     * @param o
     * @return {boolean}
     * @public
     */
    public static isNull(o: any): boolean {
        return Type.getRawName(o) === Types.ToString.Null;
    }
    /**
     *
     * @param o
     * @return {boolean}
     * @public
     */
    public static isFunction(o: any): boolean {
        return Type.getRawName(o) === Types.ToString.Function;
    }
    /**
     *
     * @param o
     * @return {boolean}
     * @public
     */
    public static isUndefined(o: any): boolean {
        return Type.getRawName(o) === Types.ToString.Undefined;
    }

    public static has(o: any): boolean {
        return !Types.hasNot(o);
    }

    public static hasNot(o: any): boolean {
        return Types.hasNot(o);
    }

    public static equals(src: any, dest: any): boolean {
        return Types.equals(src, dest);
    }
}