import Map from "../collection/Map";
import {Props, Strings} from "../types";
import {has} from "../util/Functions";
import {Checker, CheckerAsBoolean, CheckerAsString, CheckerValue} from "./Checker";
import checkers from "./checkers";

export class Validate extends Map<string, Checker> {
    private static getParams(params: Props<any>, value: any) {
        const parameters: Props<any> = params || {};
        if (!parameters.value) {
            parameters.value = value;
        }
        return parameters;
    }

    private static getMessage(result: any, message: string): string {
        if (typeof result === "boolean") {
            return message || "";
        }

        if (typeof result === "string") {
            return result || message;
        }

        return message || result.toString();
    }

    /**
     *
     * @param {string} key
     * @param {string} message
     */
    public setMessage(key: string, message: string) {
        if (this.get(key)) {
            this.get(key).message = message;
        }
    }

    /**
     *
     * @param {Props<string>} messages
     */
    public setMessages(messages: Props<string>) {
        if (!messages) {
            return;
        }
        for (const key in messages) {
            if (messages.hasOwnProperty(key)) {
                this.setMessage(key, messages[key]);
            }
        }
    }

    /**
     *
     * @param {string} key
     * @param {Checker} checker
     * @returns {CheckerValue}
     */
    public put(key: string, checker: Checker): CheckerValue {
        let check = checker;
        if (typeof check === "function") {
            check = {
                fn: check,
                message: null,
            };
        }
        super.put(key, check);
        return check;
    }

    public check(checker: string | Checker, value: any, params?: Props, data?: Props, message?: string): string {
        if (typeof  checker === "string") {
            return this.checkByName(checker, value, params, data, message);
        }
        return this.checkByChecker(checker, value, params, data, message);
    }

    public checkByName(key: string, value: any, params?: Props, data?: Props, message?: string): string {
        const checker = this.get(key) as CheckerValue;
        return this.checkByFn(checker.fn, value, params, data, message || checker.message);
    }

    public get(key: string): CheckerValue {
        return super.get(key) as CheckerValue;
    }

    public checkByChecker(checker: Checker, value: any, params?: Props, data?: Props, message?: string): string {
        if (typeof checker === "function") {
            return this.checkByFn(checker, value, params, data, message);
        }
        return this.checkByFn(checker.fn, value, params, data, message || checker.message);
    }

    public checkByFn(checker: CheckerAsBoolean | CheckerAsString, value: any, params?: Props, data?: Props, message?: string): string {
        const result = checker(value, data);

        if (!has(result)) {
            return;
        }
        if (result === true) {
            return;
        }

        const resultMessage = Validate.getMessage(result, message);
        if (resultMessage != null) {
            return Strings.template(resultMessage, Validate.getParams(params, value));
        }
        return result.toString();
    }

}

const validate = new Validate();

validate.putAll(checkers);

export default validate;
