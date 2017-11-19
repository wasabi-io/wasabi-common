import {expect} from "chai";
import Binder from "wasabi-common/lib/lang/Binder";
import {ExampleSubClass} from "./BinderSample";

/* tslint:disable no-unused-expression */
describe("lang/Binder", () => {
    it("constructor", () => {
        class Sample extends Binder {
            public test() {
                return this;
            }
        }

        const sample = new Sample();
        expect(sample.test()).to.be.eq(sample);

    });

    it("bind", () => {
        const example = new ExampleSubClass();
        Binder.bind(example, "test1");
        expect(example.test1()).to.be.undefined;

        function fn() {
            return this;
        }

        Binder.bind(example, "test1", fn);
        expect(example.test1()).to.be.eq(example);

        const arrow = () => {
            return "arrow";
        };

        Binder.bind(example, "test1", arrow);
        expect(example.test1()).to.be.eq("arrow");
    });
    it("bindAll", () => {
        const example = new ExampleSubClass();
        Binder.bindAll(example);
        expect(example.test1()).to.be.undefined;
        expect(example.test2()).to.be.undefined;
        expect(example.test5()).to.be.undefined;
        Binder.bindAll(example, "test1");
        expect(example.test1()).to.be.undefined;
    });
});
