import {expect} from "chai";
import Properties from "wasabi-common/lib/util/Properties";

/* tslint:disable no-unused-expression */
describe("util/Properties", () => {
    it("constructor", () => {
        const expectedObject = {
            a: "a1",
            b: "b1",
            c: ["example", "example"],
        };
        const prop: Properties = new Properties(expectedObject);
        expect(prop.get("a")).to.be.deep.eq(expectedObject.a);
        expect(prop.get("b")).to.be.deep.eq(expectedObject.b);
        expect(prop.get("c")).to.be.deep.eq(expectedObject.c);

    });

    it("add", () => {
        const expectedObject = {
            a: "a1",
            b: "b1",
            c: ["example", "example"],
        };
        const prop: Properties = new Properties(expectedObject);
        prop.add("b", "ex", ["childb"]);
        expect(prop.get("b", ["childb"])).to.be.deep.eq("ex");
    });

    it("merge", () => {
        const expectedObject = {
            a: "a1",
            b: {
                d: "2",
            },
            c: ["example", "example"],
        };
        const props2 = {
            a: "a1",
            b: {
                d: "2",
            },
            c: ["example", "example"],
        };
        const prop: Properties = new Properties(expectedObject);
        prop.merge(props2);
        expect(prop.get("b", ["d"])).to.be.deep.eq("2");
    });
});
