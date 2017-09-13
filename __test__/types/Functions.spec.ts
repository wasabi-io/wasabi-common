import Functions from "wasabi-common/lib/types/Functions"
import {expect} from "chai";

describe("types/Functions", () => {
    it("is", () => {
        expect(Functions.is(function () {

        })).to.be.true;
        expect(Functions.is("")).to.be.false;
        expect(Functions.is("Danina")).to.be.false;
        expect(Functions.is(true)).to.be.false;
        expect(Functions.is(false)).to.be.false;
        expect(Functions.is(0)).to.be.false;
        expect(Functions.is(6)).to.be.false;
        expect(Functions.is(-10)).to.be.false;
        expect(Functions.is(new Date())).to.be.false;
        expect(Functions.is([])).to.be.false;
        expect(Functions.is({})).to.be.false;
    });

    it("getName", () => {
        expect(Functions.getName(Functions)).to.be.eq("Functions");
    });
});
