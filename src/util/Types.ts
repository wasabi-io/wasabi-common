import Type, { IType } from "../lang/Type";

const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * It will use if Type is not in {
 * Number,
 * Boolean,
 * Array,
 * String,
 * Date,
 * RegExp,
 * Null,
 * Function,
 * Undefined,
 * Object
 * } types.
 * @type {Type<Object>}
 */
const UnknownType = new Type<Object>({
    hasNot: (o: Object) => Type.hasNot(o),
    isPrimitive: () => false,
    isJsonType: () => false,
    isNativeType: () => false,
    getSize: (o: any): number => {
        let size = 0;
        for(let key in o) {
            if(hasOwnProperty.call(o, key)) {
                size += 2 * key.length;
                size += Types.getSize(o[key]);
            }
        }
        return size;
    },
    getClone: (o: Object, ignoreList?: string[]): Object => {
        return o;
    }
});


export interface TypesMapProps {
    [key: string]: IType<any>
}

/**
 * Provides most used operations on types
 */
export default class Types {
    /**
     * Holds Types
     * @type {TypesMapProps}
     */
    public static Map: TypesMapProps = {};
    /**
     * Holds standard types.
     */
    public static readonly ToString = {
        Number: "[object Number]",
        Boolean: "[object Boolean]",
        Array: "[object Array]",
        String: "[object String]",
        Date: "[object Date]",
        RegExp: "[object RegExp]",
        Null: "[object Null]",
        Function: "[object Function]",
        Undefined: "[object Undefined]",
        Object: "[object Object]",
    };

    /**
     * Finds @see Type by given object
     * @param {any} o
     * @return {IType<any>} provides most used operation on type
     * @public
     */
    public static getType(o: any): IType<any> {
        let type = Types.Map[Type.getRawName(o)];
        return type ? type :  UnknownType;
    }

    /**
     * Gets type name of the given value.
     * @param o
     * @return {string}
     */
    public static getRawName = (o: any): string => {
        return Type.getRawName(o);
    };

    /**
     * Gets type name of the given value.
     * @param o
     * @return {string}
     */
    public static getName = (o: any): string => {
        return Type.getName(o);
    };

    /**
     * Finds @see Type by given name of object
     * @param {string} name
     * @return {IType<any>}
     * @public
     */
    public static getTypeByName(name: string): IType<any> {
        let type = Types.Map["[object "+ name + "]"];
        return type ? type : UnknownType;
    }

    /**
     finds @see Type by given name of object
     * @param {any} o
     * @param {string[]} ignoreList
     * @returns {any}
     */
    public static getClone<T>(o: T, ignoreList?: string[]): T {
        let type = Types.getType(o);
        if(ignoreList && ignoreList.indexOf(type.getName(o))) {
            return o;
        }
        return type.getClone(o);
    }

    /**
     * gets size of the given value.
     * @param o
     * @return {number}
     */
    public static getSize(o: any): number {
        return Types.getType(o).getSize(o);
    }

    /**
     * Checks the given src is equals the given dest or not.
     * @param src
     * @param dest
     * @return {boolean}
     */
    public static equals(src: any, dest: any): boolean {
        return Types.getType(src).equals(src, dest);
    }

    /**
     * Checks value is empty or not by type.
     * @param o
     * @return {boolean}
     */
    public static hasNot(o: any){
        return Types.getType(o).hasNot(o);
    }

    /**
     * add new types which implements { @see IType<any> }
     * @param obj
     * @param type
     */
    public static addType<T>(obj: string | T, type: IType<T>) {
        if(!type) {
            throw new Error("Given type ( "+ type +" ) is empty or null !");
        }
        let key = typeof obj === "string" ? "[object " + obj +"]": Type.getRawName(obj);
        let newType = Types.Map[key];
        if(newType) {
            throw new Error("You cannot add some types. That's used by core code.")
        }
        Types.Map[key] = type;
    }
}

/**
 * Null or Undefined Type
 * @type {Type<any>}
 */
const nullOrUndefined = new Type<any>({
    hasNot: () => true
});

// Null Type
Types.Map[Types.ToString.Null] = nullOrUndefined;

// Undefined Type
Types.Map[Types.ToString.Undefined] = nullOrUndefined;


// Number Type
Types.Map[Types.ToString.Number] = new Type<number>({
    getClone: (o: number): number => {
        return Number(o);
    },
    getSize: (o: number): number => 8
});

// Boolean Type
Types.Map[Types.ToString.Boolean] = new Type<boolean>({
    getSize: (o: boolean): number => 4
});

// String type
Types.Map[Types.ToString.String] = new Type<string>({
    hasNot: (o: string) => Type.hasNot(o) || o.trim() === "",
    getClone: (o: string): string => {
        return String(o);
    },
    getSize: (o: string): number => {
        return 2 * o.length
    }
});

// Date type
Types.Map[Types.ToString.Date] = new Type<Date>({
    isPrimitive: (): boolean => false,
    isJsonType: (): boolean => false,
    getClone: (o: Date): Date => {
        return new Date(o.getTime());
    }
});

// Date type
Types.Map[Types.ToString.RegExp] = new Type<RegExp>({
    isPrimitive: (): boolean => false,
    isJsonType: (): boolean => false,
    getClone: (o: RegExp): RegExp => {
        return new RegExp(o.source);
    }
});

// String type
Types.Map[Types.ToString.Function] = new Type<Function>({
    isPrimitive: (): boolean => false,
    isJsonType: (): boolean => false,
    getSize: (o: Function): number => {
        return (o as any).toString().length * 2;
    }
});

// Array Type
Types.Map[Types.ToString.Array] = new Type<any[]>({
    hasNot: (o: any[]) => Type.hasNot(o) || o.length === 0,
    isPrimitive: () => false,
    getClone: (o: any[], ignoreList?: string[]): any[] => {
        let cloneArray = [];
        for(let i = 0; i < o.length; i++) {
            cloneArray[i] = Types.getClone(o[i], ignoreList);
        }
        return cloneArray;
    },
    getSize: (o: any[]): number => {
        let size = 0;
        for(let i = 0; i < o.length; i++) {
            let itemSize = Types.getSize(o[i]);
            if(!Type.hasNot(itemSize)) {
                size+= itemSize;
            }
        }
        return size;
    },
    equals: (src: any[], dest: any[]): boolean => {
        if(!src || !dest) return src === dest;
        let isEqual = Types.getType(src) === Types.getType(dest);
        if(!isEqual) return false;
        if(src.length !== dest.length) return false;
        for(let i = 0; i < src.length; i++) {
            let type1 = Types.getType(src[i]);
            if(!type1.equals(src[i], dest[i])) {
                return false;
            }
        }
        return true;
    }
});

Types.Map[Types.ToString.Object] = new Type<Object>({
    hasNot: (o: Object): boolean => {
        for(let key in o) {
            if(hasOwnProperty.call(o, key)) {
                return false;
            }
        }
        return true;
    },
    isPrimitive: () => false,
    getClone: (o: Object, ignoreList?: string[]): Object => {
        let cloneObject = {};
        for(let key in o) {
            if(hasOwnProperty.call(o, key)) {
                cloneObject[key] = Types.getClone(o[key], ignoreList);
            }
        }
        return cloneObject;
    },
    getSize: (o: Object): number => {
        let size = 0;
        for(let key in o) {
            if(hasOwnProperty.call(o, key)) {
                size += 2 * key.length;
                size += Types.getSize(o[key]);
            }
        }
        return size;
    },
    equals: (src: Object, dest: Object): boolean => {
        if(!src || !dest) return src === dest;
        let isEqual = Types.getType(src) === Types.getType(dest);
        if(!isEqual) return false;
        for(let key in src) {
            if(hasOwnProperty.call(src, key)) {
                let type1 = Types.getType(src[key]);
                if(!type1.equals(src[key], dest[key])) {
                    return false;
                }
            }
        }
        return isEqual;
    }
});


