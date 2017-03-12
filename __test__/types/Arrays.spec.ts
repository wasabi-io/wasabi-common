import Arrays from "types/Arrays";
import { expect } from "chai";

describe("util/Arrays", () => {
    it("has", () => {
        expect(Arrays.has([])).to.be.false;
        expect(Arrays.has(["example"], 1)).to.be.false;
        expect(Arrays.has(["example"], 0)).to.be.true;
        expect(Arrays.has(undefined)).to.be.false;
        expect(Arrays.has(null)).to.be.false;
        expect(Arrays.has(["deneme"])).to.be.true;
    });

    it("getLength", () => {
        expect(Arrays.getLength(null)).to.be.eq(0);
        expect(Arrays.getLength(undefined)).to.be.eq(0);
        expect(Arrays.getLength([])).to.be.eq(0);
        expect(Arrays.getLength(["element"])).to.be.eq(1);
    });

    it("remove", () => {
        let array: any = [2, 3, 5, 6, 3];
        let expected: any = [2, 3, 5, 3];
        let result: any = Arrays.remove(array, 3);
        expect(result).to.be.deep.eq(expected);
    });

    it("removeValue", () => {
        let array: any = [2, 3, 5, 6, 3];
        let expected: any = [2, 5, 6];
        let result: any = Arrays.removeValue(array, 3);
        expect(result).to.be.deep.eq(expected);

        array = [null, 3, null, 6, 3];
        expected = [3, 6, 3];
        result = Arrays.removeValue(array, null);
        expect(result).to.be.deep.eq(expected);

        array = [2, 3, 6, undefined, undefined, "", 3, undefined];
        expected = [2, 3, 6, "", 3];
        result = Arrays.removeValue(array, undefined);
        expect(result).to.be.deep.eq(expected);
    });
});
