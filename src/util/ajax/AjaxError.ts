import AjaxResponse from "./AjaxResponse";
import {Props} from "../../types";

export default class AjaxError extends Error implements AjaxResponse {
    public status: number;
    public statusText: string;
    public xhr: XMLHttpRequest;
    public data: any;
    public headers: Props<string>;
    public allowedMethods: string;
    public allowedOrigin: string;
    public responseType: string;
    public responseURL: string;
    public cause: Error;
    public readonly isAjaxError = true;

    public constructor(
        status: number,
        statusText: string,
        xhr: XMLHttpRequest,
        data?: any,
        headers?: Props<string>,
        allowedMethods?: string,
        allowedOrigin?: string,
        responseType?: string,
        responseURL?: string,
        error?: Error
    ) {
        super(`${error ? error.message : statusText}`);
        this.status = status;
        this.statusText = statusText;
        this.xhr = xhr;
        this.data = data;
        this.headers = headers;
        this.allowedMethods = allowedMethods;
        this.allowedOrigin = allowedOrigin;
        this.responseType = responseType;
        this.responseURL = responseURL;
        this.cause = error;
    }
}
