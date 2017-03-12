import Strings from "types/Strings";
import { expect } from "chai";

describe("util/Strings", () => {

    it("has", () => {
        expect(Strings.has("")).to.be.false;
        expect(Strings.has(null)).to.be.false;
        expect(Strings.has(undefined)).to.be.false;
        expect(Strings.has("Example")).to.be.true;
    });

    it("startsWith", () => {
        expect(Strings.startsWith("Kamil", "Ka")).to.be.true;
        expect(Strings.startsWith("Kamil", "ka")).to.be.false;
        expect(Strings.startsWith("Kamil", null)).to.be.false;
        expect(Strings.startsWith("Kamil", undefined)).to.be.false;
    });

    it("endsWith", () => {
        expect(Strings.endsWith("Kamil", "il")).to.be.true;
        expect(Strings.endsWith("Kamil", "iL")).to.be.false;
        expect(Strings.endsWith("Kamil", null)).to.be.false;
        expect(Strings.endsWith("Kamil", undefined)).to.be.false;
    });
});
