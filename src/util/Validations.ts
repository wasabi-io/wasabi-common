import "../prototype";
import Type from "../lang/Type";
import Types from "./Types";


/**
 * Provides some validation operations
 * Use {@see Assertions} for assertions.
 * @export
 * @class Validations
 */
export default class Validations {

    /**
     * Checks the given parameter type is Primitive or not
     * @param o
     * @return {boolean}
     */
    public static isPrimitive(o: any): boolean {
        let type = Types.getType(o);
        return type.isPrimitive();
    }

    /**
     * Checks the given parameter type is JsonType or not
     * @param o
     * @return {boolean}
     */
    public static isJsonType(o: any): boolean {
        let element = Types.getType(o);
        return element ? element.isJsonType(): false;
    }

    /**
     * Checks the given parameter type is NativeType or not.
     * @param o
     * @return {boolean}
     */
    public static isNativeType(o: any): boolean {
        let element = Types.getType(o);
        return element ? element.isNativeType(): false;
    }

    /**
     * Checks the given parameter type is Object or not
     * @param o
     * @return {boolean}
     */
    public static isObject(o: any): boolean {
        return Type.getRawName(o) === Types.ToString.Object;
    }

    /**
     * Checks the given parameter type is Number or not.
     * @param o
     * @return {boolean}
     */
    public static isNumber(o: any): boolean {
        return Type.getRawName(o) === Types.ToString.Number;
    }

    /**
     *
     * Checks the given parameter type is Boolean or not
     * @param o
     * @return {boolean}
     */
    public static isBoolean(o: any): boolean {
        return Type.getRawName(o) === Types.ToString.Boolean;
    }

    /**
     * Checks the given parameter type is Array or not.
     * @param o
     * @return {boolean}
     */
    public static isArray(o: any): boolean {
        return Type.getRawName(o) === Types.ToString.Array;
    }

    /**
     * Checks the given parameter type is String or not.
     * @param o
     * @return {boolean}
     */
    public static isString(o: any): boolean {
        return Type.getRawName(o) === Types.ToString.String;
    }

    /**
     * Checks the given parameter type is Date or not
     * @param o
     * @return {boolean}
     */
    public static isDate(o: any): boolean {
        return Type.getRawName(o) === Types.ToString.Date;
    }

    /**
     * Checks the given parameter type is RegExp or not.
     * @param o
     * @return {boolean}
     */
    public static isRegExp(o: any): boolean {
        return Type.getRawName(o) === Types.ToString.RegExp;
    }

    /**
     * Checks the given parameter type is Null or not.
     * @param o
     * @return {boolean}
     */
    public static isNull(o: any): boolean {
        return Type.getRawName(o) === Types.ToString.Null;
    }

    /**
     * Checks the given parameter type is Function or not.
     * @param o
     * @return {boolean}
     */
    public static isFunction(o: any): boolean {
        return Type.getRawName(o) === Types.ToString.Function;
    }

    /**
     * Checks the given parameter type is Undefined or not.
     * @param o
     * @return {boolean}
     */
    public static isUndefined(o: any): boolean {
        return Type.getRawName(o) === Types.ToString.Undefined
    }

    /**
     * Checks the given parameter has value or not
     * @param o
     * @return {boolean}
     */
    public static has(o: any): boolean {
        return !Types.hasNot(o);
    }

    /**
     * Checks the given parameter has value or not.
     * @param o
     * @return {boolean}
     */
    public static hasNot(o: any): boolean {
        return Types.hasNot(o);
    }

    /**
     * Checks the given src parameter equals the given destination parameter or not
     * @param src
     * @param dest
     * @return {boolean}
     */
    public static equals(src: any, dest: any): boolean {
        return Types.equals(src, dest);
    }
}