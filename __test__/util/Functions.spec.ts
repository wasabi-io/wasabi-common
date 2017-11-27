import {expect} from "chai";
import {getOrDefault} from "wasabi-common/lib/util";
import {getType, has} from "wasabi-common/lib/util/Functions";

/* tslint:disable no-unused-expression */
describe("util/Functions", () => {
    it("getType", () => {
        expect(getType("")).to.be.eq("String");
        expect(getType(true)).to.be.eq("Boolean");
        expect(getType(undefined)).to.be.eq("Undefined");
        expect(getType(null)).to.be.eq("Null");
        expect(getType(3)).to.be.eq("Number");
        expect(getType(new Date())).to.be.eq("Date");
    });

    it("has", () => {
        expect(has("")).to.be.true;
        expect(has(3)).to.be.true;
        expect(has(true)).to.be.true;
        expect(has(null)).to.be.false;
        expect(has(undefined)).to.be.false;
        expect(has([])).to.be.true;
        expect(has({})).to.be.true;
    });

    it("getOrDefault", () => {
        expect(getOrDefault(null, "")).to.be.eq("");
        expect(getOrDefault(null, 3)).to.be.eq(3);
        expect(getOrDefault(null, "test")).to.be.eq("test");
        expect(getOrDefault(null, "test")).to.be.not.eq("test2");
        expect(getOrDefault(undefined, "")).to.be.eq("");
        expect(getOrDefault(undefined, 3)).to.be.eq(3);
        expect(getOrDefault(undefined, "test")).to.be.eq("test");
        expect(getOrDefault(undefined, "test")).to.be.not.eq("test2");
    });
});
