import {expect} from "chai";
import ArrayMap from "wasabi-common/lib/types/ArrayMap";

/* tslint:disable no-unused-expression */
describe("types/ArrayMap", () => {
    it("constructor", () => {
        const arrayMap = new ArrayMap("id");
        expect(arrayMap instanceof ArrayMap).to.be.eq(true);
        expect(arrayMap.length).to.be.eq(0);
        arrayMap.push({
            id: "test"
        });
    });
    it("push", () => {

    });
    it("key", () => {
    });
    it("pop", () => {
    });
    it("concat", () => {
    });
    it("join", () => {
    });
    it("reverse", () => {
    });
    it("shift", () => {
    });
    it("slice", () => {
    });
    it("sort", () => {
    });
    it("splice", () => {
    });
    it("unshift", () => {
    });
    it("indexOf", () => {
    });
    it("lastIndexOf", () => {
    });
    it("length", () => {
    });
    it("refresh", () => {
    });
});
