import {expect} from "chai";
import Type from "wasabi-common/lib/lang/Type";

/* tslint:disable no-unused-expression */
describe("lang/Type", () => {
    it("hasNot", () => {
        expect(Type.hasNot("")).to.eq(false);
        const newStringType = new Type({
            hasNot(o) {
                return Type.hasNot(o) || o === "";
            },
        });
        expect(newStringType.hasNot("")).to.eq(true);
    });

    it("isPrimitive", () => {
        expect(Type.isPrimitive()).to.eq(true);
        const newStringType = new Type({
            isPrimitive() {
                return false;
            },
        });
        expect(newStringType.isPrimitive()).to.eq(false);
    });

    it("isJsonType", () => {
        expect(Type.isJsonType()).to.eq(true);
        const newStringType = new Type({
            isJsonType() {
                return false;
            },
        });
        expect(newStringType.isJsonType()).to.eq(false);
    });

    it("isNativeType", () => {
        expect(Type.isNativeType()).to.eq(true);
        const newStringType = new Type({
            isNativeType() {
                return false;
            },
        });
        expect(newStringType.isNativeType()).to.eq(false);
    });

    it("getClone", () => {
        const value = {ex: "ExampleObject"};
        let cloneValue: any = Type.getClone(value);
        const isEqual = cloneValue === value;
        expect(isEqual).to.be.true;
        const newStringType = new Type<Object>({
            getClone(o: Object) {
                return {ex: "ExampleObject"};
            },
        });
        cloneValue = newStringType.getClone(value);
        expect(cloneValue === value).to.be.false;
    });

    it("getName", () => {
        /*  */
    });

    it("getSize", () => {
        /* */
    });

    it("equals", () => {
        /* */
    });
});
