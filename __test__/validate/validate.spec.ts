import {expect} from "chai";
import {Props} from "wasabi-common/lib/types/Objects";
import {has} from "wasabi-common/lib/util/Functions";
import validate from "wasabi-common/lib/validate";

describe("validate/validate", () => {

    it("put", () => {
        const errorMessage = "${value} is not valid email!";
        const expectedMessage = "test is not valid email!";
        const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        // put CheckerWithMessage
        validate.put("email", {
            message: errorMessage,
            fn: (value: string) => {
                return emailRegex.test(value);
            }
        });

        let result = validate.check("email", "test");
        expect(result).to.be.eq(expectedMessage);
        result = validate.check("email", "test@test.com");
        expect(result).to.be.undefined;

        // put CheckerAsString
        validate.put("email", (value: string): string => {
            return emailRegex.test(value) ? undefined : errorMessage;
        });
        result = validate.check("email", "test");
        expect(result).to.be.eq(expectedMessage);
        result = validate.check("email", "test@test.com");
        expect(result).to.be.undefined;

    });

    it("get", () => {
        const exampleChecker = validate.get("exampleChecker");
        expect(exampleChecker).to.be.undefined;
        const requiredChecker = validate.get("required");
        expect(requiredChecker).to.be.exist;
        expect(requiredChecker.message).to.be.exist;
        expect(requiredChecker.fn).to.be.exist;
    });

    it("check", () => {
        let result = validate.check("required", "");
        expect(typeof result).to.be.eq("string");

        let expectedMessage = "Its not valid !";
        result = validate.check((value: string) => {
            return expectedMessage;
        }, "");
        expect(result).to.be.eq(expectedMessage);

        const messageTemplate = "${name} is not valid";
        expectedMessage = "Email is not valid";
        result = validate.check((value: string) => {
            return messageTemplate;
        }, "", {
            name: "Email",
        });
        expect(result).to.be.eq(expectedMessage);

        validate.check({
            message: messageTemplate,
            fn: (value: string) => {
                return false;
            },
        }, "", {
            name: "Email",
        });
        expect(result).to.be.eq(expectedMessage);

        validate.check({
            message: "${name} is global message",
            fn: (value: string) => {
                return false;
            },
        }, "", {
            name: "Email",
        }, undefined, messageTemplate);
        expect(result).to.be.eq(expectedMessage);

        validate.check({
            message: "${name} is global message",
            fn: (value: string, data: Props) => {
                return value === data.f;
            },
        }, "value", {
            name: "Email",
        }, {
            f: "anotherValue",
        }, messageTemplate);
        expect(result).to.be.eq(expectedMessage);

    });

    it("setMessage", () => {
        // old required message = ${name} is required;
        validate.put("myFunc", {
            message: "${name} is required",
            fn: (value: any) => {
                return has(value);
            },
        });

        let result = validate.check("myFunc", "this is email");
        expect(result).to.be.undefined;

        result = validate.check("myFunc", undefined, {name: "Email"});
        let expectedMessage = "Email is required";
        expect(result).to.be.eq(expectedMessage);

        validate.setMessage("myFunc", "${name} is required field !");

        result = validate.check("myFunc", undefined, {name: "Email"});
        expectedMessage = "Email is required field !";
        expect(result).to.be.eq(expectedMessage);
    });

    it("setMessages", () => {
        // old required message = ${name} is required;
        validate.put("myFunc", {
            message: "${name} is required",
            fn: (value: any) => {
                return has(value);
            },
        });

        let result = validate.check("myFunc", "this is email");
        expect(result).to.be.undefined;

        result = validate.check("myFunc", undefined, {name: "Email"});
        let expectedMessage = "Email is required";
        expect(result).to.be.eq(expectedMessage);

        validate.setMessages({
            myFunc: "${name} is required field !",
        });

        result = validate.check("myFunc", undefined, {name: "Email"});
        expectedMessage = "Email is required field !";
        expect(result).to.be.eq(expectedMessage);
    });
});
