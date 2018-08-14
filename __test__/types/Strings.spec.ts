import {expect} from "chai";
import Strings from "wasabi-common/lib/types/Strings";

/* tslint:disable no-unused-expression */
describe("types/Strings", () => {

    it("has", () => {
        expect(Strings.has("")).to.be.false;
        expect(Strings.has(null)).to.be.false;
        expect(Strings.has(undefined)).to.be.false;
        expect(Strings.has("Example")).to.be.true;
    });

    it("getLength", () => {
        /* */
    });

    it("toString", () => {
        /* */
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

    it("trim", () => {
        expect(Strings.trim(" example")).to.be.eq("example");
        expect(Strings.trim(" example ")).to.be.eq("example");
        expect(Strings.trim("example ")).to.be.eq("example");
        expect(Strings.trim("example")).to.be.eq("example");
        expect(Strings.trim(null)).to.be.eq("");
        expect(Strings.trim(undefined)).to.be.eq("");
    });

    it("lTrim", () => {
        expect(Strings.lTrim(" example")).to.be.eq("example");
        expect(Strings.lTrim(" example ")).to.be.eq("example ");
        expect(Strings.lTrim("example ")).to.be.eq("example ");
        expect(Strings.lTrim("example")).to.be.eq("example");
        expect(Strings.lTrim(null)).to.be.eq("");
        expect(Strings.lTrim(undefined)).to.be.eq("");
    });

    it("rTrim", () => {
        expect(Strings.rTrim(" example")).to.be.eq(" example");
        expect(Strings.rTrim(" example ")).to.be.eq(" example");
        expect(Strings.rTrim("example ")).to.be.eq("example");
        expect(Strings.rTrim("example")).to.be.eq("example");
        expect(Strings.rTrim(null)).to.be.eq("");
        expect(Strings.rTrim(undefined)).to.be.eq("");
    });

    it("capitalizeFirstLetter", () => {
        expect(Strings.capitalizeFirstLetter("example ")).to.be.eq("Example ");
        expect(Strings.capitalizeFirstLetter("Example")).to.be.eq("Example");
        expect(Strings.capitalizeFirstLetter(null)).to.be.eq("");
        expect(Strings.capitalizeFirstLetter(undefined)).to.be.eq("");
    });

    it("lPad", () => {
        expect(Strings.lPad("example ", "0", 10)).to.be.eq("00example ");
        expect(Strings.lPad("Example", "0", 10)).to.be.eq("000Example");
        expect(Strings.lPad(null, "0", 10)).to.be.eq("0000000000");
        expect(Strings.lPad(undefined, "0", 10)).to.be.eq("0000000000");
    });

    it("rPad", () => {
        expect(Strings.rPad("example ", "0", 10)).to.be.eq("example 00");
        expect(Strings.rPad("Example", "0", 10)).to.be.eq("Example000");
        expect(Strings.rPad(null, "0", 10)).to.be.eq("0000000000");
        expect(Strings.rPad(undefined, "0", 10)).to.be.eq("0000000000");

    });

    it("partsByNumber", () => {
        expect(Strings.partsByNumber("example", 2)).to.be.deep.eq(["ex", "am", "pl", "e"]);
        expect(Strings.partsByNumber("test", 2)).to.be.deep.eq(["te", "st"]);
        expect(Strings.partsByNumber("", 2)).to.be.deep.eq([]);
        expect(Strings.partsByNumber(null, 2)).to.be.deep.eq([]);
        expect(Strings.partsByNumber(undefined, 2)).to.be.deep.eq([]);
    });

    it("replaceAll", () => {
        expect(Strings.replaceAll("Kiaimil", "i", "c")).to.be.eq("Kcacmcl");
    });

    it("reverse", () => {
        expect(Strings.reverse("Kamil")).to.be.eq("limaK");
    });

    it("template", () => {
        const data = {
            name1: "Silento",
            name2: "Miley",
            nested: {greeting: "Dude", useName1: true},
            verb() {
                return this.nested.useName1 ? "nae nae" : "twerk";
            },
        };
        let result = Strings.template('Hello, ${nested["greeting"]}!', data);
        expect(result).to.be.eq(`Hello, ${data.nested.greeting}!`);
        result = Strings.template("${nested.useName1 ? name1 : name2}", data);
        expect(result).to.be.eq(`${data.nested.useName1 ? data.name1 : data.name2}`);
        result = Strings.template("${name1} likes to ${verb()}", data);
        expect(result).to.be.eq(`${data.name1} likes to ${data.verb()}`);
        result = Strings.template(undefined, data);
        expect(result).to.be.eq("");
        result = Strings.template(null, data);
        expect(result).to.be.eq("");
        result = Strings.template("", data);
        expect(result).to.be.eq("");
        result = Strings.template("test message ${verb()}", undefined);
        expect(result).to.be.eq("test message ${verb()}");
        result = Strings.template("test message ${verb()}", null);
        expect(result).to.be.eq("test message ${verb()}");
    });
});
