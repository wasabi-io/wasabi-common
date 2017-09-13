interface Object {
    assign(target: any, ...varArgs: any[]): Object;
}

if (typeof Object.assign != "function") {
    Object.assign = function (target: any, ...varArgs: any[]): Object {
        // .length of function is 2
        if (target == null) { // TypeError if undefined or null
            throw new TypeError("Cannot convert undefined or null to object");
        }
        let to = Object(target);
        for (let index = 1; index < arguments.length; index++) {
            let nextSource = arguments[index];
            if (nextSource != null) { // Skip over if undefined or null
                for (let nextKey in nextSource) {
                    // Avoid bugs when hasOwnProperty is shadowed
                    if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
        }
        return to;
    };
}

// Fix Function#name on browsers that do not support it (IE):
let emptyFn: any = (function f() {
});
if (!emptyFn.name) {
    Object.defineProperty(Function.prototype, "name", {
        get: function () {
            let name = (this.toString().match(/^function\s*([^\s(]+)/) || [])[1];
            name = name || "";
            // For better performance only parse once, and then cache the
            // result through a new accessor for repeated access.
            Object.defineProperty(this, "name", {value: name});
            return name;
        }
    });
}

