import Maps from "wasabi-common/lib/types/Maps";
import Types from "wasabi-common/lib/util/Types";
import {expect} from "chai";

describe("util/Maps", () => {
    it("equals", () => {
        let value1 = {
            "sds": "Example",
            "vsd": true,
            "deneme": ["", "dddsf"]
        };
        let value2 = {
            "sds": "Example",
            "vsd": true,
            "deneme": ["", "dddsf"]
        };
        expect(Maps.equals(value1, value2)).to.be.true;

        let value3 = {
            "sds": "Example",
            "vsd": false,
            "deneme": ["", "dddsf"]
        };
        expect(Maps.equals(value1, value3)).to.be.false;
    });

    it("deepCopy", () => {
        let value1 = {
            "sds": "Example",
            "vsd": true,
            "deneme": ["", "dddsf"]
        };
        expect(Maps.deepCopy(value1)).to.be.deep.eq(value1);
    });

    it("sizeOf", () => {

        let str = "Example String";
        let strSize = str.length * 2;

        let fn = function () { // 208 charachter
            let example = "sddfsd";
            console.log(example);
        };
        let fnSize = Types.getType(fn).getSize(fn);

        class Example { // 18
            name: string = "kamil";
        }

        let exampleInstance = new Example();
        let exampleInstanceSize = Types.getType(exampleInstance).getSize(exampleInstance);

        let expectedSize =
            "str".length * 2 + strSize +
            "exampleInstance".length * 2 + exampleInstanceSize +
            "fn".length * 2 + fnSize;
        let value = {
            str: str,
            fn: fn,
            exampleInstance: exampleInstance
        };
        expect(Maps.sizeOf(value)).to.be.deep.eq(expectedSize);
    });

});
