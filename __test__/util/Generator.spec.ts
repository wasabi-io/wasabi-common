import Generator from "util/Generator";
import { expect, assert } from "chai";

describe("util/Generator", () => {
    it("is", () => {
        let regex = /^[0-9a-f]{4}$/i;
        let result = Generator.s4();
        expect(result).to.be.exist;
        expect(regex.test(result)).to.be.true;
    });

    it("getName", () => {
        let regex = /^[0-9a-f]{8}\-[0-9a-f]{4}\-[0-9a-f]{4}\-[0-9a-f]{4}\-[0-9a-f]{12}$/i;
        let result = Generator.guid();
        expect(result).to.be.exist;
        expect(regex.test(result)).to.be.true;
    });
});
