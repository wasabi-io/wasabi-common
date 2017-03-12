const startIndex: number = "[object ".length;
const getType = (value): string => {
    let type = Object.prototype.toString.call(value);
    return type.substring(startIndex, type.length - 1);
};

const has = (value): boolean => {
    return value !== null && typeof value !== "undefined";
};

const requireEs6 = (id: string) => {
    let module = require(id);
    if(module.__esModule) {
        if(module.default) {
            return module.default;
        }
        let count = 0;
        let moduleKey;
        for(let key in module) {
            if(module.hasOwnProperty(key)) {
                if(count === 1) {
                    count = -1;
                    break;
                }
                count++;
                moduleKey = key;
            }
        }
        if(count !== -1) {
            return module[moduleKey];
        }
    }
    return module;
};

export {
    getType,
    has,
    requireEs6
}