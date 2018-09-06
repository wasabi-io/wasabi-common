import "../prototype";
import * as deepEquals from "fast-deep-equal";

const startIndex: number = "[object ".length;

/**
 * get Type of instance as string like "String", "Number"...
 * @param value
 * @return {string}
 */
const getType = (value: any): string => {
    const type = Object.prototype.toString.call(value);
    return type.substring(startIndex, type.length - 1);
};

/**
 * Checks value is (null, undefined) or not
 * @param value
 * @return {boolean}
 */
const has = (value: any): boolean => {
    return value !== null && typeof value !== "undefined";
};

const asEs6Module = (module: any, name?: string) => {
    if (module.__esModule) {
        if (has(name)) {
            return module[name];
        }
        if (module.default) {
            return module.default;
        }
        // Checks one module is exist or not.
        let count = 0;
        let moduleKey;
        for (const key in module) {
            if (module.hasOwnProperty(key) && key !== "__esModule") {
                count = count + 1;
                moduleKey = key;
            }
        }
        if (count === 1) {
            return module[moduleKey];
        }
    }
    return module;
};

const getOrDefault = <T>(value: T, defaultValue: T): T => {
    return has(value) ? value : defaultValue;
};

export {
    getType,
    has,
    asEs6Module,
    getOrDefault,
    deepEquals
};
