import {expect} from "chai";
import ArrayMap from "wasabi-common/lib/types/ArrayMap";

/* tslint:disable no-unused-expression */
describe("types/ArrayMap", () => {
    it("constructor", () => {
        const arrayMap: ArrayMap = new ArrayMap({
            key: "id"
        });
        expect(arrayMap instanceof ArrayMap).to.be.eq(true);
        expect(arrayMap.length).to.be.eq(0);
        arrayMap.push({
            id: "test"
        });
    });
    it("push", () => {
        const arrayMap = new ArrayMap({
            key: "id"
        });
        arrayMap.push({id: "test"});
        expect(arrayMap.length).to.be.eq(1);
        arrayMap.push({id: "test2"}, {id: "test3"});
        expect(arrayMap.length).to.be.eq(3);
        arrayMap.push({id: "test"}, {id: "test4"});
        expect(arrayMap.length).to.be.eq(4);
    });
    it("key", () => {
        const arrayMap = new ArrayMap({
            key: "id"
        });
        expect(arrayMap.key(0)).to.be.undefined;
        arrayMap.push({id: "test"});
        expect(arrayMap.key(0)).to.be.eq("test");
    });
    it("pop", () => {
        const arrayMap = new ArrayMap({
            key: "id"
        });
        const elements = [
            {id: "test"},
            {id: "test1"},
            {id: "test2"},
            {id: "test3"},
            {id: "test4"},
            {id: "test"}
        ];

        arrayMap.push.apply(arrayMap, elements);
        expect(arrayMap.length).to.be.eq(5);

        let lastItem = arrayMap.pop();
        expect(arrayMap.length).to.be.eq(4);
        expect(lastItem).to.be.eq(elements[4]);

        lastItem = arrayMap.pop();
        expect(arrayMap.length).to.be.eq(3);
        expect(lastItem).to.be.eq(elements[3]);

        lastItem = arrayMap.pop();
        expect(arrayMap.length).to.be.eq(2);
        expect(lastItem).to.be.eq(elements[2]);

        lastItem = arrayMap.pop();
        expect(arrayMap.length).to.be.eq(1);
        expect(lastItem).to.be.eq(elements[1]);

        lastItem = arrayMap.pop();
        expect(arrayMap.length).to.be.eq(0);
        expect(lastItem).to.be.eq(elements[0]);
    });
    it("concat", () => {
        const data = [
            {id: "test"},
            {id: "test1"},
            {id: "test2"},
            {id: "test3"},
            {id: "test4"}
        ];

        const arrayMap = new ArrayMap({
            data,
            key: "id"
        });

        const data2 = [
            {id: "test4"},
            {id: "test5"},
            {id: "test6"}
        ];

        const arrayMap2 = new ArrayMap({
            key: "id",
            data: data2
        });

        const arrayMap3 = arrayMap.concat(arrayMap2);
        expect(arrayMap3.length).to.be.eq(7);
    });
    it("join", () => {
    });
    it("reverse", () => {
    });
    it("shift", () => {
    });
    it("slice", () => {
    });
    it("sort", () => {
    });
    it("splice", () => {
    });
    it("unshift", () => {
    });
    it("indexOf", () => {
    });
    it("lastIndexOf", () => {
    });
    it("length", () => {
    });
    it("refresh", () => {
    });
});
