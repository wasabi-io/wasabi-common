import Chars from "types/Chars"
import { expect } from "chai";

describe("util/Chars", () => {
    it("isNumber", () => {
        expect(Chars.isNumber("3".charCodeAt(0))).to.be.true;
        expect(Chars.isNumber("A".charCodeAt(0))).to.be.false;
        expect(Chars.isNumber("=".charCodeAt(0))).to.be.false;
        expect(Chars.isNumber("?".charCodeAt(0))).to.be.false;
        expect(Chars.isNumber(":".charCodeAt(0))).to.be.false;
        expect(Chars.isNumber(";".charCodeAt(0))).to.be.false;
        expect(Chars.isNumber(",".charCodeAt(0))).to.be.false;
        expect(Chars.isNumber(".".charCodeAt(0))).to.be.false;
    });
    it("isDot", () => {
        expect(Chars.isDot(".".charCodeAt(0))).to.be.true;
        expect(Chars.isDot("3".charCodeAt(0))).to.be.false;
        expect(Chars.isDot("A".charCodeAt(0))).to.be.false;
        expect(Chars.isDot("=".charCodeAt(0))).to.be.false;
        expect(Chars.isDot("?".charCodeAt(0))).to.be.false;
        expect(Chars.isDot(":".charCodeAt(0))).to.be.false;
        expect(Chars.isDot(";".charCodeAt(0))).to.be.false;
        expect(Chars.isDot(",".charCodeAt(0))).to.be.false;
    });
    it("isSemiColon", () => {
        expect(Chars.isSemiColon(",".charCodeAt(0))).to.be.true;
        expect(Chars.isSemiColon(".".charCodeAt(0))).to.be.false;
        expect(Chars.isSemiColon("3".charCodeAt(0))).to.be.false;
        expect(Chars.isSemiColon("A".charCodeAt(0))).to.be.false;
        expect(Chars.isSemiColon("=".charCodeAt(0))).to.be.false;
        expect(Chars.isSemiColon("?".charCodeAt(0))).to.be.false;
        expect(Chars.isSemiColon(":".charCodeAt(0))).to.be.false;
        expect(Chars.isSemiColon(";".charCodeAt(0))).to.be.false;
    });
    it("isDecimal", () => {
        expect(Chars.isDecimal(",".charCodeAt(0))).to.be.true;
        expect(Chars.isDecimal(".".charCodeAt(0))).to.be.true;
        expect(Chars.isDecimal("3".charCodeAt(0))).to.be.true;
        expect(Chars.isDecimal("A".charCodeAt(0))).to.be.false;
        expect(Chars.isDecimal("=".charCodeAt(0))).to.be.false;
        expect(Chars.isDecimal("?".charCodeAt(0))).to.be.false;
        expect(Chars.isDecimal(":".charCodeAt(0))).to.be.false;
        expect(Chars.isDecimal(";".charCodeAt(0))).to.be.false;
    });
    it("toString", () => {
        expect(Chars.toString(",".charCodeAt(0))).to.be.eq(",");
    });
});
