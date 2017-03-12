"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../prototype");
// Native Components
var RESTRICTED_TYPES = [
    "Object",
    "ReactComponent",
    "Component",
    "Class",
    "Date",
    "File"
];
// JSX members
var RESTRICTED_JSX_TYPES = [
    "constructor",
    "componentWillMount",
    "render",
    "componentDidMount",
    "componentWillReceiveProps",
    "shouldComponentUpdate",
    "componentWillUpdate",
    "render",
    "componentDidUpdate",
    "componentWillUnmount",
    "setState",
    "forceUpdate",
    "defaultProps",
    "displayName",
    "propTypes",
    "props",
    "state",
    "isMounted",
    "replaceState"
];
/**
 * A class which  implements __bindAll which binds all methods to the instance.
 * Essential to use at all classes if you don't want to use fat-arrows or manuel bindings.
 * @export
 * @class Class
 */
var Class = (function () {
    function Class() {
        Class.bindAll(this);
    }
    /**
     * Binds all methods which is not a exist in restricted list
     * @param {Object} instance to bind
     */
    Class.bindAll = function (instance) {
        var parent = Object.getPrototypeOf(instance);
        var bindedNames = [];
        while (parent != null && RESTRICTED_TYPES.indexOf(parent.constructor.name) === -1) {
            var names = Object.getOwnPropertyNames(parent);
            for (var i = 0; i < names.length; i++) {
                var name_1 = names[i];
                if (!bindedNames[name_1] && typeof parent[name_1] === "function" && RESTRICTED_JSX_TYPES.indexOf(name_1) === -1) {
                    instance[name_1] = parent[name_1].bind(instance);
                    bindedNames[name_1] = true;
                }
            }
            parent = Object.getPrototypeOf(parent);
        }
    };
    return Class;
}());
exports.default = Class;
//# sourceMappingURL=Class.js.map