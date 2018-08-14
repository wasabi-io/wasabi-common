interface AjaxDefaults {
    baseUrl?: string;
    contentType?: string;
}

export class AjaxDefaultsConstructor implements AjaxDefaults {
    private _baseUrl: string;
    private _contentType: string = "application/json";

    public get baseUrl() {
        return this._baseUrl || location.hostname;
    }

    public set baseUrl(baseUrl: string) {
        this._baseUrl = baseUrl;
    }

    public get contentType() {
        return this._contentType;
    }

    public set contentType(contentType: string) {
        this._contentType = contentType;
    }
}

export default AjaxDefaults;
