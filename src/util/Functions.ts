import "../prototype";
const startIndex: number = "[object ".length;

/**
 * get Type of instance as string like "String", "Number"...
 * @param value
 * @return {string}
 */
const getType = (value: any): string => {
    let type = Object.prototype.toString.call(value);
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
    if(module.__esModule) {
        if(has(name)) {
            return module[name];
        } else if(module.default) {
            return module.default;
        }
        // Checks one module is exist or not.
        let count = 0;
        let moduleKey;
        for(let key in module) {
            if(module.hasOwnProperty(key) && key !== "__esModule") {
                count++;
                moduleKey = key;
            }
        }
        if(count === 1) {
            return module[moduleKey];
        }
    }
    return module;
};
/**
 * require Es6 modules by some rules.
 * if module defined in default then return default module.
 * @param id
 * @param name
 * @return {any}
 */
const requireEs6 = (id: string, name?: string) => {
    let module = require(id);
    return asEs6Module(module, name);
};

export {
    getType,
    has,
    asEs6Module,
    requireEs6
}