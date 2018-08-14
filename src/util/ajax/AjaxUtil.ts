export const hasSupportFileApi = () => {
    if (!document) return false;
    const fi: any = document.createElement('INPUT');
    fi.type = 'file';
    return 'files' in fi;
};

export const hasSupportAjaxUploadProgressEvents = () => {
    if (!XMLHttpRequest) return false;
    const xhr = new XMLHttpRequest();
    return (xhr && ('upload' in xhr) && ('onprogress' in xhr.upload)) !== false;
};
