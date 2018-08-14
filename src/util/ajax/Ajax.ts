import {Promise} from "es6-promise";
import {Objects, Props} from "../../types";
import UrlUtil from "../UrlUtil";
import AjaxError from "./AjaxError";
import AjaxResponse from "./AjaxResponse";
import AjaxDefaults, {AjaxDefaultsConstructor} from "./AjaxDefaults";
import ajaxHttp from "./ajaxHttp";
import AjaxMethod from "./AjaxMethod";
import ContentType from "./ContentType";
import {AjaxFileEventHandler, AjaxFileEventHandlerProps} from "./AjaxFileEvent";

export interface AjaxProps {
    async?: boolean;
    user?: string;
    password?: string;
    headers?: Props<string>;
    contentType?: string;
    timeout?: number;
    withCredentials?: boolean;
    params?: Props<any>;
    queries?: Props<any>;
}

export interface AjaxPropsWithData<D = any> extends AjaxProps {
    data?: D;
    upload?: Props<AjaxFileEventHandler | AjaxFileEventHandlerProps>;
}

export interface FileAjaxPropsWithData extends AjaxPropsWithData<Props<any>> {

}

export default class Ajax {
    public static _defaults: AjaxDefaults = new AjaxDefaultsConstructor();
    public static readonly ContentTypeHeder = "Content-Type";
    public static readonly AllowMethodsHeader = "Access-Control-Allow-Methods";
    public static readonly AllowOriginHeader = "Access-Control-Allow-Origin";

    public static fetch(method: string, url: string, props?: AjaxPropsWithData): Promise<AjaxResponse> {
        const client: XMLHttpRequest = ajaxHttp();

        const clientProps: AjaxPropsWithData = props || {};
        return new Promise((resolve: (response: AjaxResponse) => any, reject: (response: AjaxResponse<Error>) => any) => {
            try {
                client.open(method, UrlUtil.joinWithQueries(clientProps.queries, Ajax._defaults.baseUrl, url), clientProps.async !== false, clientProps.user, clientProps.password);
                if (clientProps.headers) {
                    for (const key in clientProps.headers) {
                        client.setRequestHeader(key, clientProps.headers[key]);
                    }
                }
                clientProps.headers = clientProps.headers || {};

                const contentType = Ajax.setContentType(client, clientProps.contentType || clientProps.headers[Ajax.ContentTypeHeder] || this._defaults.contentType);

                client.onreadystatechange = () => {
                    if (client.readyState === 4) {
                        if (Ajax.isSuccess(client.status)) {
                            resolve(Ajax.getResponse(client));
                        } else {
                            reject(Ajax.getResponse(client));
                        }
                    }
                };

                Ajax.configureUpload(client, clientProps);

                client.withCredentials = clientProps.withCredentials;
                if (clientProps.async === false) {
                    client.timeout = clientProps.timeout;
                }
                clientProps.data ? client.send(Ajax.getRequestData(contentType, clientProps)) : client.send();
            } catch (e) {
                reject(Ajax.getResponse(client, e));
            }
        });
    }

    public static configureUpload(xhr: XMLHttpRequest, props: AjaxPropsWithData) {
        if (xhr.upload && props.upload) {
            for (const key in props.upload) {
                if (props.upload.hasOwnProperty(key)) {
                    const handler = props.upload[key];
                    if (typeof handler === "function") {
                        xhr.upload.addEventListener(key, handler, false);
                    } else {
                        xhr.upload.addEventListener(key, handler.handler, handler.options as any);
                    }
                }
            }
        }
    }

    public static getRequestData(contentType: string, clientProps: AjaxPropsWithData) {
        switch (contentType) {
            case ContentType.json:
                if (clientProps.data && typeof clientProps.data !== "string") {
                    return JSON.stringify(clientProps.data);
                }
                break;
            case ContentType.multipart:
            case ContentType.form:
                if (clientProps.data) {
                    return Ajax.dataToFormData(clientProps.data);
                }
                break;
            case ContentType.text:
                if (clientProps.data && typeof clientProps.data !== "string") {
                    return clientProps.data.toString();
                }
                break;
        }
        return clientProps.data;
    }

    public static setContentType(client: XMLHttpRequest, contentType: string) {
        let cType = contentType;
        if (!cType) {
            cType = Ajax._defaults.contentType;
        }
        if (cType.indexOf("charset") === -1) {
            cType = `${cType}; charset=utf-8`;
        }
        client.setRequestHeader(Ajax.ContentTypeHeder, cType);
        if (cType) {
            return cType.split(";")[0].trim();
        }
        return null;
    }

    public static isSuccess(status: number) {
        return status >= 200 && status < 300 || status === 304;
    }

    public static getResponse(xhr: XMLHttpRequest, err?: Error): AjaxResponse {
        let data;
        let error;
        let status = xhr.status;
        const responseType = Ajax.getResponseType(xhr);
        try {
            data = Ajax.getResponseData(responseType, xhr);
        } catch (e) {
            status = 400;
            error = e;
        }
        if (err) {
            error = err;
        }
        const headers = Ajax.parseHeaders(xhr.getAllResponseHeaders());
        const allowedMethods = headers[Ajax.AllowMethodsHeader];
        const allowedOrigin = headers[Ajax.AllowOriginHeader];
        const statusText = xhr.statusText;
        const responseURL = xhr.responseURL;
        if (Ajax.isSuccess(status)) {
            return {xhr, data, headers, allowedMethods, allowedOrigin, responseType, status, statusText, responseURL};
        }
        return new AjaxError(
            status, statusText, xhr, data, headers, allowedMethods, allowedOrigin, responseType, responseURL, error
        );
    }

    public static parseHeaders(header: string) {
        const headers: Props<string> = {};
        const heads = header.split("\n");
        for (const head of heads) {
            const index = head.indexOf(":");
            if (index !== -1) {
                const name = head.substring(0, index);
                headers[name] = head.substring(index + 1).trim();
            }
        }
        return headers;
    }

    public static getResponseType(xhr: XMLHttpRequest) {
        let contentType = xhr.getResponseHeader(Ajax.ContentTypeHeder);
        if (!contentType) return null;
        contentType = contentType.split(";")[0].trim();
        return contentType;
    }

    public static getResponseData(responseType: string, xhr: XMLHttpRequest) {
        if (xhr.response && responseType) {
            switch (responseType) {
                case "application/json":
                    if (typeof xhr.response === "string") {
                        return JSON.parse(xhr.response);
                    }
                    break;
            }
        }
        return xhr.response;
    }

    public static get(url: string, props?: AjaxProps): Promise<any> {
        return Ajax.fetch(AjaxMethod.GET, url, props);
    }

    public static post(url: string, props?: AjaxPropsWithData): Promise<any> {
        return Ajax.fetch(AjaxMethod.POST, url, props);
    }

    public static put(url: string, props?: AjaxPropsWithData): Promise<any> {
        return Ajax.fetch(AjaxMethod.PUT, url, props);
    }

    public static delete(url: string, props?: AjaxPropsWithData): Promise<any> {
        return Ajax.fetch(AjaxMethod.DELETE, url, props);
    }

    public static patch(url: string, props?: AjaxPropsWithData): Promise<any> {
        return Ajax.fetch(AjaxMethod.PATCH, url, props);
    }

    public static head(url: string, props?: AjaxProps): Promise<any> {
        return Ajax.fetch(AjaxMethod.HEAD, url, props);
    }

    public static options(url: string, props?: AjaxProps): Promise<any> {
        return Ajax.fetch(AjaxMethod.OPTIONS, url, props);
    }

    public static upload(url: string, props?: FileAjaxPropsWithData): Promise<any> {
        const clientProps = props || {};
        if (!clientProps.contentType) {
            clientProps.contentType = ContentType.multipart;
        }
        return Ajax.fetch(AjaxMethod.POST, url, clientProps);
    }

    public static dataToFormData(data: any) {
        if (data instanceof FormData) {
            return data;
        }
        if (data instanceof HTMLFormElement) {
            return new FormData(data);
        }
        const formData = new FormData();
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const item = data[key];
                if (item instanceof Array) {
                    // Loop through each of the selected files.
                    const names = `${key}[]`;
                    for (const child of item) {
                        if (child instanceof File || child instanceof Blob) {
                            formData.append(names, child);
                        } else {
                            formData.append(names, child);
                        }
                    }
                } else if (item instanceof File) {
                    // Loop through each of the selected file.
                    formData.append(key, item, item.name);
                } else {
                    formData.append(key, item);
                }
            }
        }
        return formData;
    }

    public static setup(merge: AjaxDefaults) {
        Ajax._defaults = Objects.merge(merge, Ajax._defaults);
    }
}
