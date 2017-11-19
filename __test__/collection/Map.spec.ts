import {expect} from "chai";
import {Entry} from "wasabi-common/lib/collection";
import Map from "wasabi-common/lib/collection/Map";

/* tslint:disable no-unused-expression */
describe("collection/Map", () => {
    it("constructor", () => {
        const map = new Map<string, string[]>();
        expect(map).to.be.exist;
        const map2 = new Map<number, string[]>();
        expect(map2).to.be.exist;
    });
    it("isEmpty", () => {
        const map = new Map<string, string[]>();
        expect(map.isEmpty()).to.be.true;
        map.put("test", ["testValue"]);
        expect(map.isEmpty()).to.be.false;
        map.remove("test");
        expect(map.isEmpty()).to.be.true;

        const map2 = new Map<number, string[]>();
        map2.put(0, ["testValue"]);
        expect(map2.isEmpty()).to.be.false;
        map2.remove(0);
        expect(map2.isEmpty()).to.be.true;
    });
    it("containsKey", () => {
        const map = new Map<string, string[]>();
        expect(map.containsKey("test")).to.be.false;
        map.put("test", ["testValue"]);
        expect(map.containsKey("test")).to.be.true;
        map.remove("test");
        expect(map.containsKey("test")).to.be.false;

        const map2 = new Map<number, string[]>();
        expect(map2.containsKey(0)).to.be.false;
        map2.put(0, ["testValue"]);
        expect(map2.containsKey(0)).to.be.true;
        map2.remove(0);
        expect(map2.containsKey(0)).to.be.false;
    });
    it("containsValue", () => {
        // TODO containsValue must check value with equal.
    });
    it("get", () => {
        const map = new Map<string, string[]>();
        expect(map.get("test")).to.be.undefined;
        map.put("test", ["testValue"]);
        expect(map.get("test")).to.be.deep.eq(["testValue"]);
        map.remove("test");
        expect(map.get("test")).to.be.undefined;

        const map2 = new Map<number, string[]>();
        expect(map2.get(0)).to.be.undefined;
        map2.put(0, ["testValue"]);
        expect(map2.get(0)).to.be.deep.eq(["testValue"]);
        map2.remove(0);
        expect(map2.get(0)).to.be.undefined;
    });
    it("getOrDefault", () => {
        const defaultArray = ["Example"];
        const map = new Map<string, string[]>();
        expect(map.getOrDefault("test", defaultArray)).to.be.eq(defaultArray);
        map.put("test", ["testValue"]);
        expect(map.getOrDefault("test", defaultArray)).to.be.deep.eq(["testValue"]);
        map.remove("test");
        expect(map.getOrDefault("test", defaultArray)).to.be.eq(defaultArray);

        const map2 = new Map<number, string[]>();
        expect(map2.getOrDefault(0, defaultArray)).to.be.eq(defaultArray);
        map2.put(0, ["testValue"]);
        expect(map2.getOrDefault(0, defaultArray)).to.be.deep.eq(["testValue"]);
        map2.remove(0);
        expect(map2.getOrDefault(0, defaultArray)).to.be.eq(defaultArray);
    });
    it("put", () => {
        const map = new Map<string, string[]>();
        map.put("test", ["testValue"]);
        expect(map.length).to.be.eq(1);
        map.put("test", ["testValue"]);
        expect(map.length).to.be.eq(1);
        map.put("test2", ["testValue"]);
        expect(map.length).to.be.eq(2);

        const map2 = new Map<number, string[]>();
        map2.put(0, ["testValue"]);
        expect(map2.length).to.be.eq(1);
        map2.put(0, ["testValue"]);
        expect(map2.length).to.be.eq(1);
        map2.put(1, ["testValue"]);
        expect(map2.length).to.be.eq(2);
    });
    it("remove", () => {
        const map = new Map<string, string[]>();
        expect(map.remove("test")).to.be.false;
        map.put("test", ["testValue"]);
        expect(map.remove("test")).to.be.true;
        expect(map.remove("test")).to.be.false;

        const map2 = new Map<number, string[]>();
        expect(map2.remove(0)).to.be.false;
        map2.put(0, ["testValue"]);
        expect(map2.remove(0)).to.be.true;
        expect(map2.remove(0)).to.be.false;
    });
    it("putAll", () => {
        const map = new Map<string, string>();
        const anotherMap = new Map<string, string>();
        expect(map.length).to.be.eq(0);
        anotherMap.put("test", "TestValue");
        anotherMap.put("test2", "TestValue");
        map.putAll(anotherMap);
        expect(map.length).to.be.eq(2);

        const map2 = new Map<number, string>();
        const anotherMap2 = new Map<number, string>();
        expect(map2.length).to.be.eq(0);
        anotherMap2.put(0, "TestValue");
        anotherMap2.put(1, "TestValue");
        map2.putAll(anotherMap2);
        expect(map2.length).to.be.eq(2);
    });

    it("clear", () => {
        const map = new Map<string, string>();
        expect(map.length).to.be.eq(0);
        map.put("test", "TestValue");
        map.put("test2", "TestValue");
        expect(map.length).to.be.eq(2);
        map.clear();
        expect(map.length).to.be.eq(0);

        const map2 = new Map<number, string>();
        expect(map2.length).to.be.eq(0);
        map2.put(0, "TestValue");
        map2.put(1, "TestValue");
        expect(map2.length).to.be.eq(2);
        map2.clear();
        expect(map2.length).to.be.eq(0);
    });

    it("keySet", () => {
        const map = new Map<string, string>();
        expect(map.keySet()).to.be.deep.eq([]);
        map.put("test", "TestValue");
        map.put("test2", "TestValue");
        expect(map.keySet()).to.be.deep.eq(["test", "test2"]);

        const map2 = new Map<number, string>();
        expect(map2.keySet()).to.be.deep.eq([]);
        map2.put(0, "TestValue");
        map2.put(1, "TestValue");
        expect(map2.keySet()).to.be.deep.eq([0, 1]);
    });

    it("values", () => {
        const map = new Map<string, string>();
        expect(map.values()).to.be.deep.eq([]);
        map.put("test", "TestValue");
        map.put("test2", "TestValue");
        expect(map.values()).to.be.deep.eq(["TestValue", "TestValue"]);

        const map2 = new Map<number, string>();
        expect(map2.values()).to.be.deep.eq([]);
        map2.put(0, "TestValue");
        map2.put(1, "TestValue");
        expect(map2.values()).to.be.deep.eq(["TestValue", "TestValue"]);
    });
    it("entrySet", () => {
        const map = new Map<string, string>();
        expect(map.entrySet()).to.be.deep.eq([]);
        const entrySet: Array<Entry<string, string>> = [];
        entrySet.push(new Entry("test", "TestValue"));
        entrySet.push(new Entry("test2", "TestValue"));
        map.put("test", "TestValue");
        map.put("test2", "TestValue");
        expect(map.entrySet()).to.be.deep.eq(entrySet);

        const map2 = new Map<number, string>();

        const entrySet2: Array<Entry<number, string>> = [];
        entrySet2.push(new Entry(0, "TestValue"));
        entrySet2.push(new Entry(1, "TestValue"));

        expect(map2.entrySet()).to.be.deep.eq([]);
        map2.put(0, "TestValue");
        map2.put(1, "TestValue");
        expect(map2.entrySet()).to.be.deep.eq(entrySet2);
    });
    it("forEach", () => {
        const map = new Map<string, string>();
        map.forEach(() => expect.fail("Map hasn't any element"));
        map.put("test", "TestValue");
        map.put("test2", "TestValue");
        const elements: string[] = [];
        map.forEach((value: string, key: string) => {
            elements.push(key);
            return true;
        });
        expect(elements).to.be.deep.eq(["test", "test2"]);

        const map2 = new Map<number, string>();
        map2.forEach(() => expect.fail("Map hasn't any element"));
        map2.put(0, "TestValue");
        map2.put(1, "TestValue");
        const elements2: number[] = [];
        map2.forEach((value: string, key: number) => {
            elements2.push(key);
            return true;
        });
        expect(elements2).to.be.deep.eq([0, 1]);
    });
    it("map", () => {
        const map = new Map<string, string>();
        map.map(() => expect.fail("Map hasn't any element"));
        map.put("test", "TestValue");
        map.put("test2", "TestValue");
        const elements = map.map((value: string, key: string) => {
            return key;
        });
        expect(elements).to.be.deep.eq(["test", "test2"]);

        const map2 = new Map<number, string>();
        map2.map(() => expect.fail("Map hasn't any element"));
        map2.put(0, "TestValue");
        map2.put(1, "TestValue");
        const elements2 = map2.map((value: string, key: number) => {
            return key;
        });
        expect(elements2).to.be.deep.eq([0, 1]);
    });
    it("length", () => {
        const map = new Map<string, string>();
        expect(map.length).to.be.eq(0);
        map.put("test", "TestValue");
        map.put("test2", "TestValue");
        expect(map.length).to.be.deep.eq(2);

        const map2 = new Map<number, string>();
        expect(map2.length).to.be.eq(0);
        map2.put(0, "TestValue");
        map2.put(1, "TestValue");
        expect(map2.length).to.be.eq(2);
    });
    it("filter", () => {
        const map = new Map<string, string>();
        let filteredMap = map.filter((entry) => true);
        expect(filteredMap.length).to.be.eq(0);
        map.put("test", "TestValue");
        map.put("test2", "TestValue");
        filteredMap = map.filter((entry) => entry.key === "test");
        expect(filteredMap.length).to.be.deep.eq(1);

        const map2 = new Map<number, string>();
        let filteredMap2 = map2.filter((entry) => true);
        expect(filteredMap2.length).to.be.eq(0);
        map2.put(0, "TestValue");
        map2.put(1, "TestValue");
        filteredMap2 = map2.filter((entry) => entry.key === 0);
        expect(filteredMap2.length).to.be.deep.eq(1);
    });

    it("iterator", () => {
        const map = new Map<string, string>();
        let iterator = map.iterator();
        expect(iterator.hasNext()).to.be.false;
        map.put("test", "TestValue");
        map.put("test2", "TestValue");
        iterator = map.iterator();
        expect(iterator.hasNext()).to.be.true;
        expect(iterator.next()).to.be.deep.eq(new Entry("test", "TestValue"));
        expect(iterator.next()).to.be.deep.eq(new Entry("test2", "TestValue"));
        expect(iterator.hasNext()).to.be.false;

        const map2 = new Map<number, string>();
        let iterator2 = map2.iterator();
        expect(iterator2.hasNext()).to.be.false;
        map2.put(0, "TestValue");
        map2.put(1, "TestValue");
        iterator2 = map2.iterator();
        expect(iterator2.hasNext()).to.be.true;
        expect(iterator2.next()).to.be.deep.eq(new Entry(0, "TestValue"));
        expect(iterator2.next()).to.be.deep.eq(new Entry(1, "TestValue"));
        expect(iterator2.hasNext()).to.be.false;

    });
});
