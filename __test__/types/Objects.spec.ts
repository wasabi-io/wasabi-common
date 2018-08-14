import {expect} from "chai";
import Objects from "wasabi-common/lib/types/Objects";
import Types from "wasabi-common/lib/util/Types";

/* tslint:disable no-unused-expression */
describe("types/Objects", () => {
    it("has", () => {
        expect(Objects.has({})).to.be.false;
        expect(Objects.has({a: "5"})).to.be.true;
        expect(Objects.has({a: "5"}, "a")).to.be.true;
        expect(Objects.has({a: "5"}, "b")).to.be.false;
        expect(Objects.has(null)).to.be.false;
        expect(Objects.has(null)).to.be.false;
    });

    it("getLength", () => {
        const object = {
            a: "4",
            b: 5,
            c: [6, 7],
        };
        expect(Objects.getLength(object)).to.deep.eq(3);
    });

    it("remove", () => {
        const actual = {
            a: "example",
            b: "example2",
        };
        const expected = {
            b: "example2",
        };
        expect(Objects.remove(actual, "a")).to.be.deep.eq(expected);
        Objects.remove(actual, "a");
        expect(Objects.remove(actual, "a")).to.be.deep.eq(expected);

    });

    it("removeValue", () => {
        const actual = {
            a: "example",
            b: "example2",
        };
        const expected = {
            b: "example2",
        };
        expect(Objects.removeValue(actual, "example")).to.be.deep.eq(expected);
        Objects.removeValue(actual, "example");
        expect(Objects.removeValue(actual, "example")).to.be.deep.eq(expected);
    });

    it("map", () => {
        const object = {
            a: "4",
            b: 5,
            c: [6, 7],
        };
        const expectedArray = ["String", "Number", "Array"];
        const array: any[] = Objects.map(object, (item) => {
            return Types.getName(item);
        });
        expect(array).to.deep.eq(expectedArray);
    });

    it("forEach", () => {
        const object = {
            a: "4",
            b: 5,
            c: [6, 7],
        };
        const expectedArray = ["String", "Number", "Array"];
        const array: any[] = [];
        Objects.forEach(object, (item) => {
            array.push(Types.getName(item));
        });
        expect(array).to.deep.eq(expectedArray);
    });

    it("keys", () => {
        const object = {
            a: "4",
            b: 5,
            c: [6, 7],
        };
        expect(Objects.keys(object)).to.deep.eq(["a", "b", "c"]);
    });

    it("values", () => {
        const object = {
            a: "4",
            b: 5,
            c: [6, 7],
        };
        expect(Objects.values(object)).to.deep.eq(["4", 5, [6, 7]]);
    });

    it("addValue", () => {
        const object = {
            a: "4",
            b: 5,
            c: [6, 7],
        };
        Objects.addValue(object, "d", "new element");
        let expected: any = {
            a: "4",
            b: 5,
            c: [6, 7],
            d: "new element",
        };
        expect(object).to.deep.eq(expected);
        const keys = ["f", "g"];
        Objects.addValue(object, "e", "Example", keys);
        expected = {
            a: "4",
            b: 5,
            c: [6, 7],
            d: "new element",
            e: {
                f: {
                    g: "Example",
                },
            },
        };
        expect(object).to.deep.eq(expected);
    });

    it("getValue", () => {
        const object = {
            a: "4",
            b: 5,
            c: [6, 7],
            d: "new element",
            e: {
                f: {
                    g: "Example",
                },
            },
        };
        expect(Objects.getValue(object, "e", ["f", "g"])).to.deep.eq("Example");
    });

    it("clone", () => {
        const obj = {};
        const objectClone = Objects.clone(obj, []);
        expect(obj).to.deep.eq(objectClone);
    });

    it("merge", () => {
        const obj = {
            a: 5,
            b: "Deneme",
            c: {
                d: "4",
            },
        };

        const obj2 = {
            b: "Deneme",
            c: {
                e: ["Example", "Ex"],
            },
            d: "Deneme",
        };
        const mergedObject = Objects.merge(obj, obj2);

        const expectedObj = {
            a: 5,
            b: "Deneme",
            c: {
                d: "4",
                e: ["Example", "Ex"],
            },
            d: "Deneme",
        };
        expect(mergedObject).to.deep.eq(expectedObj);
    });

    it("mergeDefaults", () => {
        const defaults = {
            a: 5,
            b: "defaultDeneme",
            c: {
                d: "4",
                e: ["Default"],
            },
        };

        const obj2 = {
            b: "obj2 deneme",
            c: {
                e: ["Example", "Ex"],
            },
            d: "Deneme",
        };
        const mergedObject = Objects.mergeDefaults(defaults, obj2);

        const expectedObj = {
            a: 5,
            b: "obj2 deneme",
            c: {
                d: "4",
                e: ["Example", "Ex"],
            },
            d: "Deneme",
        };
        expect(mergedObject).to.deep.eq(expectedObj);
    });
});
