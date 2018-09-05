import {expect} from "chai";
import ArrayMap from "wasabi-common/lib/types/ArrayMap";
import {Props} from "../../src/types";

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
        const data = [
            {id: "test"},
            {id: "test1"},
            {id: "test2"},
            {id: "test3"},
            {id: "test4"},
            {id: "test"}
        ];

        const arrayMap = new ArrayMap({
            key: "id"
        });
        arrayMap.push(data[0]);
        expect(arrayMap.length).to.be.eq(1);
        arrayMap.push(data[1], data[2]);
        expect(arrayMap.length).to.be.eq(3);
        expect(arrayMap.data[1]).to.be.eq(data[1]);
        expect(arrayMap.data[2]).to.be.eq(data[2]);
        arrayMap.push(data[3], data[4]);
        expect(arrayMap.length).to.be.eq(5);
        expect(arrayMap.data[3]).to.be.eq(data[3]);
        expect(arrayMap.data[4]).to.be.eq(data[4]);
        arrayMap.push(data[5]);
        expect(arrayMap.length).to.be.eq(5);
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
        const data = [
            {id: "test"},
            {id: "test1"},
            {id: "test2"},
            {id: "test3"},
            {id: "test4"},
            {id: "test"}
        ];

        arrayMap.push(data);
        expect(arrayMap.length).to.be.eq(5);

        let lastItem = arrayMap.pop();
        expect(arrayMap.length).to.be.eq(4);
        expect(lastItem).to.be.eq(data[5]);

        lastItem = arrayMap.pop();
        expect(arrayMap.length).to.be.eq(3);
        expect(lastItem).to.be.eq(data[4]);

        lastItem = arrayMap.pop();
        expect(arrayMap.length).to.be.eq(2);
        expect(lastItem).to.be.eq(data[3]);

        lastItem = arrayMap.pop();
        expect(arrayMap.length).to.be.eq(1);
        expect(lastItem).to.be.eq(data[2]);

        lastItem = arrayMap.pop();
        expect(arrayMap.length).to.be.eq(0);
        expect(lastItem).to.be.eq(data[1]);
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
        const data = [
            {id: "test4"},
            {id: "test5"},
            {id: "test6"}
        ];

        const arrayMap = new ArrayMap({
            data,
            key: "id"
        });
        let result = arrayMap.join(",");
        expect(result).to.be.eq("test4,test5,test6");

        result = arrayMap.join(",", (item: Props<any>, index: number) => `${item.id}_${index}`);
        expect(result).to.be.eq("test4_0,test5_1,test6_2");
    });
    it("reverse", () => {

        let arrayMap = new ArrayMap({
            data : [],
            key: "id"
        });

        let result = arrayMap.reverse();
        expect(result.data).to.be.deep.eq([]);

        const data = [
            {id: "test4"},
            {id: "test5"},
            {id: "test6"}
        ];

        arrayMap = new ArrayMap({
            data,
            key: "id"
        });

        result = arrayMap.reverse();

        expect(result.data).to.be.deep.eq([{id: "test6"}, {id: "test5"}, {id: "test4"}]);
    });
    it("shift", () => {
        const data = [
            {id: "test4"},
            {id: "test5"},
            {id: "test6"}
        ];

        const arrayMap = new ArrayMap({
            data,
            key: "id"
        });
        const shiftResult = arrayMap.shift();
        expect(shiftResult).to.be.deep.eq(data[0]);
        expect(arrayMap.length).to.be.eq(2);
        expect(arrayMap.data).to.be.deep.eq([{id: "test5"}, {id: "test6"}]);
    });
    it("slice", () => {
        const data = [
            {id: "test4"},
            {id: "test5"},
            {id: "test6"}
        ];

        let arrayMap = new ArrayMap({
            data,
            key: "id"
        });
        arrayMap = arrayMap.slice(1);
        expect(arrayMap.length).to.be.eq(2);
        expect(arrayMap.data).to.be.deep.eq([{id: "test5"}, {id: "test6"}]);
    });
    it("sort", () => {
        const data = [
            {id: "test4"},
            {id: "test5"},
            {id: "test6"}
        ];

        let arrayMap = new ArrayMap({
            data,
            key: "id"
        });
        const sort = (item1: Props<any>, item2: Props<any>) => item1.id > item2.id ? 1 : -1;
        arrayMap = arrayMap.sort(sort);
        expect(arrayMap.data).to.be.deep.eq(data.sort(sort));
    });
    it("splice", () => {
        const data = [
            {id: "test4"},
            {id: "test5"},
            {id: "test6"}
        ];

        const arrayMap = new ArrayMap({
            data,
            key: "id"
        });
        const splicedArrayMap = arrayMap.splice(0, 1);
        const splicedData = data.splice(0, 1);
        expect(arrayMap.data).to.be.deep.eq(data);
        expect(splicedArrayMap.data).to.be.deep.eq(splicedData);
    });
    it("unshift", () => {
        const arrayMap = new ArrayMap({
            key: "id"
        });
        arrayMap.unshift({id: "test"});
        expect(arrayMap.length).to.be.eq(1);
        arrayMap.unshift({id: "test2"}, {id: "test3"});
        expect(arrayMap.length).to.be.eq(3);
        arrayMap.unshift({id: "test"}, {id: "test4"});
        expect(arrayMap.length).to.be.eq(4);
    });
    it("indexOf", () => {
        const data: any[] = [
            {id: "test4", name: "Gol D. Roger"},
            {id: "test5", name: "Test"},
            {id: "test6", name: "Gol D. Roger"}
        ];

        const arrayMap = new ArrayMap({
            data,
            key: "id"
        });
        expect(arrayMap.indexOf("test4")).to.be.eq(0);
        expect(arrayMap.indexOf("test8")).to.be.eq(-1);

        expect(arrayMap.indexOf({ id: "test4" })).to.be.eq(0);
        expect(arrayMap.indexOf({ id: "test8" })).to.be.eq(-1);

        expect(arrayMap.indexOf({ id: "test4" })).to.be.eq(0);
        expect(arrayMap.indexOf({ id: "test8" })).to.be.eq(-1);

        expect(arrayMap.indexOf({ name: "Gol D. Roger" })).to.be.eq(0);
        expect(arrayMap.indexOf({ name: "Test" })).to.be.eq(1);
        expect(arrayMap.indexOf({ name: "example" })).to.be.eq(-1);

    });
    it("lastIndexOf", () => {
    });
    it("length", () => {
        const data: any[] = [
            {id: "test4", name: "Gol D. Roger"},
            {id: "test5", name: "Test"},
            {id: "test6", name: "Gol D. Roger"}
        ];

        const arrayMap = new ArrayMap({
            data,
            key: "id"
        });
        expect(arrayMap.lastIndexOf("test4")).to.be.eq(0);
        expect(arrayMap.lastIndexOf("test8")).to.be.eq(-1);

        expect(arrayMap.lastIndexOf({ id: "test4" })).to.be.eq(0);
        expect(arrayMap.lastIndexOf({ id: "test8" })).to.be.eq(-1);

        expect(arrayMap.lastIndexOf({ id: "test4" })).to.be.eq(0);
        expect(arrayMap.lastIndexOf({ id: "test8" })).to.be.eq(-1);

        expect(arrayMap.lastIndexOf({ name: "Gol D. Roger" })).to.be.eq(2);
        expect(arrayMap.lastIndexOf({ name: "Test" })).to.be.eq(1);
        expect(arrayMap.lastIndexOf({ name: "example" })).to.be.eq(-1);
    });
    it("refresh", () => {
        const data = [
            {id: "test4"},
            {id: "test5"},
            {id: "test6"}
        ];

        const arrayMap = new ArrayMap({
            data,
            key: "id"
        });
        const len = arrayMap.length;
        arrayMap.refresh();
        expect(arrayMap.length).to.be.eq(len);
    });
});
