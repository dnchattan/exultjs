/// <reference types="jszip" />
/// <reference types="react" />
import * as JSZip from 'jszip';
import * as React from 'react';
export interface IExplorerState {
    resourceZip?: JSZip;
    showDialog: boolean;
    loading?: boolean;
}
export declare class Explorer extends React.Component<{}, IExplorerState> {
    private dropZone;
    constructor();
    render(): JSX.Element;
    private loadZip(data);
    private setDropZone(element);
    private dropFiles(files);
    private handleClose();
}
