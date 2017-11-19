import {expect} from "chai";
import Set from "wasabi-common/lib/collection/Set";

/* tslint:disable no-unused-expression */
describe("collection/Map", () => {
    it("constructor", () => {
        const set = new Set([]);
        expect(set).to.be.exist;
    });
    it("contains", () => {
        const set = new Set([]);
        expect(set.contains("element")).to.be.false;
        set.add("element");
        expect(set.contains("element")).to.be.true;
        set.remove("element");
        expect(set.contains("element")).to.be.false;
    });
    it("indexOf", () => {
        const set = new Set([]);
        expect(set.indexOf("element")).to.be.eq(-1);
        set.add("element");
        expect(set.indexOf("element")).to.be.be.eq(0);
        set.remove("element");
        expect(set.indexOf("element")).to.be.eq(-1);
    });
    it("get", () => {
        const set = new Set([]);
        expect(set.get(0)).to.be.undefined;
        set.add("element");
        expect(set.get(0)).to.be.be.eq("element");
        set.remove("element");
        expect(set.get(0)).to.be.undefined;
    });
    it("add", () => {
        const set = new Set([]);
        expect(set.get(0)).to.be.undefined;
        set.add("element");
        expect(set.get(0)).to.be.be.eq("element");
        set.remove("element");
        expect(set.get(0)).to.be.undefined;
    });
    it("addAll", () => {
        const set = new Set([]);
        expect(set.get(0)).to.be.undefined;
        set.addAll(["element"]);
        expect(set.get(0)).to.be.be.eq("element");
        set.addAll(set);
        expect(set.get(0)).to.be.be.eq("element");
        const anotherSet = new Set(["test"]);
        set.addAll(anotherSet);
        expect(set.get(1)).to.be.be.eq("test");
    });
    it("remove", () => {
        const set = new Set([]);
        expect(set.get(0)).to.be.undefined;
        set.add("element");
        expect(set.get(0)).to.be.be.eq("element");
        set.remove("element");
        expect(set.get(0)).to.be.undefined;
    });
    it("length", () => {
        const set = new Set([]);
        expect(set.length).to.be.eq(0);
        set.add("element");
        expect(set.length).to.be.eq(1);
        set.remove("element");
        expect(set.length).to.be.eq(0);
    });
    it("addArray", () => {
        const set = new Set([]);
        expect(set.get(0)).to.be.undefined;
        Set.addArray(["element"], set);
        expect(set.get(0)).to.be.be.eq("element");
        Set.addArray(["test"], set);
        expect(set.get(1)).to.be.be.eq("test");
    });

    it("addSet", () => {
        const set = new Set(["element"]);
        expect(set.get(0)).to.be.be.eq("element");
        Set.addSet(set, set);
        expect(set.get(0)).to.be.be.eq("element");
        const anotherSet = new Set(["test"]);
        Set.addSet(anotherSet, set);
        expect(set.get(1)).to.be.be.eq("test");
    });
});
