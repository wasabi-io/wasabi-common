import {Props} from "../../types";

interface AjaxResponse<D = any> {
    xhr: XMLHttpRequest;
    data?: D;
    error?: Error;
    status: number;
    statusText: string;
    headers: Props<string>;
    responseType?: string;
    allowedMethods?: string;
    allowedOrigin?: string;
    responseURL?: string;
}

export default AjaxResponse;
