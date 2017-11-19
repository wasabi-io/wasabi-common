import {expect} from "chai";
import Generator from "wasabi-common/lib/util/Generator";

/* tslint:disable no-unused-expression */
describe("util/Generator", () => {
    it("is", () => {
        const regex = /^[0-9a-f]{4}$/i;
        const result = Generator.s4();
        expect(result).to.be.exist;
        expect(regex.test(result)).to.be.true;
    });

    it("getName", () => {
        const regex = /^[0-9a-f]{8}\-[0-9a-f]{4}\-[0-9a-f]{4}\-[0-9a-f]{4}\-[0-9a-f]{12}$/i;
        const result = Generator.guid();
        expect(result).to.be.exist;
        expect(regex.test(result)).to.be.true;
    });
});
