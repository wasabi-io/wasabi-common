export interface AjaxFileEventHandler {
    <K extends keyof XMLHttpRequestEventTargetEventMap>(this: XMLHttpRequestUpload, ev: XMLHttpRequestEventTargetEventMap[K]): any;
}

export interface AjaxFileEventHandlerProps {
    handler: AjaxFileEventHandler;
    options?: AddEventListenerOptions;
}
