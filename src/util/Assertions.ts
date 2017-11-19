import Validations from "./Validations";

/**
 * Provides some assert operations.
 * Use {@link Validations } for only validations.
 * @export
 * @class Assertions
 * @static
 */
export default class Assertions {

    /**
     * Asserts the given parameter type is Primitive or not. Is not primitive then throw error.
     * @param o
     * @static
     * @throws new Error(`${o} is not primitive type !`)
     */
    public static isPrimitive(o: any) {
        if (!Validations.isPrimitive(o)) {
            throw new Error(`${o} is not primitive type !`);
        }
    }

    /**
     * Asserts the given parameter type is JsonType or not. Is not JsonType then throw error.
     * @param o
     * @static
     * @throws new Error(`${o} is not json type !`)
     */
    public static isJsonType(o: any) {
        if (!Validations.isJsonType(o)) {
            throw new Error(`${o} is not json type !`);
        }
    }

    /**
     * Asserts the given parameter type is NativeType or not. It is not NativeType then throw error.
     * @param o
     * @static
     * @throws new Error(`${o} is not native type !`)
     */
    public static isNativeType(o: any) {
        if (!Validations.isNativeType(o)) {
            throw new Error(`${o} is not native type !`);
        }
    }

    /**
     * Asserts the given parameter type is Object or not. It is not Object then throw error.
     * @param o
     * @static
     * @throws new Error(`${o} type is not Object`)
     */
    public static isObject(o: any) {
        if (!Validations.isObject(o)) {
            throw new Error(`${o} type is not Object`);
        }
    }

    /**
     * Asserts the given parameter type is Number or not. It is not Number then throw error.
     * @param o
     * @static
     * @throws new Error(`${o} type is not Number`)
     */
    public static isNumber(o: any) {
        if (!Validations.isNumber(o)) {
            throw new Error(`${o} type is not Number`);
        }
    }

    /**
     * Asserts the given parameter type is Boolean or not. It is not Boolean then throw error.
     * @param o
     * @static
     * @throws new Error(`${o} type is not Boolean`)
     */
    public static isBoolean(o: any) {
        if (!Validations.isBoolean(o)) {
            throw new Error(`${o} type is not Boolean`);
        }
    }

    /**
     * Asserts the given parameter type is Array or not. It is not Array then throw error.
     * @param o
     * @static
     * @throws new Error(`${o} type is not Array`)
     */
    public static isArray(o: any) {
        if (!Validations.isArray(o)) {
            throw new Error(`${o} type is not Array`);
        }
    }

    /**
     * Asserts the given parameter type is String or not. It is not String then throw error.
     * @param o
     * @static
     * @throws new Error(`${o} type is not String`)
     */
    public static isString(o: any) {
        if (!Validations.isString(o)) {
            throw new Error(`${o} type is not String`);
        }
    }

    /**
     * Asserts the given parameter type is Date or not. It is not Date then throw error.
     * @param o
     * @static
     * @throws new Error(`${o} type is not Date`)
     */
    public static isDate(o: any) {
        if (!Validations.isDate(o)) {
            throw new Error(`${o} type is not Date`);
        }
    }

    /**
     * Asserts the given parameter type is RegExp or not. It is not RegExp then throw error.
     * @param o
     * @static
     * @throws new Error(`${o} type is not RegExp`)
     */
    public static isRegExp(o: any) {
        if (!Validations.isRegExp(o)) {
            throw new Error(`${o} type is not RegExp`);
        }
    }

    /**
     * Asserts the given parameter type is Null or not. It is notNull then throw error.
     * @param o
     * @static
     * @throws new Error(`${o} type is not Null`)
     */
    public static isNull(o: any) {
        if (!Validations.isNull(o)) {
            throw new Error(`${o} type is not Null`);
        }
    }

    /**
     * Asserts the given parameter type is Function or not. It is not Function then throw error.
     * @param o
     * @static
     * @throws new Error(`${o} type is not Function`)
     */
    public static isFunction(o: any) {
        if (!Validations.isFunction(o)) {
            throw new Error(`${o} type is not Function`);
        }
    }

    /**
     * Asserts the given parameter type is Undefined or not. It is not Undefined then throw error.
     * @param o
     * @throws new Error(`${o} type is not undefined`)
     */
    public static isUndefined(o: any) {
        if (!Validations.isUndefined(o)) {
            throw new Error(`${o} type is not undefined`);
        }
    }

    /**
     * Asserts the given parameter has value or not. It has not value then throw error.
     * @param o
     * @static
     * @throws new Error(`${o} has not value`)
     */
    public static has(o: any) {
        if (Validations.hasNot(o)) {
            throw new Error(`${o} has not value`);
        }
    }

    /**
     * Asserts the given parameter has value or not. It has value then throw error.
     * @param o
     * @static
     * @throws new Error(`${o} has value`)
     */
    public static hasNot(o: any) {
        if (Validations.has(o)) {
            throw new Error(`${o} has value`);
        }
    }

    /**
     * Asserts the given src parameter equals the given destination parameter or not. if src not equals destination then throw error.
     * @param src
     * @param dest
     * @static
     * @throws new Error(`${src} is not equals ${dest}`)
     */
    public static equals(src: any, dest: any) {
        if (!Validations.equals(src, dest)) {
            throw new Error(`${src} is not equals ${dest}`);
        }
    }
}
