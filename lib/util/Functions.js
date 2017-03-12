"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var startIndex = "[object ".length;
var getType = function (value) {
    var type = Object.prototype.toString.call(value);
    return type.substring(startIndex, type.length - 1);
};
exports.getType = getType;
var has = function (value) {
    return value !== null && typeof value !== "undefined";
};
exports.has = has;
var requireEs6 = function (id) {
    var module = require(id);
    if (module.__esModule) {
        if (module.default) {
            return module.default;
        }
        var count = 0;
        var moduleKey = void 0;
        for (var key in module) {
            if (module.hasOwnProperty(key)) {
                if (count === 1) {
                    count = -1;
                    break;
                }
                count++;
                moduleKey = key;
            }
        }
        if (count !== -1) {
            return module[moduleKey];
        }
    }
    return module;
};
exports.requireEs6 = requireEs6;
//# sourceMappingURL=Functions.js.map