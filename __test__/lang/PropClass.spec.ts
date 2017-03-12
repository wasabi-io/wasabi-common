import PropClass from "lang/PropClass";
import { expect } from "chai";

describe("lang/Class", () => {
    it("constructor", () => {
        class Example extends PropClass {
            static defaultProps = {
                example: "Example default props",
                example2: "Example2 Props"
            };
            public constructor(props){
                super(props);
            }
        }

        let example = new Example({ example: "Example props"})
        console.log(example.props);
    });
});
