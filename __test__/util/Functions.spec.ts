import { asEs6Module, getType, has, requireEs6 } from "wasabi-common/lib/util/Functions"
import { expect } from "chai";
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

    it("requireEs6", () => {
        let expected = {
            asEs6Module,
            getType,
            has,
            requireEs6
        };
        expect(requireEs6("util/Functions")).to.be.deep.eq(expected);
    });
});
