import Arrays from "types/Arrays";
import { expect } from "chai";
describe("util/Arrays", () => {
    it("has", () => {
        expect(Arrays.has([])).to.be.false;
        expect(Arrays.has(undefined)).to.be.false;
        expect(Arrays.has(null)).to.be.false;
        expect(Arrays.has(["deneme"])).to.be.true;
    });

    it("cleanValueFromArray", () => {
        let array: any = [2, 3, 5, 6, 3];
        let expected: any = [2, 5, 6];
        let result: any = Arrays.cleanValueFromArray(array, 3);
        expect(result).to.be.deep.eq(expected);

        array = [null, 3, null, 6, 3];
        expected = [3, 6, 3];
        result = Arrays.cleanValueFromArray(array, null);
        expect(result).to.be.deep.eq(expected);

        array = [2, 3, 6, undefined, undefined, "", 3, undefined];
        expected = [2, 3, 6, "", 3];
        result = Arrays.cleanValueFromArray(array, undefined);
        expect(result).to.be.deep.eq(expected);
    });
});
