import {expect} from "chai";
import Iterator from "wasabi-common/lib/collection/Iterator";

describe("collection/Map", () => {
    it("constructor", () => {
        let iterator = new Iterator([]);
        expect(iterator).to.be.exist;
    });
    it("hasNext", () => {
        let iterator = new Iterator([]);
        expect(iterator.hasNext()).to.be.false;
        iterator = new Iterator(["Test"]);
        expect(iterator.hasNext()).to.be.true;
    });
    it("next", () => {
        let iterator = new Iterator([]);
        expect(iterator.next()).to.be.undefined;
        iterator = new Iterator(["Test"]);
        expect(iterator.next()).to.be.eq("Test");
        expect(iterator.next()).to.be.undefined;
    });
    it("forEachRemaining", () => {
        let iterator = new Iterator([]);
        expect(iterator.next()).to.be.undefined;
        iterator = new Iterator(["Test", "Test2", "Test3"]);
        expect(iterator.next()).to.be.eq("Test");
        let remainedValues: string[] = [];
        iterator.forEachRemaining((element: string) => {
            remainedValues.push(element);
        });
        expect(remainedValues).to.be.deep.eq(["Test2", "Test3"])
    });
});
