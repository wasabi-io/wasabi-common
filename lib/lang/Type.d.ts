import "../prototype";
/**
 * Defines some rules to implements by instance which implements from @see IType<T>
 */
export interface IType<T> {
    /**
     * Checks the given value is Empty or not.
     * @param o
     * @return {boolean}
     */
    hasNot?(o: T): boolean;
    /**
     * Checks the given value is primitive or not. Primitive mean you can use `=` (equality) sign on primitive types
     * @return {boolean}
     */
    isPrimitive?(): boolean;
    /**
     * Checks the given value is Json Type or not.
     * @return {boolean}
     */
    isJsonType?(): boolean;
    /**
     * Checks the given value is Native Type or not. Native types is used in core javascript library.
     * @return {boolean}
     */
    isNativeType?(): boolean;
    /**
     * gets clone of the given value.
     * @param o
     * @return {any}
     */
    getClone?(o: T): T;
    /**
     * gets type name of the given value.
     * @param o
     * @return {string}
     */
    getName?(o: T): string;
    /**
     * gets size of the given value
     * @param o
     * @return {number}
     */
    getSize?(o: T): number;
    /**
     *
     * @param src
     * @param dest
     */
    equals?(src: T, dest: T): boolean;
}
export default class Type<T> implements IType<T> {
    /**
     * Checks the given value is Empty or not.
     * @param o
     * @return {boolean}
     */
    readonly hasNot: (o: T) => boolean;
    /**
     * Checks the given value is primitive or not. Primitive mean you can use `=` (equality) sign on primitive types
     * @return {boolean}
     */
    readonly isPrimitive: () => boolean;
    /**
     * Checks the given value is Json Type or not.
     * @return {boolean}
     */
    readonly isJsonType: () => boolean;
    /**
     * Checks the given value is Native Type or not. Native types is used in core javascript library.
     * @return {boolean}
     */
    readonly isNativeType: () => boolean;
    /**
     * gets clone of the given value.
     * @param o
     * @return {any}
     */
    readonly getClone: (o: T) => T;
    /**
     * gets type name of the given value.
     * @param o
     * @return {string}
     */
    readonly getName: (o: T) => string;
    /**
     * gets size of the given value
     * @param o
     * @return {number}
     */
    readonly getSize: (o: T) => number;
    /**
     * gets size of the given value
     * @param o
     * @return {number}
     */
    readonly equals: <E>(src: E, dest: E) => boolean;
    /**
     * sets initial properties to type from the given properties which implements IType<T> interfaces.
     * Check the given property if property not exist then apply standart properties which are defined as static members.
     * @param type
     */
    constructor(type: IType<T>);
    /**
     * gets Raw Name of the given type like [object ...]
     * @param o
     * @returns {any}
     */
    static getRawName: (o: any) => string;
    /**
     * gets type name of the given value.
     * @param o
     * @return {string}
     */
    static getName: (o: any) => string;
    /**
     * Checks the given value is Empty or not.
     * @param o
     * @return {boolean}
     */
    static hasNot(o: any): boolean;
    /**
     * Checks the given value is Json Type or not.
     * @return {boolean}
     */
    static isJsonType: () => boolean;
    /**
     * Checks the given value is primitive or not. Primitive mean you can use `=` (equality) sign on primitive types
     * @return {boolean}
     */
    static isPrimitive: () => boolean;
    /**
     * Checks the given value is Native Type or not. Native types is used in core javascript library.
     * @return {boolean}
     */
    static isNativeType: () => boolean;
    /**
     * gets clone of the given value.
     * @param o
     * @return {any}
     */
    static getClone: <E>(o: E) => E;
    /**
     * gets size of the given value
     * @param o
     * @return {number}
     */
    static getSize: (o: any) => number;
    static equals: <E>(src: E, dest: E) => boolean;
}
