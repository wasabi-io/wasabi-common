import Assertions from "util/Assertions"
import { expect } from "chai";

describe("util/Assertions", () => {
    it("isPrimitive", () => {
        expect(Assertions.isPrimitive("")).to.be.true;
        expect(Assertions.isPrimitive("Danina")).to.be.true;
        expect(Assertions.isPrimitive(true)).to.be.true;
        expect(Assertions.isPrimitive(false)).to.be.true;
        expect(Assertions.isPrimitive(0)).to.be.true;
        expect(Assertions.isPrimitive(6)).to.be.true;
        expect(Assertions.isPrimitive(-10)).to.be.true;
        expect(Assertions.isPrimitive(new Date())).to.be.false;
        expect(Assertions.isPrimitive([])).to.be.false;
        expect(Assertions.isPrimitive({})).to.be.false;
        expect(Assertions.isPrimitive(function () {})).to.be.false;
        expect(Assertions.isPrimitive(new RegExp(".*"))).to.be.false;
    });

    it("isJsonType", () => {
        expect(Assertions.isJsonType("")).to.be.true;
        expect(Assertions.isJsonType("Danina")).to.be.true;
        expect(Assertions.isJsonType(true)).to.be.true;
        expect(Assertions.isJsonType(false)).to.be.true;
        expect(Assertions.isJsonType(0)).to.be.true;
        expect(Assertions.isJsonType(6)).to.be.true;
        expect(Assertions.isJsonType(-10)).to.be.true;
        expect(Assertions.isJsonType(new Date())).to.be.false;
        expect(Assertions.isJsonType([])).to.be.true;
        expect(Assertions.isJsonType({})).to.be.true;
        expect(Assertions.isJsonType(function () {})).to.be.false;
        expect(Assertions.isJsonType(new RegExp(".*"))).to.be.false;
    });

    it("isNativeType", () => {
        expect(Assertions.isNativeType("")).to.be.true;
        expect(Assertions.isNativeType("Danina")).to.be.true;
        expect(Assertions.isNativeType(true)).to.be.true;
        expect(Assertions.isNativeType(false)).to.be.true;
        expect(Assertions.isNativeType(0)).to.be.true;
        expect(Assertions.isNativeType(6)).to.be.true;
        expect(Assertions.isNativeType(-10)).to.be.true;
        expect(Assertions.isNativeType(new Date())).to.be.true;
        expect(Assertions.isNativeType(new RegExp(".*"))).to.be.true;
        expect(Assertions.isNativeType([])).to.be.true;
        expect(Assertions.isNativeType({})).to.be.true;
        expect(Assertions.isNativeType(function () {})).to.be.true;
        expect(Assertions.isNativeType(new RegExp(".*"))).to.be.true;
    });

    it("isObject", () => {
        expect(Assertions.isObject("")).to.be.false;
        expect(Assertions.isObject("Danina")).to.be.false;
        expect(Assertions.isObject(true)).to.be.false;
        expect(Assertions.isObject(false)).to.be.false;
        expect(Assertions.isObject(0)).to.be.false;
        expect(Assertions.isObject(6)).to.be.false;
        expect(Assertions.isObject(-10)).to.be.false;
        expect(Assertions.isObject(new Date())).to.be.false;
        expect(Assertions.isObject([])).to.be.false;
        expect(Assertions.isObject({})).to.be.true;
    });

    it("isNumber", () => {
        expect(Assertions.isNumber("")).to.be.false;
        expect(Assertions.isNumber("Danina")).to.be.false;
        expect(Assertions.isNumber(true)).to.be.false;
        expect(Assertions.isNumber(false)).to.be.false;
        expect(Assertions.isNumber(0)).to.be.true;
        expect(Assertions.isNumber(6)).to.be.true;
        expect(Assertions.isNumber(-10)).to.be.true;
        expect(Assertions.isNumber(new Date())).to.be.false;
        expect(Assertions.isNumber([])).to.be.false;
        expect(Assertions.isNumber({})).to.be.false;
    });

    it("isBoolean", () => {
        expect(Assertions.isBoolean("")).to.be.false;
        expect(Assertions.isBoolean("Danina")).to.be.false;
        expect(Assertions.isBoolean(true)).to.be.true;
        expect(Assertions.isBoolean(false)).to.be.true;
        expect(Assertions.isBoolean(0)).to.be.false;
        expect(Assertions.isBoolean(6)).to.be.false;
        expect(Assertions.isBoolean(-10)).to.be.false;
        expect(Assertions.isBoolean(new Date())).to.be.false;
        expect(Assertions.isBoolean([])).to.be.false;
        expect(Assertions.isBoolean({})).to.be.false;
    });

    it("isArray", () => {
        expect(Assertions.isArray("")).to.be.false;
        expect(Assertions.isArray("Danina")).to.be.false;
        expect(Assertions.isArray(true)).to.be.false;
        expect(Assertions.isArray(false)).to.be.false;
        expect(Assertions.isArray(0)).to.be.false;
        expect(Assertions.isArray(6)).to.be.false;
        expect(Assertions.isArray(-10)).to.be.false;
        expect(Assertions.isArray(new Date())).to.be.false;
        expect(Assertions.isArray([])).to.be.true;
        expect(Assertions.isArray({})).to.be.false;
    });

    it("isString", () => {
        expect(Assertions.isString("")).to.be.true;
        expect(Assertions.isString("Danina")).to.be.true;
        expect(Assertions.isString(true)).to.be.false;
        expect(Assertions.isString(false)).to.be.false;
        expect(Assertions.isString(0)).to.be.false;
        expect(Assertions.isString(6)).to.be.false;
        expect(Assertions.isString(-10)).to.be.false;
        expect(Assertions.isString(new Date())).to.be.false;
        expect(Assertions.isString([])).to.be.false;
        expect(Assertions.isString({})).to.be.false;
    });

    it("isDate", () => {
        expect(Assertions.isDate("")).to.be.false;
        expect(Assertions.isDate("Danina")).to.be.false;
        expect(Assertions.isDate(true)).to.be.false;
        expect(Assertions.isDate(false)).to.be.false;
        expect(Assertions.isDate(0)).to.be.false;
        expect(Assertions.isDate(6)).to.be.false;
        expect(Assertions.isDate(-10)).to.be.false;
        expect(Assertions.isDate(new Date())).to.be.true;
        expect(Assertions.isDate([])).to.be.false;
        expect(Assertions.isDate({})).to.be.false;
    });

    it("isRegExp", () => {
        expect(Assertions.isRegExp(new RegExp(".*"))).to.be.true;
        expect(Assertions.isRegExp("")).to.be.false;
        expect(Assertions.isRegExp("Danina")).to.be.false;
        expect(Assertions.isRegExp(true)).to.be.false;
        expect(Assertions.isRegExp(false)).to.be.false;
        expect(Assertions.isRegExp(0)).to.be.false;
        expect(Assertions.isRegExp(6)).to.be.false;
        expect(Assertions.isRegExp(-10)).to.be.false;
        expect(Assertions.isRegExp(new Date())).to.be.false;
        expect(Assertions.isRegExp([])).to.be.false;
        expect(Assertions.isRegExp({})).to.be.false;
    });

    it("isNull", () => {
        expect(Assertions.isNull(null)).to.be.true;
        expect(Assertions.isNull("")).to.be.false;
        expect(Assertions.isNull("Danina")).to.be.false;
        expect(Assertions.isNull(true)).to.be.false;
        expect(Assertions.isNull(false)).to.be.false;
        expect(Assertions.isNull(0)).to.be.false;
        expect(Assertions.isNull(6)).to.be.false;
        expect(Assertions.isNull(-10)).to.be.false;
        expect(Assertions.isNull(new Date())).to.be.false;
        expect(Assertions.isNull([])).to.be.false;
        expect(Assertions.isNull({})).to.be.false;
    });

    it("isFunction", () => {
        expect(Assertions.isFunction(function () {

        })).to.be.true;
        expect(Assertions.isFunction("")).to.be.false;
        expect(Assertions.isFunction("Danina")).to.be.false;
        expect(Assertions.isFunction(true)).to.be.false;
        expect(Assertions.isFunction(false)).to.be.false;
        expect(Assertions.isFunction(0)).to.be.false;
        expect(Assertions.isFunction(6)).to.be.false;
        expect(Assertions.isFunction(-10)).to.be.false;
        expect(Assertions.isFunction(new Date())).to.be.false;
        expect(Assertions.isFunction([])).to.be.false;
        expect(Assertions.isFunction({})).to.be.false;
    });

    it("isUndefined", () => {
        expect(Assertions.isUndefined(undefined)).to.be.true;
        expect(Assertions.isUndefined(null)).to.be.false;
        expect(Assertions.isUndefined("")).to.be.false;
        expect(Assertions.isUndefined("Danina")).to.be.false;
        expect(Assertions.isUndefined(true)).to.be.false;
        expect(Assertions.isUndefined(false)).to.be.false;
        expect(Assertions.isUndefined(0)).to.be.false;
        expect(Assertions.isUndefined(6)).to.be.false;
        expect(Assertions.isUndefined(-10)).to.be.false;
        expect(Assertions.isUndefined(new Date())).to.be.false;
        expect(Assertions.isUndefined([])).to.be.false;
        expect(Assertions.isUndefined({})).to.be.false;
    });


    it("has", () => {
        expect(Assertions.has(null)).to.be.false;
        expect(Assertions.has(undefined)).to.be.false;
        expect(Assertions.has("")).to.be.false;
        expect(Assertions.has("Danina")).to.be.true;
        expect(Assertions.has(true)).to.be.true;
        expect(Assertions.has(false)).to.be.true;
        expect(Assertions.has(0)).to.be.true;
        expect(Assertions.has(6)).to.be.true;
        expect(Assertions.has(-10)).to.be.true;
        expect(Assertions.has(new Date())).to.be.true;
        expect(Assertions.has([])).to.be.false;
        expect(Assertions.has({})).to.be.false;
    });

    it("hasNot", () => {
        expect(Assertions.hasNot(null)).to.be.true;
        expect(Assertions.hasNot(undefined)).to.be.true;
        expect(Assertions.hasNot("")).to.be.true;
        expect(Assertions.hasNot("Danina")).to.be.false;
        expect(Assertions.hasNot(true)).to.be.false;
        expect(Assertions.hasNot(false)).to.be.false;
        expect(Assertions.hasNot(0)).to.be.false;
        expect(Assertions.hasNot(6)).to.be.false;
        expect(Assertions.hasNot(-10)).to.be.false;
        expect(Assertions.hasNot(new Date())).to.be.false;
        expect(Assertions.hasNot([])).to.be.true;
        expect(Assertions.hasNot({})).to.be.true;
    });

    it("equals", () => {
        // string equals
        expect(Assertions.equals("", "")).to.be.true;
        expect(Assertions.equals("Example", "Example")).to.be.true;
        expect(Assertions.equals("Example", "")).to.be.false;
        expect(Assertions.equals("Example", false)).to.be.false;
        expect(Assertions.equals("Example", true)).to.be.false;
        expect(Assertions.equals("Example", null)).to.be.false;
        expect(Assertions.equals("Example", undefined)).to.be.false;
        expect(Assertions.equals("Example", [])).to.be.false;
        expect(Assertions.equals("Example", {})).to.be.false;
        // boolean equals
        expect(Assertions.equals(true, true)).to.be.true;
        expect(Assertions.equals(false, false)).to.be.true;
        expect(Assertions.equals(true, false)).to.be.false;
        expect(Assertions.equals(true, "")).to.be.false;
        expect(Assertions.equals(true, null)).to.be.false;
        expect(Assertions.equals(true, undefined)).to.be.false;
        expect(Assertions.equals(true, [])).to.be.false;
        expect(Assertions.equals(true, {})).to.be.false;
        // number equals
        expect(Assertions.equals(0, 0)).to.be.true;
        expect(Assertions.equals(2, 0)).to.be.false;
        expect(Assertions.equals(0, "Example")).to.be.false;
        expect(Assertions.equals(0, "")).to.be.false;
        expect(Assertions.equals(0, false)).to.be.false;
        expect(Assertions.equals(0, true)).to.be.false;
        expect(Assertions.equals(0, null)).to.be.false;
        expect(Assertions.equals(0, undefined)).to.be.false;
        expect(Assertions.equals(0, [])).to.be.false;
        expect(Assertions.equals(0, {})).to.be.false;
        // array equals
        expect(Assertions.equals([], [])).to.be.true;
        expect(Assertions.equals(["a1", "a2"], ["a1", "a2"])).to.be.true;
        expect(Assertions.equals(["a1", "a2"], "Example")).to.be.false;
        expect(Assertions.equals(["a1", "a2"], "")).to.be.false;
        expect(Assertions.equals(["a1", "a2"], false)).to.be.false;
        expect(Assertions.equals(["a1", "a2"], true)).to.be.false;
        expect(Assertions.equals(["a1", "a2"], null)).to.be.false;
        expect(Assertions.equals(["a1", "a2"], undefined)).to.be.false;
        expect(Assertions.equals(["a1", "a2"], [])).to.be.false;
        expect(Assertions.equals(["a1", "a2"], {})).to.be.false;
        // object
        expect(Assertions.equals({}, {})).to.be.true;
        expect(Assertions.equals({a1: "example"}, {a1: "example"})).to.be.true;
        expect(Assertions.equals({a1: "example"}, "Example")).to.be.false;
        expect(Assertions.equals({a1: "example"}, "")).to.be.false;
        expect(Assertions.equals({a1: "example"}, false)).to.be.false;
        expect(Assertions.equals({a1: "example"}, true)).to.be.false;
        expect(Assertions.equals({a1: "example"}, null)).to.be.false;
        expect(Assertions.equals({a1: "example"}, undefined)).to.be.false;
        expect(Assertions.equals({a1: "example"}, [])).to.be.false;
        expect(Assertions.equals({a1: "example"}, {})).to.be.false;
    });
});
