import Type, {IType} from "../lang/Type";
import "../prototype";

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
const UnknownType = new Type<any>({
    getClone: (o: any, ignoreList?: string[]): any => {
        return o;
    },
    getSize: (o: any): number => {
        let size = 0;
        for (const key in o) {
            if (hasOwnProperty.call(o, key)) {
                size += 2 * key.length;
                size += Types.getSize(o[key]);
            }
        }
        return size;
    },
    hasNot: (o: any) => Type.hasNot(o),
    isJsonType: () => false,
    isNativeType: () => false,
    isPrimitive: () => false,
});

export interface TypesMapProps {
    [key: string]: IType<any>;
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
        Array: "[object Array]",
        Boolean: "[object Boolean]",
        Date: "[object Date]",
        Function: "[object Function]",
        Null: "[object Null]",
        Number: "[object Number]",
        Object: "[object Object]",
        RegExp: "[object RegExp]",
        String: "[object String]",
        Undefined: "[object Undefined]",
    };
    /**
     * Gets type name of the given value.
     * @param o
     * @return {string}
     */
    public static getRawName = (o: any): string => {
        return Type.getRawName(o);
    }
    /**
     * Gets type name of the given value.
     * @param o
     * @return {string}
     */
    public static getName = (o: any): string => {
        return Type.getName(o);
    }

    /**
     * Finds @see Type by given object
     * @param {any} o
     * @return {IType<any>} provides most used operation on type
     * @public
     */
    public static getType(o: any): IType<any> {
        const type = Types.Map[Type.getRawName(o)];
        return type ? type : UnknownType;
    }

    /**
     * Finds @see Type by given name of object
     * @param {string} name
     * @return {IType<any>}
     * @public
     */
    public static getTypeByName(name: string): IType<any> {
        const type = Types.Map["[object " + name + "]"];
        return type ? type : UnknownType;
    }

    /**
     * finds @see Type by given name of object
     * @param {any} o
     * @param {string[]} ignoreList
     * @returns {any}
     */
    public static getClone<T>(o: T, ignoreList?: string[]): T {
        const type = Types.getType(o);
        if (ignoreList && ignoreList.indexOf(type.getName(o))) {
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
    public static equals(src: any, dest: any, stack?: any[]): boolean {
        return Types.getType(src).equals(src, dest);
    }

    /**
     * Checks value is empty or not by type.
     * @param o
     * @return {boolean}
     */
    public static hasNot(o: any) {
        return Types.getType(o).hasNot(o);
    }

    /**
     * add new types which implements { @see IType<any> }
     * @param obj
     * @param type
     */
    public static addType<T>(obj: string | T, type: IType<T>) {
        if (!type) {
            throw new Error("Given type ( " + type + " ) is empty or null !");
        }
        const key = typeof obj === "string" ? "[object " + obj + "]" : Type.getRawName(obj);
        const newType = Types.Map[key];
        if (newType) {
            throw new Error("You cannot add some types. That's used by core code.");
        }
        Types.Map[key] = type;
    }
}

/**
 * Null or Undefined Type
 * @type {Type<any>}
 */
const nullOrUndefined = new Type<any>({
    hasNot: () => true,
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
    getSize: (o: number): number => 8,
});

// Boolean Type
Types.Map[Types.ToString.Boolean] = new Type<boolean>({
    getSize: (o: boolean): number => 4,
});

// String type
Types.Map[Types.ToString.String] = new Type<string>({
    getClone: (o: string): string => {
        return String(o);
    },
    getSize: (o: string): number => {
        return 2 * o.length;
    },
    hasNot: (o: string) => Type.hasNot(o) || o.trim() === "",
});

// Date type
Types.Map[Types.ToString.Date] = new Type<Date>({
    getClone: (o: Date): Date => {
        return new Date(o.getTime());
    },
    isJsonType: (): boolean => false,
    isPrimitive: (): boolean => false,
});

// Date type
Types.Map[Types.ToString.RegExp] = new Type<RegExp>({
    getClone: (o: RegExp): RegExp => {
        return new RegExp(o.source);
    },
    isJsonType: (): boolean => false,
    isPrimitive: (): boolean => false,
});

// String type
Types.Map[Types.ToString.Function] = new Type<Function>({
    getSize: (o: Function): number => {
        return (o as any).toString().length * 2;
    },
    isJsonType: (): boolean => false,
    isPrimitive: (): boolean => false,
});

const equals = (src: any, dest: any, stack?: any[]) => {
    if (!src || !dest) return src === dest;
    const keys = Object.keys(dest);
    let keyCount = 0;
    const s = stack || [];
    if (s.indexOf(src) !== -1) {
        return true;
    }
    s.push(src);
    for (const key in src) {
        if (src.hasOwnProperty(key)) {
            if (!dest.hasOwnProperty(key)) return false;
            if (!Types.equals(src[key], dest[key], s)) {
                return false;
            }
            keyCount = keyCount + 1;
        }
    }
    return keys.length === keyCount;
};

// Array Type
Types.Map[Types.ToString.Array] = new Type<any[]>({
    equals,
    getClone: (o: any[], ignoreList?: string[]): any[] => {
        const cloneArray = [];
        for (let i = 0; i < o.length; i = i + 1) {
            cloneArray[i] = Types.getClone(o[i], ignoreList);
        }
        return cloneArray;
    },
    getSize: (o: any[]): number => {
        let size = 0;
        for (const item of o) {
            const itemSize = Types.getSize(item);
            if (!Type.hasNot(itemSize)) {
                size += itemSize;
            }
        }
        return size;
    },
    hasNot: (o: any[]) => Type.hasNot(o) || o.length === 0,
    isPrimitive: () => false,
});

Types.Map[Types.ToString.Object] = new Type<any>({
    equals,
    getClone: (o: any, ignoreList?: string[]): any => {
        const cloneObject: any = {};
        for (const key in o) {
            if (hasOwnProperty.call(o, key)) {
                cloneObject[key] = Types.getClone(o[key], ignoreList);
            }
        }
        return cloneObject;
    },
    getSize: (o: any): number => {
        let size = 0;
        for (const key in o) {
            if (hasOwnProperty.call(o, key)) {
                size += 2 * key.length;
                size += Types.getSize(o[key]);
            }
        }
        return size;
    },
    hasNot: (o: any): boolean => {
        for (const key in o) {
            if (hasOwnProperty.call(o, key)) {
                return false;
            }
        }
        return true;
    },
    isPrimitive: () => false,
});
