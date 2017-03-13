import Validations from "util/Validations"
import { expect } from "chai";

describe("util/Validations", () => {
    it("isPrimitive", () => {
        expect(Validations.isPrimitive("")).to.be.true;
        expect(Validations.isPrimitive("Danina")).to.be.true;
        expect(Validations.isPrimitive(true)).to.be.true;
        expect(Validations.isPrimitive(false)).to.be.true;
        expect(Validations.isPrimitive(0)).to.be.true;
        expect(Validations.isPrimitive(6)).to.be.true;
        expect(Validations.isPrimitive(-10)).to.be.true;
        expect(Validations.isPrimitive(new Date())).to.be.false;
        expect(Validations.isPrimitive([])).to.be.false;
        expect(Validations.isPrimitive({})).to.be.false;
        expect(Validations.isPrimitive(function () {})).to.be.false;
        expect(Validations.isPrimitive(new RegExp(".*"))).to.be.false;
    });

    it("isJsonType", () => {
        expect(Validations.isJsonType("")).to.be.true;
        expect(Validations.isJsonType("Danina")).to.be.true;
        expect(Validations.isJsonType(true)).to.be.true;
        expect(Validations.isJsonType(false)).to.be.true;
        expect(Validations.isJsonType(0)).to.be.true;
        expect(Validations.isJsonType(6)).to.be.true;
        expect(Validations.isJsonType(-10)).to.be.true;
        expect(Validations.isJsonType(new Date())).to.be.false;
        expect(Validations.isJsonType([])).to.be.true;
        expect(Validations.isJsonType({})).to.be.true;
        expect(Validations.isJsonType(function () {})).to.be.false;
        expect(Validations.isJsonType(new RegExp(".*"))).to.be.false;
    });

    it("isNativeType", () => {
        expect(Validations.isNativeType("")).to.be.true;
        expect(Validations.isNativeType("Danina")).to.be.true;
        expect(Validations.isNativeType(true)).to.be.true;
        expect(Validations.isNativeType(false)).to.be.true;
        expect(Validations.isNativeType(0)).to.be.true;
        expect(Validations.isNativeType(6)).to.be.true;
        expect(Validations.isNativeType(-10)).to.be.true;
        expect(Validations.isNativeType(new Date())).to.be.true;
        expect(Validations.isNativeType(new RegExp(".*"))).to.be.true;
        expect(Validations.isNativeType([])).to.be.true;
        expect(Validations.isNativeType({})).to.be.true;
        expect(Validations.isNativeType(function () {})).to.be.true;
        expect(Validations.isNativeType(new RegExp(".*"))).to.be.true;
    });

    it("isObject", () => {
        expect(Validations.isObject("")).to.be.false;
        expect(Validations.isObject("Danina")).to.be.false;
        expect(Validations.isObject(true)).to.be.false;
        expect(Validations.isObject(false)).to.be.false;
        expect(Validations.isObject(0)).to.be.false;
        expect(Validations.isObject(6)).to.be.false;
        expect(Validations.isObject(-10)).to.be.false;
        expect(Validations.isObject(new Date())).to.be.false;
        expect(Validations.isObject([])).to.be.false;
        expect(Validations.isObject({})).to.be.true;
    });

    it("isNumber", () => {
        expect(Validations.isNumber("")).to.be.false;
        expect(Validations.isNumber("Danina")).to.be.false;
        expect(Validations.isNumber(true)).to.be.false;
        expect(Validations.isNumber(false)).to.be.false;
        expect(Validations.isNumber(0)).to.be.true;
        expect(Validations.isNumber(6)).to.be.true;
        expect(Validations.isNumber(-10)).to.be.true;
        expect(Validations.isNumber(new Date())).to.be.false;
        expect(Validations.isNumber([])).to.be.false;
        expect(Validations.isNumber({})).to.be.false;
    });

    it("isBoolean", () => {
        expect(Validations.isBoolean("")).to.be.false;
        expect(Validations.isBoolean("Danina")).to.be.false;
        expect(Validations.isBoolean(true)).to.be.true;
        expect(Validations.isBoolean(false)).to.be.true;
        expect(Validations.isBoolean(0)).to.be.false;
        expect(Validations.isBoolean(6)).to.be.false;
        expect(Validations.isBoolean(-10)).to.be.false;
        expect(Validations.isBoolean(new Date())).to.be.false;
        expect(Validations.isBoolean([])).to.be.false;
        expect(Validations.isBoolean({})).to.be.false;
    });

    it("isArray", () => {
        expect(Validations.isArray("")).to.be.false;
        expect(Validations.isArray("Danina")).to.be.false;
        expect(Validations.isArray(true)).to.be.false;
        expect(Validations.isArray(false)).to.be.false;
        expect(Validations.isArray(0)).to.be.false;
        expect(Validations.isArray(6)).to.be.false;
        expect(Validations.isArray(-10)).to.be.false;
        expect(Validations.isArray(new Date())).to.be.false;
        expect(Validations.isArray([])).to.be.true;
        expect(Validations.isArray({})).to.be.false;
    });

    it("isString", () => {
        expect(Validations.isString("")).to.be.true;
        expect(Validations.isString("Danina")).to.be.true;
        expect(Validations.isString(true)).to.be.false;
        expect(Validations.isString(false)).to.be.false;
        expect(Validations.isString(0)).to.be.false;
        expect(Validations.isString(6)).to.be.false;
        expect(Validations.isString(-10)).to.be.false;
        expect(Validations.isString(new Date())).to.be.false;
        expect(Validations.isString([])).to.be.false;
        expect(Validations.isString({})).to.be.false;
    });

    it("isDate", () => {
        expect(Validations.isDate("")).to.be.false;
        expect(Validations.isDate("Danina")).to.be.false;
        expect(Validations.isDate(true)).to.be.false;
        expect(Validations.isDate(false)).to.be.false;
        expect(Validations.isDate(0)).to.be.false;
        expect(Validations.isDate(6)).to.be.false;
        expect(Validations.isDate(-10)).to.be.false;
        expect(Validations.isDate(new Date())).to.be.true;
        expect(Validations.isDate([])).to.be.false;
        expect(Validations.isDate({})).to.be.false;
    });

    it("isRegExp", () => {
        expect(Validations.isRegExp(new RegExp(".*"))).to.be.true;
        expect(Validations.isRegExp("")).to.be.false;
        expect(Validations.isRegExp("Danina")).to.be.false;
        expect(Validations.isRegExp(true)).to.be.false;
        expect(Validations.isRegExp(false)).to.be.false;
        expect(Validations.isRegExp(0)).to.be.false;
        expect(Validations.isRegExp(6)).to.be.false;
        expect(Validations.isRegExp(-10)).to.be.false;
        expect(Validations.isRegExp(new Date())).to.be.false;
        expect(Validations.isRegExp([])).to.be.false;
        expect(Validations.isRegExp({})).to.be.false;
    });

    it("isNull", () => {
        expect(Validations.isNull(null)).to.be.true;
        expect(Validations.isNull("")).to.be.false;
        expect(Validations.isNull("Danina")).to.be.false;
        expect(Validations.isNull(true)).to.be.false;
        expect(Validations.isNull(false)).to.be.false;
        expect(Validations.isNull(0)).to.be.false;
        expect(Validations.isNull(6)).to.be.false;
        expect(Validations.isNull(-10)).to.be.false;
        expect(Validations.isNull(new Date())).to.be.false;
        expect(Validations.isNull([])).to.be.false;
        expect(Validations.isNull({})).to.be.false;
    });

    it("isFunction", () => {
        expect(Validations.isFunction(function () {

        })).to.be.true;
        expect(Validations.isFunction("")).to.be.false;
        expect(Validations.isFunction("Danina")).to.be.false;
        expect(Validations.isFunction(true)).to.be.false;
        expect(Validations.isFunction(false)).to.be.false;
        expect(Validations.isFunction(0)).to.be.false;
        expect(Validations.isFunction(6)).to.be.false;
        expect(Validations.isFunction(-10)).to.be.false;
        expect(Validations.isFunction(new Date())).to.be.false;
        expect(Validations.isFunction([])).to.be.false;
        expect(Validations.isFunction({})).to.be.false;
    });

    it("isUndefined", () => {
        expect(Validations.isUndefined(undefined)).to.be.true;
        expect(Validations.isUndefined(null)).to.be.false;
        expect(Validations.isUndefined("")).to.be.false;
        expect(Validations.isUndefined("Danina")).to.be.false;
        expect(Validations.isUndefined(true)).to.be.false;
        expect(Validations.isUndefined(false)).to.be.false;
        expect(Validations.isUndefined(0)).to.be.false;
        expect(Validations.isUndefined(6)).to.be.false;
        expect(Validations.isUndefined(-10)).to.be.false;
        expect(Validations.isUndefined(new Date())).to.be.false;
        expect(Validations.isUndefined([])).to.be.false;
        expect(Validations.isUndefined({})).to.be.false;
    });


    it("has", () => {
        expect(Validations.has(null)).to.be.false;
        expect(Validations.has(undefined)).to.be.false;
        expect(Validations.has("")).to.be.false;
        expect(Validations.has("Danina")).to.be.true;
        expect(Validations.has(true)).to.be.true;
        expect(Validations.has(false)).to.be.true;
        expect(Validations.has(0)).to.be.true;
        expect(Validations.has(6)).to.be.true;
        expect(Validations.has(-10)).to.be.true;
        expect(Validations.has(new Date())).to.be.true;
        expect(Validations.has([])).to.be.false;
        expect(Validations.has({})).to.be.false;
    });

    it("hasNot", () => {
        expect(Validations.hasNot(null)).to.be.true;
        expect(Validations.hasNot(undefined)).to.be.true;
        expect(Validations.hasNot("")).to.be.true;
        expect(Validations.hasNot("Danina")).to.be.false;
        expect(Validations.hasNot(true)).to.be.false;
        expect(Validations.hasNot(false)).to.be.false;
        expect(Validations.hasNot(0)).to.be.false;
        expect(Validations.hasNot(6)).to.be.false;
        expect(Validations.hasNot(-10)).to.be.false;
        expect(Validations.hasNot(new Date())).to.be.false;
        expect(Validations.hasNot([])).to.be.true;
        expect(Validations.hasNot({})).to.be.true;
    });

    it("equals", () => {
        // string equals
        expect(Validations.equals("", "")).to.be.true;
        expect(Validations.equals("Example", "Example")).to.be.true;
        expect(Validations.equals("Example", "")).to.be.false;
        expect(Validations.equals("Example", false)).to.be.false;
        expect(Validations.equals("Example", true)).to.be.false;
        expect(Validations.equals("Example", null)).to.be.false;
        expect(Validations.equals("Example", undefined)).to.be.false;
        expect(Validations.equals("Example", [])).to.be.false;
        expect(Validations.equals("Example", {})).to.be.false;
        // boolean equals
        expect(Validations.equals(true, true)).to.be.true;
        expect(Validations.equals(false, false)).to.be.true;
        expect(Validations.equals(true, false)).to.be.false;
        expect(Validations.equals(true, "")).to.be.false;
        expect(Validations.equals(true, null)).to.be.false;
        expect(Validations.equals(true, undefined)).to.be.false;
        expect(Validations.equals(true, [])).to.be.false;
        expect(Validations.equals(true, {})).to.be.false;
        // number equals
        expect(Validations.equals(0, 0)).to.be.true;
        expect(Validations.equals(2, 0)).to.be.false;
        expect(Validations.equals(0, "Example")).to.be.false;
        expect(Validations.equals(0, "")).to.be.false;
        expect(Validations.equals(0, false)).to.be.false;
        expect(Validations.equals(0, true)).to.be.false;
        expect(Validations.equals(0, null)).to.be.false;
        expect(Validations.equals(0, undefined)).to.be.false;
        expect(Validations.equals(0, [])).to.be.false;
        expect(Validations.equals(0, {})).to.be.false;
        // array equals
        expect(Validations.equals([], [])).to.be.true;
        expect(Validations.equals(["a1", "a2"], ["a1", "a2"])).to.be.true;
        expect(Validations.equals(["a1", "a2"], "Example")).to.be.false;
        expect(Validations.equals(["a1", "a2"], "")).to.be.false;
        expect(Validations.equals(["a1", "a2"], false)).to.be.false;
        expect(Validations.equals(["a1", "a2"], true)).to.be.false;
        expect(Validations.equals(["a1", "a2"], null)).to.be.false;
        expect(Validations.equals(["a1", "a2"], undefined)).to.be.false;
        expect(Validations.equals(["a1", "a2"], [])).to.be.false;
        expect(Validations.equals(["a1", "a2"], {})).to.be.false;
        // object
        expect(Validations.equals({}, {})).to.be.true;
        expect(Validations.equals({a1: "example"}, {a1: "example"})).to.be.true;
        expect(Validations.equals({a1: "example"}, "Example")).to.be.false;
        expect(Validations.equals({a1: "example"}, "")).to.be.false;
        expect(Validations.equals({a1: "example"}, false)).to.be.false;
        expect(Validations.equals({a1: "example"}, true)).to.be.false;
        expect(Validations.equals({a1: "example"}, null)).to.be.false;
        expect(Validations.equals({a1: "example"}, undefined)).to.be.false;
        expect(Validations.equals({a1: "example"}, [])).to.be.false;
        expect(Validations.equals({a1: "example"}, {})).to.be.false;
    });
});
