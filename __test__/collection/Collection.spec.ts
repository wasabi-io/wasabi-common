import {expect} from "chai";
import Collection from "wasabi-common/lib/collection/Collection";

describe("collection/Collection", () => {
    it("mapObject", () => {
        let obj;
        let inLoop = false;
        let result: string[] = Collection.mapObject(obj, () => {
            inLoop = true;
            return ""
        });
        expect(result).to.be.deep.eq([]);
        expect(inLoop).to.be.false;
        obj = {};
        result = Collection.mapObject(obj, (item) => {
            inLoop = true;
            return "";
        });
        expect(result).to.be.deep.eq([]);
        expect(inLoop).to.be.false;
        obj = {
            "test": "testValue"
        };
        result = Collection.mapObject(obj, (value: string, key: string) => {
            expect(key).to.be.eq("test");
            expect(value).to.be.eq("testValue");
            inLoop = true;
            return value;
        });
        expect(result).to.be.deep.eq(["testValue"]);
        expect(inLoop).to.be.true;
    });
    it("mapArray", () => {
        let arr: any[];
        let inLoop = false;
        let result: string[] = Collection.mapArray(arr, (value: string) => {
            inLoop = true;
            return value;
        });
        expect(result).to.be.deep.eq([]);
        expect(inLoop).to.be.false;
        arr = [];
        result = Collection.mapArray(arr, (value: string) => {
            inLoop = true;
            return value;
        });
        expect(result).to.be.deep.eq([]);
        expect(inLoop).to.be.false;
        arr = ["testValue"];
        result = Collection.mapArray(arr, (value: string, index: number) => {
            expect(index).to.be.eq(0);
            expect(value).to.be.eq("testValue");
            inLoop = true;
            return value;
        });
        expect(result).to.be.deep.eq(arr);
        expect(inLoop).to.be.true;
    });
    it("map", () => {
        let obj;
        let inLoop = false;
        let result: string[] = Collection.map(obj, () => {
            inLoop = true;
            return ""
        });
        expect(result).to.be.deep.eq([]);
        expect(inLoop).to.be.false;
        obj = {};
        result = Collection.map(obj, (item) => {
            inLoop = true;
            return "";
        });
        expect(result).to.be.deep.eq([]);
        expect(inLoop).to.be.false;
        obj = {
            "test": "testValue"
        };
        result = Collection.map(obj, (value: string, key: string) => {
            expect(key).to.be.eq("test");
            expect(value).to.be.eq("testValue");
            inLoop = true;
            return value;
        });
        expect(result).to.be.deep.eq(["testValue"]);
        expect(inLoop).to.be.true;

        let arr: any[];
        inLoop = false;
        result = Collection.map(arr, (value: string) => {
            inLoop = true;
            return value;
        });
        expect(result).to.be.deep.eq([]);
        expect(inLoop).to.be.false;
        arr = [];
        result = Collection.map(arr, (value: string) => {
            inLoop = true;
            return value;
        });
        expect(result).to.be.deep.eq([]);
        expect(inLoop).to.be.false;
        arr = ["testValue"];
        result = Collection.map(arr, (value: string, index: number) => {
            expect(index).to.be.eq(0);
            expect(value).to.be.eq("testValue");
            inLoop = true;
            return value;
        });
        expect(result).to.be.deep.eq(arr);
        expect(inLoop).to.be.true;
    });
    it("forEachObject", () => {
        let obj;
        let inLoop = false;
        Collection.forEachObject(obj, () => {
            inLoop = true;
            return true
        });
        expect(inLoop).to.be.false;
        obj = {};
        Collection.forEachObject(obj, (item) => {
            inLoop = true;
            return true
        });
        expect(inLoop).to.be.false;
        obj = {
            "test": "testValue",
            "test2": "test2Value"
        };
        let result: any = {};
        Collection.forEachObject(obj, (value: string, key: string) => {
            result[key] = value;
            inLoop = true;
            return true;
        });
        expect(result).to.be.deep.eq(obj);
        expect(inLoop).to.be.true;
        result = {};
        Collection.forEachObject(obj, (value: string, key: string) => {
            result[key] = value;
            inLoop = true;
            return false;
        });
        expect(result).to.be.deep.eq({
            "test": "testValue"
        });
        expect(inLoop).to.be.true;

    });
    it("forEachArray", () => {
        let arr: any[];
        let inLoop = false;
        Collection.forEachArray(arr, (value: string) => {
            inLoop = true;
            return true;
        });
        expect(inLoop).to.be.false;
        arr = [];
        Collection.forEachArray(arr, (value: string) => {
            inLoop = true;
            return true;
        });
        expect(inLoop).to.be.false;
        arr = ["testValue", "testValue2"];
        let result: string[] = [];
        Collection.forEachArray(arr, (value: string, index: number) => {
            result[result.length] = value;
            inLoop = true;
            return true;
        });
        expect(result).to.be.deep.eq(arr);
        expect(inLoop).to.be.true;

        result = [];
        Collection.forEachArray(arr, (value: string, index: number) => {
            result[result.length] = value;
            inLoop = true;
            return false;
        });
        expect(result).to.be.deep.eq(["testValue"]);
        expect(inLoop).to.be.true;
    });

    it("forEach", () => {
        let obj;
        let inLoop = false;
        Collection.forEach(obj, () => {
            inLoop = true;
            return true
        });
        expect(inLoop).to.be.false;
        obj = {};
        Collection.forEach(obj, (item) => {
            inLoop = true;
            return true
        });
        expect(inLoop).to.be.false;
        obj = {
            "test": "testValue",
            "test2": "test2Value"
        };
        let result: any = {};
        Collection.forEach(obj, (value: string, key: string) => {
            result[key] = value;
            inLoop = true;
            return true;
        });
        expect(result).to.be.deep.eq(obj);
        expect(inLoop).to.be.true;
        result = {};
        Collection.forEach(obj, (value: string, key: string) => {
            result[key] = value;
            inLoop = true;
            return false;
        });
        expect(result).to.be.deep.eq({
            "test": "testValue"
        });
        expect(inLoop).to.be.true;


        let arr: any[];
        inLoop = false;
        Collection.forEach(arr, (value: string) => {
            inLoop = true;
            return true;
        });
        expect(inLoop).to.be.false;
        arr = [];
        Collection.forEach(arr, (value: string) => {
            inLoop = true;
            return true;
        });
        expect(inLoop).to.be.false;
        arr = ["testValue", "testValue2"];
        let resultArr: string[] = [];
        Collection.forEach(arr, (value: string, index: number) => {
            resultArr[resultArr.length] = value;
            inLoop = true;
            return true;
        });
        expect(resultArr).to.be.deep.eq(arr);
        expect(inLoop).to.be.true;

        resultArr = [];
        Collection.forEach(arr, (value: string, index: number) => {
            resultArr[resultArr.length] = value;
            inLoop = true;
            return false;
        });
        expect(resultArr).to.be.deep.eq(["testValue"]);
        expect(inLoop).to.be.true;
    })
});
