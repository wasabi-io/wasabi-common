import * as index from "lang/index";
import { expect } from "chai";

describe("lang/index", () => {
    it("check Class.ts", () => {
        expect(index.Class).to.be.exist;
    });

    it("check Type.ts", () => {
        expect(index.Type).to.be.exist;
    });

});
