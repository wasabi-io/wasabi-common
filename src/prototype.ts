interface Object {
    assign(target: any, ...varArgs: any[]): Object;
}

if (typeof Object.assign !== "function") {
    Object.assign = (target: any, ...varArgs: any[]): Object => {
        // .length of function is 2
        if (target == null) { // TypeError if undefined or null
            throw new TypeError("Cannot convert undefined or null to object");
        }
        const to = Object(target);
        for (const nextSource of varArgs) {
            if (nextSource != null) { // Skip over if undefined or null
                for (const nextKey in nextSource) {
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
