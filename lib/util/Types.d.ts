import { IType } from "../lang/Type";
export interface TypesMapProps {
    [key: string]: IType<any>;
}
/**
 * Provides most used operations on types
 */
export default class Types {
    static Map: TypesMapProps;
    static readonly ToString: {
        Number: string;
        Boolean: string;
        Array: string;
        String: string;
        Date: string;
        RegExp: string;
        Null: string;
        Function: string;
        Undefined: string;
        Object: string;
    };
    /**
     * finds @see Type by given object
     * @param {any} o
     * @return {IType<any>} provides most used operation on type
     * @public
     */
    static getType(o: any): IType<any>;
    /**
     * gets type name of the given value.
     * @param o
     * @return {string}
     */
    static getRawName: (o: any) => string;
    /**
     * gets type name of the given value.
     * @param o
     * @return {string}
     */
    static getName: (o: any) => string;
    /**
    * finds @see Type by given name of object
     * @param {string} name
     * @return {IType<any>}
     * @public
     */
    static getTypeByName(name: string): IType<any>;
    /**
     finds @see Type by given name of object
     * @param {any} o
     * @param {string[]} ignoreList
     * @returns {any}
     */
    static getClone<T>(o: T, ignoreList?: string[]): T;
    /**
     * gets size of the given value.
     * @param o
     * @return {number}
     */
    static getSize(o: any): number;
    /**
     *
     * @param src
     * @param dest
     * @return {boolean}
     */
    static equals(src: any, dest: any): boolean;
    /**
     * check value is empty or not by type
     * @param o
     * @return {boolean}
     */
    static hasNot(o: any): boolean;
    static addType<T>(obj: string | T, type: IType<T>): void;
}
