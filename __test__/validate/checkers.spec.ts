import {expect} from "chai";
import {checkers} from "wasabi-common/lib/validate";

describe("validate/Checker", () => {
    it("required", () => {
        let result = checkers.required.fn("", {
            name: "Email"
        });
        expect(result).to.be.false;

        result = checkers.required.fn("Example", {
            name: "Email"
        });
        expect(result).to.be.true;

        result = checkers.required.fn([], {
            name: "List"
        });
        expect(result).to.be.false;

        result = checkers.required.fn(["Deneme"], {
            name: "List"
        });
        expect(result).to.be.true;

        result = checkers.required.fn({}, {
            name: "List"
        });
        expect(result).to.be.false;

        result = checkers.required.fn({
            key1: "test"
        }, {
            name: "List"
        });
        expect(result).to.be.true;

    });

    it("minSize", () => {
        let result = checkers.minSize.fn(undefined, {
            name: "Email",
            min: 3
        });
        expect(result).to.be.false;

        result = checkers.minSize.fn("", {
            name: "Email",
            min: 3
        });
        expect(result).to.be.false;

        result = checkers.minSize.fn("Example", {
            name: "Email",
            min: 3
        });

        expect(result).to.be.true;

        result = checkers.minSize.fn([], {
            name: "Email",
            min: 3
        });
        expect(result).to.be.false;

        result = checkers.minSize.fn(["value1", "value2"], {
            name: "Email",
            min: 3
        });
        expect(result).to.be.false;

        result = checkers.minSize.fn(["value1", "value2", "value3"], {
            name: "Email",
            min: 3
        });
        expect(result).to.be.true;

        result = checkers.minSize.fn(["value1", "value2", "value3", "value4"], {
            name: "Email",
            min: 3
        });
        expect(result).to.be.true;

    });

    it("maxSize", () => {
        let result = checkers.maxSize.fn(undefined, {
            name: "Email",
            max: 3
        });
        expect(result).to.be.true;

        result = checkers.maxSize.fn("", {
            name: "Email",
            max: 3
        });
        expect(result).to.be.true;

        result = checkers.maxSize.fn("Example", {
            name: "Email",
            max: 3
        });

        expect(result).to.be.false;

        result = checkers.maxSize.fn([], {
            name: "Email",
            max: 3
        });
        expect(result).to.be.true;

        result = checkers.maxSize.fn(["value1", "value2"], {
            name: "Email",
            max: 3
        });
        expect(result).to.be.true;

        result = checkers.maxSize.fn(["value1", "value2", "value3"], {
            name: "Email",
            max: 3
        });
        expect(result).to.be.true;

        result = checkers.maxSize.fn(["value1", "value2", "value3", "value4"], {
            name: "Email",
            max: 3
        });
        expect(result).to.be.false;

    });

    it("min", () => {

        let result = checkers.min.fn(undefined, {
            name: "Email",
            min: 3
        });
        expect(result).to.be.false;

        result = checkers.min.fn(2, {
            name: "Email",
            min: 3
        });
        expect(result).to.be.false;

        result = checkers.min.fn(3, {
            name: "Email",
            min: 3
        });
        expect(result).to.be.true;

        result = checkers.min.fn(4, {
            name: "Email",
            min: 3
        });
        expect(result).to.be.true;

    });

    it("max", () => {
        let result = checkers.max.fn(undefined, {
            name: "Email",
            max: 3
        });
        expect(result).to.be.true;

        result = checkers.max.fn(2, {
            name: "Email",
            max: 3
        });
        expect(result).to.be.true;

        result = checkers.max.fn(3, {
            name: "Email",
            max: 3
        });
        expect(result).to.be.true;

        result = checkers.max.fn(4, {
            name: "Email",
            max: 3
        });
        expect(result).to.be.false;
    });

    it("email", () => {
        let result = checkers.email.fn(undefined, {
            name: "Email"
        });
        expect(result).to.be.false;

        result = checkers.email.fn("", {
            name: "Email"
        });
        expect(result).to.be.false;

        result = checkers.email.fn("test", {
            name: "Email"
        });
        expect(result).to.be.false;

        result = checkers.email.fn("test@test", {
            name: "Email"
        });
        expect(result).to.be.false;

        result = checkers.email.fn("test@test.com", {
            name: "Email"
        });
        expect(result).to.be.true;

    });

    it("pattern", () => {

        const pattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        let result = checkers.pattern.fn(undefined, {
            pattern,
            name: "Email"
        });
        expect(result).to.be.false;

        result = checkers.pattern.fn("", {
            pattern,
            name: "Email"
        });
        expect(result).to.be.false;

        result = checkers.pattern.fn("test", {
            pattern,
            name: "Email"
        });
        expect(result).to.be.false;

        result = checkers.pattern.fn("test@test", {
            pattern,
            name: "Email"
        });
        expect(result).to.be.false;

        result = checkers.pattern.fn("test@test.com", {
            pattern,
            name: "Email"
        });
        expect(result).to.be.true;
    });

});
