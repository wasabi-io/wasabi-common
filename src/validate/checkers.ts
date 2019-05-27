import {Arrays, Objects, Strings} from "../types";
import {has, Types} from "../util";
import {CheckerParams} from "./Checker";

export interface MinParams extends CheckerParams {
    min: number;
}

export interface MaxParams extends CheckerParams {
    max: number;
}

export interface PatternParams extends CheckerParams {
    pattern: RegExp;
}

const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const checkers = {
    email: {
        fn: (value: string, params: CheckerParams): boolean => emailRegex.test(value),
        message: "${name} is not valid email !",
    },
    max: {
        fn: (value: number, params: MaxParams): boolean => {
            if (!has(value)) {
                return true;
            }
            return value <= params.max;
        },
        message: "${name} must be at greatest ${max}",
    },
    maxSize: {
        fn: (value: any[] | string, params: MaxParams): boolean => {
            if (!has(value)) {
                return true;
            }
            return value.length <= params.max;
        },
        message: "${name} must be at greatest ${max} size",
    },
    min: {
        fn: (value: number, params: MinParams): boolean => {
            if (!has(value)) {
                return !(params.min > 0);
            }
            return value >= params.min;
        },
        message: "${name} must be at least ${min}",
    },
    minSize: {
        fn: (value: any[] | string, params: MinParams): boolean => {
            if (!has(value)) {
                return !(params.min > 0);
            }
            return value.length >= params.min;
        },
        message: "${name} must be at least ${min} size",
    },
    pattern: {
        fn: (value: string, params: PatternParams): boolean => params.pattern.test(value),
        message: "${name} is not valid format !",
    },
    required: {
        fn: (value: any, params: CheckerParams): boolean => {
            switch (Types.getRawName(value)) {
                case Types.ToString.Array:
                    return Arrays.has(value);
                case Types.ToString.String:
                    return Strings.has(value);
                case Types.ToString.Object:
                    return Objects.has(value);
                default:
                    return has(value);
            }
        },
        message: "${name} is required",
    },
};

export default checkers;
