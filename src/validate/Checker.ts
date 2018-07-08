import {Props} from "../types/Objects";

export type CheckerAsBoolean = (value: any, data?: Props) => boolean;
export type CheckerAsString = (value: any, data?: Props) => string;

export interface CheckerValue {
    message?: string;
    fn: CheckerAsBoolean | CheckerAsString;
}

export type Checker = CheckerAsString | CheckerValue;

export interface CheckerParams {
    name?: string;
}
