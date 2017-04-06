import Types from "util/Types";
import Arrays from "types/Arrays";
import Strings from "types/Strings";
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
    it("map", () => {
        let expectedResult = [4,6,8,10,10];
        let result = Arrays.map([2,3,4,5,5], (item) => item * 2 );
        expect(result).to.be.deep.eq(expectedResult);

        expectedResult = [6,8,10,10];
        result = Arrays.map([null,3,4,5,5], (item) => item ? item * 2: item );
        expect(result).to.be.deep.eq(expectedResult);

        let mixedExpected = [15,"elpmaxE",false,25];
        let mixResult = Arrays.map([null,3,"Example",true,5], (item) => {
            switch (Types.getRawName(item)) {
                case Types.ToString.Boolean:
                    return !item;
                case Types.ToString.Number:
                    return item * 5;
                case Types.ToString.String:
                    return Strings.reverse(item);
                default:
                    return null;
            }
        });
        expect(mixResult).to.be.deep.eq(mixedExpected);
    });

    it("forEach", () => {
        let expectedResult = [4,6,8,10,10];
        let inputArray = [2, 3, 4, 5, 5];
        Arrays.forEach(inputArray, (item, index) => {
            inputArray[index] = item * 2;
        });
        expect(inputArray).to.be.deep.eq(expectedResult);

        inputArray = [2, 3, 4, 5, 5];
        Arrays.forEach(inputArray, (item, index): boolean => {
            if(item > 4) {
                return false;
            }
            inputArray[index] = item * 2;
            return true;
        });
        expectedResult = [4,6,8, 5, 5];
        expect(inputArray).to.be.deep.eq(expectedResult);
    });

    it("merge", () => {
        let expectedResult = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        expect(Arrays.merge([1, 2, 3], [4, 5, 6], [7, 8, 9])).to.be.deep.eq(expectedResult);

        let date = new Date();
        let mixedExpected: any[] = ["", 2, true, { k: "example" }, "deneme", date];
        expect(Arrays.merge(["", 2, true], null, undefined, [{ k: "example" }, "deneme", date])).to.be.deep.eq(mixedExpected);

        mixedExpected = ["", 2, true, ["Arra", "Array"], { k: "example" }, date];
        expect(Arrays.merge(["", 2, true, ["Arra", "Array"] ,{ k: "example" }], [{ k: "example" }, ["Arra", "Array"], date])).to.be.deep.eq(mixedExpected);
    });

    it("pushAll", () => {
        let expectedResult = [1, 2, 3, 7, 8, 9, 4, 5, 6];
        let input = [1, 2, 3, 7, 8, 9];
        expect(Arrays.pushAll([4, 5, 6], input)).to.be.deep.eq(expectedResult);

        expect(Arrays.pushAll(expectedResult, null)).to.be.deep.eq(expectedResult);

        expect(Arrays.pushAll([], null)).to.be.deep.eq(null);
        expect(Arrays.pushAll(undefined, [])).to.be.deep.eq([]);
    });

    it("removeAll", () => {
        let expectedResult: any[] = [];
        expect(Arrays.removeAll([2,3], undefined)).to.be.deep.eq(expectedResult);
        expect(Arrays.removeAll([2,3], null)).to.be.deep.eq(expectedResult);

        expectedResult = [1];
        expect(Arrays.removeAll(undefined, expectedResult)).to.be.deep.eq(expectedResult);
        expect(Arrays.removeAll(null, expectedResult)).to.be.deep.eq(expectedResult);
        expect(Arrays.removeAll([], expectedResult)).to.be.deep.eq(expectedResult);

        expectedResult = [1];
        expect(Arrays.removeAll([2,3], [1, 2, 3])).to.be.deep.eq(expectedResult);
    });

    it("add", () => {
        let expectedResult = [1, 2, 3, 4];
        let inputRefArray = [1, 2, 4];
        expect(Arrays.add(inputRefArray, 3, 2)).to.be.true;
        expect(inputRefArray).to.be.deep.eq(expectedResult);
        expectedResult = [1, 2, 3, 4, 5];
        expect(Arrays.add(inputRefArray, 5, 4)).to.be.true;
        expect(inputRefArray).to.be.deep.eq(expectedResult);

        // out of index
        expect(Arrays.add(inputRefArray,  3, 10)).to.be.false;
        expect(Arrays.add(inputRefArray, 3, -5)).to.be.false;

        expect(Arrays.add(undefined, 3, 2)).to.be.false;
        expect(Arrays.add(null, 3, 2)).to.be.false;
    });
});

