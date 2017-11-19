import {expect} from "chai";
import Maps from "wasabi-common/lib/types/Maps";
import Types from "wasabi-common/lib/util/Types";

/* tslint:disable no-unused-expression */
describe("util/Maps", () => {
    it("equals", () => {
        const value1 = {
            deneme: ["", "dddsf"],
            sds: "Example",
            vsd: true,
        };
        const value2 = {
            deneme: ["", "dddsf"],
            sds: "Example",
            vsd: true,
        };
        expect(Maps.equals(value1, value2)).to.be.true;

        const value3 = {
            deneme: ["", "dddsf"],
            sds: "Example",
            vsd: false,
        };
        expect(Maps.equals(value1, value3)).to.be.false;
    });

    it("deepCopy", () => {
        const value1 = {
            deneme: ["", "dddsf"],
            sds: "Example",
            vsd: true,
        };
        expect(Maps.deepCopy(value1)).to.be.deep.eq(value1);
    });

    it("sizeOf", () => {

        const str = "Example String";
        const strSize = str.length * 2;

        const fn = () => { // 208 charachter
            const example = "sddfsd";
        };
        const fnSize = Types.getType(fn).getSize(fn);

        class Example { // 18
            public name: string = "kamil";
        }

        const exampleInstance = new Example();
        const exampleInstanceSize = Types.getType(exampleInstance).getSize(exampleInstance);

        const expectedSize =
            "str".length * 2 + strSize +
            "exampleInstance".length * 2 + exampleInstanceSize +
            "fn".length * 2 + fnSize;
        const value = {
            exampleInstance,
            fn,
            str,
        };
        expect(Maps.sizeOf(value)).to.be.deep.eq(expectedSize);
    });

});
