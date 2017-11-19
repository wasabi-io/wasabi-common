import {assert} from "chai";
import Assertions from "wasabi-common/lib/util/Assertions";

/* tslint:disable no-unused-expression */
const tryBlock = (success: () => void, error: () => void) => {
    if (success) {
        try {
            success();
            assert.isOk(true, "All methods success");
        } catch (e) {
            assert.isNotOk(false, e);
        }
    }

    if (error) {
        try {
            error();
            assert.isNotOk(false, "All methods must be fail ! ");
        } catch (e) {
            assert.isOk(true, e);
        }
    }
};

describe("util/Assertions", () => {
    it("isPrimitive", () => {
        tryBlock(
            () => {
                Assertions.isPrimitive("");
                Assertions.isPrimitive("Danina");
                Assertions.isPrimitive(true);
                Assertions.isPrimitive(false);
                Assertions.isPrimitive(0);
                Assertions.isPrimitive(6);
                Assertions.isPrimitive(-10);
                assert.isOk(true, "All methods success");
            },
            () => {
                Assertions.isPrimitive(new Date());
                Assertions.isPrimitive([]);
                Assertions.isPrimitive({});
                Assertions.isPrimitive(() => {
                    /* */
                });
                Assertions.isPrimitive(new RegExp(".*"));
            },
        );
    });

    it("isJsonType", () => {
        tryBlock(
            () => {
                Assertions.isJsonType("");
                Assertions.isJsonType("Danina");
                Assertions.isJsonType(true);
                Assertions.isJsonType(false);
                Assertions.isJsonType(0);
                Assertions.isJsonType(6);
                Assertions.isJsonType(-10);
                Assertions.isJsonType([]);
                Assertions.isJsonType({});
            },
            () => {
                Assertions.isJsonType(new Date());
                Assertions.isJsonType(() => {
                    /* */
                });
                Assertions.isJsonType(new RegExp(".*"));
            },
        );
    });

    it("isNativeType", () => {
        tryBlock(
            () => {
                Assertions.isNativeType("");
                Assertions.isNativeType("Danina");
                Assertions.isNativeType(true);
                Assertions.isNativeType(false);
                Assertions.isNativeType(0);
                Assertions.isNativeType(6);
                Assertions.isNativeType(-10);
                Assertions.isNativeType(new Date());
                Assertions.isNativeType(new RegExp(".*"));
                Assertions.isNativeType([]);
                Assertions.isNativeType({});
                Assertions.isNativeType(() => {
                    /* */
                });
                Assertions.isNativeType(new RegExp(".*"));
            },
            null,
        );
    });

    it("isObject", () => {
        tryBlock(
            () => {
                Assertions.isObject({});
            },
            () => {
                Assertions.isObject("");
                Assertions.isObject("Danina");
                Assertions.isObject(true);
                Assertions.isObject(false);
                Assertions.isObject(0);
                Assertions.isObject(6);
                Assertions.isObject(-10);
                Assertions.isObject(new Date());
                Assertions.isObject([]);
            },
        );
    });

    it("isNumber", () => {
        tryBlock(
            () => {
                Assertions.isNumber(0);
                Assertions.isNumber(6);
                Assertions.isNumber(-10);
            },
            () => {
                Assertions.isNumber("");
                Assertions.isNumber("Danina");
                Assertions.isNumber(true);
                Assertions.isNumber(false);
                Assertions.isNumber(new Date());
                Assertions.isNumber([]);
                Assertions.isNumber({});
            },
        );
    });

    it("isBoolean", () => {
        tryBlock(
            () => {
                Assertions.isBoolean(true);
                Assertions.isBoolean(false);
            },
            () => {
                Assertions.isBoolean("");
                Assertions.isBoolean("Danina");
                Assertions.isBoolean(0);
                Assertions.isBoolean(6);
                Assertions.isBoolean(-10);
                Assertions.isBoolean(new Date());
                Assertions.isBoolean([]);
                Assertions.isBoolean({});
            },
        );
    });

    it("isArray", () => {
        tryBlock(
            () => {
                Assertions.isArray([]);
            },
            () => {
                Assertions.isArray("");
                Assertions.isArray("Danina");
                Assertions.isArray(true);
                Assertions.isArray(false);
                Assertions.isArray(0);
                Assertions.isArray(6);
                Assertions.isArray(-10);
                Assertions.isArray(new Date());
                Assertions.isArray({});
            },
        );
    });

    it("isString", () => {
        tryBlock(
            () => {
                Assertions.isString("");
                Assertions.isString("Danina");
            },
            () => {
                Assertions.isString(true);
                Assertions.isString(false);
                Assertions.isString(0);
                Assertions.isString(6);
                Assertions.isString(-10);
                Assertions.isString(new Date());
                Assertions.isString([]);
                Assertions.isString({});
            },
        );
    });

    it("isDate", () => {
        tryBlock(
            () => {
                Assertions.isDate(new Date());
            },
            () => {
                Assertions.isDate("");
                Assertions.isDate("Danina");
                Assertions.isDate(true);
                Assertions.isDate(false);
                Assertions.isDate(0);
                Assertions.isDate(6);
                Assertions.isDate(-10);
                Assertions.isDate([]);
                Assertions.isDate({});
            },
        );

    });

    it("isRegExp", () => {
        tryBlock(
            () => {
                Assertions.isRegExp(new RegExp(".*"));
            },
            () => {
                Assertions.isRegExp("");
                Assertions.isRegExp("Danina");
                Assertions.isRegExp(true);
                Assertions.isRegExp(false);
                Assertions.isRegExp(0);
                Assertions.isRegExp(6);
                Assertions.isRegExp(-10);
                Assertions.isRegExp(new Date());
                Assertions.isRegExp([]);
                Assertions.isRegExp({});
            },
        );
    });

    it("isNull", () => {
        tryBlock(
            () => {
                Assertions.isNull(null);
            },
            () => {
                Assertions.isNull("");
                Assertions.isNull("Danina");
                Assertions.isNull(true);
                Assertions.isNull(false);
                Assertions.isNull(0);
                Assertions.isNull(6);
                Assertions.isNull(-10);
                Assertions.isNull(new Date());
                Assertions.isNull([]);
                Assertions.isNull({});
            },
        );
    });

    it("isFunction", () => {
        tryBlock(
            () => {
                Assertions.isFunction(() => {
                    /* */
                });
            },
            () => {
                Assertions.isFunction("");
                Assertions.isFunction("Danina");
                Assertions.isFunction(true);
                Assertions.isFunction(false);
                Assertions.isFunction(0);
                Assertions.isFunction(6);
                Assertions.isFunction(-10);
                Assertions.isFunction(new Date());
                Assertions.isFunction([]);
                Assertions.isFunction({});
            },
        );
    });

    it("isUndefined", () => {
        tryBlock(
            () => {
                Assertions.isUndefined(undefined);
            },
            () => {
                Assertions.isUndefined(null);
                Assertions.isUndefined("");
                Assertions.isUndefined("Danina");
                Assertions.isUndefined(true);
                Assertions.isUndefined(false);
                Assertions.isUndefined(0);
                Assertions.isUndefined(6);
                Assertions.isUndefined(-10);
                Assertions.isUndefined(new Date());
                Assertions.isUndefined([]);
                Assertions.isUndefined({});
            },
        );
    });

    it("has", () => {
        tryBlock(
            () => {
                Assertions.has("Danina");
                Assertions.has(true);
                Assertions.has(false);
                Assertions.has(0);
                Assertions.has(6);
                Assertions.has(-10);
                Assertions.has(new Date());
            },
            () => {
                Assertions.has(null);
                Assertions.has(undefined);
                Assertions.has("");
                Assertions.has([]);
                Assertions.has({});
            },
        );
    });

    it("hasNot", () => {
        tryBlock(
            () => {
                Assertions.hasNot(null);
                Assertions.hasNot(undefined);
                Assertions.hasNot("");
                Assertions.hasNot([]);
                Assertions.hasNot({});
            },
            () => {
                Assertions.hasNot("Danina");
                Assertions.hasNot(true);
                Assertions.hasNot(false);
                Assertions.hasNot(0);
                Assertions.hasNot(6);
                Assertions.hasNot(-10);
                Assertions.hasNot(new Date());
            },
        );
    });

    it("equals", () => {
        tryBlock(
            () => {
                // string equals
                Assertions.equals("", "");
                Assertions.equals("Example", "Example");
                // boolean equals
                Assertions.equals(true, true);
                Assertions.equals(false, false);
                // number equals
                Assertions.equals(0, 0);
                // array equals
                Assertions.equals([], []);
                Assertions.equals(["a1", "a2"], ["a1", "a2"]);
                // object
                Assertions.equals({}, {});
                Assertions.equals({a1: "example"}, {a1: "example"});
            },
            () => {
                // string equals
                Assertions.equals("Example", "");
                Assertions.equals("Example", false);
                Assertions.equals("Example", true);
                Assertions.equals("Example", null);
                Assertions.equals("Example", undefined);
                Assertions.equals("Example", []);
                Assertions.equals("Example", {});
                // boolean equals
                Assertions.equals(true, false);
                Assertions.equals(true, "");
                Assertions.equals(true, null);
                Assertions.equals(true, undefined);
                Assertions.equals(true, []);
                Assertions.equals(true, {});
                // number equals
                Assertions.equals(2, 0);
                Assertions.equals(0, "Example");
                Assertions.equals(0, "");
                Assertions.equals(0, false);
                Assertions.equals(0, true);
                Assertions.equals(0, null);
                Assertions.equals(0, undefined);
                Assertions.equals(0, []);
                Assertions.equals(0, {});
                // array equals
                Assertions.equals(["a1", "a2"], "Example");
                Assertions.equals(["a1", "a2"], "");
                Assertions.equals(["a1", "a2"], false);
                Assertions.equals(["a1", "a2"], true);
                Assertions.equals(["a1", "a2"], null);
                Assertions.equals(["a1", "a2"], undefined);
                Assertions.equals(["a1", "a2"], []);
                Assertions.equals(["a1", "a2"], {});
                // object
                Assertions.equals({a1: "example"}, "Example");
                Assertions.equals({a1: "example"}, "");
                Assertions.equals({a1: "example"}, false);
                Assertions.equals({a1: "example"}, true);
                Assertions.equals({a1: "example"}, null);
                Assertions.equals({a1: "example"}, undefined);
                Assertions.equals({a1: "example"}, []);
                Assertions.equals({a1: "example"}, {});
            },
        );
    });
});
