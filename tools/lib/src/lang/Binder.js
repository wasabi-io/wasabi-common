"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Binder = /** @class */ (function () {
    /**
     *
     */
    function Binder() {
        Binder.bindAll(this);
    }
    /**
     *
     * @param instance
     * @param {string} key
     * @param {Function} fn
     */
    Binder.bind = function (instance, key, fn) {
        if (!fn) {
            fn = instance[key];
        }
        instance[key] = fn.bind(instance);
    };
    /**
     *
     * @param instance
     * @param {string} keys
     */
    Binder.bindAll = function (instance) {
        var keys = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            keys[_i - 1] = arguments[_i];
        }
        if (keys.length === 0) {
            keys = Object.getPrototypeOf(instance);
        }
        for (var key in keys) {
            var member = instance[key];
            if (key !== "constructor" && typeof member === "function") {
                Binder.bind(instance, key, member);
            }
        }
    };
    return Binder;
}());
exports.default = Binder;
