import Types from "wasabi-common/lib/util/Types";
import { expect } from "chai";

describe("util/Types", () => {
    
    it("ToString", () => {
        const toString = Object.prototype.toString;
        expect(Types.ToString.Number).to.deep.eq(toString.call(0));
        expect(Types.ToString.Boolean).to.deep.eq(toString.call(true));
        expect(Types.ToString.Array).to.deep.eq(toString.call([]));
        expect(Types.ToString.String).to.deep.eq(toString.call(""));
        expect(Types.ToString.Date).to.deep.eq(toString.call(new Date()));
        expect(Types.ToString.RegExp).to.deep.eq(toString.call(new RegExp(".*")));
        expect(Types.ToString.Null).to.deep.eq(toString.call(null));
        expect(Types.ToString.Function).to.deep.eq(toString.call(function () {}));
        expect(Types.ToString.Undefined).to.deep.eq(toString.call(undefined));
        expect(Types.ToString.Object).to.deep.eq(toString.call({}));
    });

    it("getType", () => {
        expect(Types.getType("").getName("")).to.deep.eq(Types.getName(""));
        expect(Types.getType(0).getName(0)).to.deep.eq(Types.getName(0));
        expect(Types.getType(true).getName(true)).to.deep.eq(Types.getName(true));
        expect(Types.getType([]).getName([])).to.deep.eq(Types.getName([]));
        expect(Types.getType(new Date()).getName(new Date())).to.deep.eq(Types.getName(new Date()));
        expect(Types.getType(new RegExp(".*")).getName(new RegExp(".*"))).to.deep.eq(Types.getName(new RegExp(".*")));
        expect(Types.getType(null).getName(null)).to.deep.eq(Types.getName(null));
        let fn = function () {};
        expect(Types.getType(fn).getName(fn)).to.deep.eq(Types.getName(fn));
        expect(Types.getType(undefined).getName(undefined)).to.deep.eq(Types.getName(undefined));
    });

    it("getRawName", () => {
        expect(Types.getRawName("")).to.deep.eq(Types.ToString.String);
        expect(Types.getRawName(0)).to.deep.eq(Types.ToString.Number);
        expect(Types.getRawName(true)).to.deep.eq(Types.ToString.Boolean);
        expect(Types.getRawName([])).to.deep.eq(Types.ToString.Array);
        expect(Types.getRawName(new Date())).to.deep.eq(Types.ToString.Date);
        expect(Types.getRawName(new RegExp(".*"))).to.deep.eq(Types.ToString.RegExp);
        expect(Types.getRawName(null)).to.deep.eq(Types.ToString.Null);
        let fn = function () {};
        expect(Types.getRawName(fn)).to.deep.eq(Types.ToString.Function);
        expect(Types.getRawName(undefined)).to.deep.eq(Types.ToString.Undefined);
    });

    it("getName", () => {
        expect(Types.getName("")).to.deep.eq("String");
    });

    it("getTypeByName", () => {
        expect(Types.getTypeByName(Types.getName(""))).to.deep.eq(Types.getType(""));
        expect(Types.getTypeByName(Types.getName(0))).to.deep.eq(Types.getType(0));
        expect(Types.getTypeByName(Types.getName(true))).to.deep.eq(Types.getType(true));
        expect(Types.getTypeByName(Types.getName([]))).to.deep.eq(Types.getType([]));
        expect(Types.getTypeByName(Types.getName(new RegExp(".*")))).to.deep.eq(Types.getType(new RegExp(".*")));
        expect(Types.getTypeByName(Types.getName(new Date()))).to.deep.eq(Types.getType(new Date()));
        expect(Types.getTypeByName(Types.getName(null))).to.deep.eq(Types.getType(null));
        expect(Types.getTypeByName(Types.getName(undefined))).to.deep.eq(Types.getType(undefined));
    });

    it("getClone", () => {
         expect(Types.getClone("")).to.deep.eq("");
         expect(Types.getClone(0)).to.deep.eq(0);
         expect(Types.getClone(true)).to.deep.eq(true);
         expect(Types.getClone([])).to.deep.eq([]);
         expect(Types.getClone(["e1", "e2"])).to.deep.eq(["e1", "e2"]);
         expect(Types.getClone(new RegExp(".*"))).to.deep.eq(new RegExp(".*"));
         expect(Types.getClone(null)).to.deep.eq(null);
         let fn = function () {};
         expect(Types.getClone(fn)).to.deep.eq(fn);
         expect(Types.getClone(undefined)).to.deep.eq(undefined);
         expect(Types.getClone({ a1: "example", a2: ["example"]})).to.deep.eq({ a1: "example", a2: ["example"]});
         expect(Types.getClone({ a1: "example", a2: ["example"]}, ["Array"])).to.deep.eq({ a1: "example", a2: ["example"]});
         let date = new Date();
         expect(Types.getClone(date)).to.deep.eq(date);
    });

    it("getSize", () => {
        expect(Types.getSize(0)).to.deep.eq(8);
        expect(Types.getSize(true)).to.deep.eq(4);
        expect(Types.getSize([])).to.deep.eq(0);
        expect(Types.getSize(["e1", "e2"])).to.deep.eq(8);
        expect(Types.getSize(null)).to.deep.eq(0);
        let fn = function () {};
        expect(Types.getSize(fn)).to.deep.eq(fn.toString().length * 2);
        expect(Types.getSize(undefined)).to.deep.eq(0);
        expect(Types.getSize({ a1: "example", a2: ["example"]})).to.deep.eq(36);
    });

    it("equals", () => {
        class Example {
            member: string;
            constructor(member: string) {
                this.member = member;
            }
        }
        // string equals
        expect(Types.equals("", "")).to.be.true;
        expect(Types.equals("Example", "Example")).to.be.true;
        expect(Types.equals("Example", "")).to.be.false;
        expect(Types.equals("Example", false)).to.be.false;
        expect(Types.equals("Example", true)).to.be.false;
        expect(Types.equals("Example", null)).to.be.false;
        expect(Types.equals("Example", undefined)).to.be.false;
        expect(Types.equals("Example", [])).to.be.false;
        expect(Types.equals("Example", {})).to.be.false;
        // boolean equals
        expect(Types.equals(true, true)).to.be.true;
        expect(Types.equals(false, false)).to.be.true;
        expect(Types.equals(true, false)).to.be.false;
        expect(Types.equals(true, "")).to.be.false;
        expect(Types.equals(true, null)).to.be.false;
        expect(Types.equals(true, undefined)).to.be.false;
        expect(Types.equals(true, [])).to.be.false;
        expect(Types.equals(true, {})).to.be.false;
        // number equals
        expect(Types.equals(0, 0)).to.be.true;
        expect(Types.equals(2, 0)).to.be.false;
        expect(Types.equals(0, "Example")).to.be.false;
        expect(Types.equals(0, "")).to.be.false;
        expect(Types.equals(0, false)).to.be.false;
        expect(Types.equals(0, true)).to.be.false;
        expect(Types.equals(0, null)).to.be.false;
        expect(Types.equals(0, undefined)).to.be.false;
        expect(Types.equals(0, [])).to.be.false;
        expect(Types.equals(0, {})).to.be.false;
        // array equals
        expect(Types.equals([], [])).to.be.true;
        expect(Types.equals(["a1", "a2"], ["a1", "a2"])).to.be.true;
        expect(Types.equals(["a1", "a2"], "Example")).to.be.false;
        expect(Types.equals(["a1", "a2"], "")).to.be.false;
        expect(Types.equals(["a1", "a2"], false)).to.be.false;
        expect(Types.equals(["a1", "a2"], true)).to.be.false;
        expect(Types.equals(["a1", "a2"], null)).to.be.false;
        expect(Types.equals(["a1", "a2"], undefined)).to.be.false;
        expect(Types.equals(["a1", "a2"], [])).to.be.false;
        expect(Types.equals(["a1", "a2"], ["a1", "a3"])).to.be.false;
        expect(Types.equals(["a1", "a2"], {})).to.be.false;
        // object
        expect(Types.equals({}, {})).to.be.true;
        expect(Types.equals({a1: "example"}, {a1: "example"})).to.be.true;
        expect(Types.equals({a1: "example"}, "Example")).to.be.false;
        expect(Types.equals({a1: "example"}, "")).to.be.false;
        expect(Types.equals({a1: "example"}, false)).to.be.false;
        expect(Types.equals({a1: "example"}, true)).to.be.false;
        expect(Types.equals({a1: "example"}, null)).to.be.false;
        expect(Types.equals({a1: "example"}, undefined)).to.be.false;
        expect(Types.equals({a1: "example"}, [])).to.be.false;
        expect(Types.equals({a1: "example"}, {})).to.be.false;
        expect(Types.equals(new Example("ewew"), new Example("sdsd"))).to.be.false;
        let example = new Example("sdcsdc");
        expect(Types.equals(example, example)).to.be.true;
    });

    it("hasNot", () => {
        expect(Types.hasNot("")).to.be.true;
        expect(Types.hasNot(0)).to.be.false;
        expect(Types.hasNot(1)).to.be.false;
        expect(Types.hasNot(true)).to.be.false;
        expect(Types.hasNot(false)).to.be.false;
        expect(Types.hasNot([])).to.be.true;
        expect(Types.hasNot(["dsdd"])).to.be.false;
        expect(Types.hasNot(null)).to.be.true;
        expect(Types.hasNot(undefined)).to.be.true;
        expect(Types.hasNot({})).to.be.true;
        expect(Types.hasNot({ a: ""})).to.be.false;
    });

    it("addType", () => {
        class Example {

        }

        let isJsonType = false;
        let isPrimitive = false;
        let isNativeType = true;

        let expectedSize = 3;
        Types.addType("Example", {
            isPrimitive: () => isPrimitive,
            isJsonType: () => isJsonType,
            isNativeType: () => isNativeType,
            getSize: (o: Example) => expectedSize
        });

        let type = Types.getTypeByName("Example");
        expect(isJsonType).to.deep.eq(false);
        expect(isPrimitive).to.deep.eq(false);
        expect(isNativeType).to.deep.eq(true);
        expect(type.getSize(new Example())).to.deep.eq(3);
        try{
            Types.addType("Example",null);
            expect(false).to.be.true;
        }catch (e) {
           expect(true).to.be.true;
        }

        try{
            Types.addType("Example", {
                isPrimitive: () => isPrimitive,
                isJsonType: () => isJsonType,
                isNativeType: () => isNativeType,
                getSize: (o: Example) => expectedSize
            });
            expect(false).to.be.true;
        }catch (e) {
            expect(true).to.be.true;
        }
    })
});
