import Class from "lang/Class";
import { expect } from "chai";

describe("lang/Class", () => {
    it("constructor", () => {
        class Example extends Class {
            public method(): Example{
                return this;
            }
        }
        let example: Example = new Example();
        expect(example.method()).to.eq(example);
    });

    it("bindAll", () => {
        class Example {
            constructor() {
                Class.bindAll(this);
            }
            public method(): Example{
                return this;
            }
        }
        let example: Example = new Example();
        expect(example.method()).to.eq(example);
    })
});
