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
     * @param stack
     */
    equals?(src: T, dest: T, stack?: any[]): boolean;
}

/**
 * When you use Object.prototype.toString.call(src) then it returns somethings like that [object ...].
 * Then you can seperate it and get type name from the result.
 * @type {string}
 */
const TYPE_PREFIX = "[object ";

/**
 * Provides to get type name of the give type.
 * @type {()=>string}
 */
const toString = Object.prototype.toString;

export default class Type<T> implements IType<T> {
    /**
     * gets Raw Name of the given type like [object ...]
     * @param o
     * @returns {any}
     */
    public static getRawName(o: any): string {
        return toString.call(o);
    }

    /**
     * gets type name of the given value.
     * @param o
     * @return {string}
     */
    public static getName(o: any): string {
        const typeObjectString = toString.call(o);
        const startIndex = TYPE_PREFIX.length;
        const length = typeObjectString.length - startIndex - 1;
        return typeObjectString.substr(startIndex, length);
    }

    /**
     * Checks the given value is Empty or not.
     * @param o
     * @return {boolean}
     */
    public static hasNot(o: any) {
        return o === null || o === undefined;
    }

    /**
     * Checks the given value is Json Type or not.
     * @return {boolean}
     */
    public static isJsonType() {
        return true;
    }

    /**
     * Checks the given value is primitive or not. Primitive mean you can use `=` (equality) sign on primitive types
     * @return {boolean}
     */
    public static isPrimitive() {
        return true;
    }

    /**
     * Checks the given value is Native Type or not. Native types is used in core javascript library.
     * @return {boolean}
     */
    public static isNativeType() {
        return true;
    }

    /**
     * gets clone of the given value.
     * @param o
     * @return {any}
     */
    public static getClone<E>(o: E): E {
        return o;
    }

    /**
     * gets size of the given value
     * @param o
     * @return {number}
     */
    public static getSize(o: any): number {
        return 0;
    }

    /**
     *
     * Checks src is equals destination or not.
     * @param src {E}
     * @param dest {E}
     * @return {boolean}
     */
    public static equals(src: any, dest: any): boolean {
        return src === dest;
    }

    /**
     * Checks the given value is Empty or not.
     * @param o
     * @return {boolean}
     */
    public readonly hasNot: (o: T) => boolean;
    /**
     * Checks the given value is primitive or not. Primitive mean you can use `=` (equality) sign on primitive types
     * @return {boolean}
     */
    public readonly isPrimitive: () => boolean;
    /**
     * Checks the given value is Json Type or not.
     * @return {boolean}
     */
    public readonly isJsonType: () => boolean;
    /**
     * Checks the given value is Native Type or not. Native types is used in core javascript library.
     * @return {boolean}
     */
    public readonly isNativeType: () => boolean;
    /**
     * gets clone of the given value.
     * @param o
     * @return {any}
     */
    public readonly getClone: (o: T) => T;
    /**
     * gets type name of the given value.
     * @param o
     * @return {string}
     */
    public readonly getName: (o: T) => string;
    /**
     * gets size of the given value
     * @param o
     * @return {number}
     */
    public readonly getSize: (o: T) => number;
    /**
     * gets size of the given value
     * @param o
     * @return {number}
     */
    public readonly equals: (src: any, dest: any) => boolean;

    /**
     * sets initial properties to type from the given properties which implements IType<T> interfaces.
     * Check the given property if property not exist then apply standart properties which are defined as static members.
     * @param type
     * @param name
     */
    public constructor(type: IType<T>) {
        this.hasNot = type.hasNot ? type.hasNot : Type.hasNot;
        this.isPrimitive = type.isPrimitive ? type.isPrimitive : Type.isPrimitive;
        this.isJsonType = type.isJsonType ? type.isJsonType : Type.isJsonType;
        this.isNativeType = type.isNativeType ? type.isNativeType : Type.isNativeType;
        this.getClone = type.getClone ? type.getClone : Type.getClone;
        this.getName = Type.getName;
        this.getSize = type.getSize ? type.getSize : Type.getSize;
        this.equals = type.equals ? type.equals : Type.equals;
    }
}
