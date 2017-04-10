import * as JSZip from 'jszip';
import * as localforage from 'localforage';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import injectTapEventPlugin = require('react-tap-event-plugin');
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

$(document).ready(() => {
    ReactDOM.render(<Explorer />, document.getElementById('react-dom'));
});

export interface IExplorerState {
    resourceZip?: JSZip;
    showDialog: boolean;
    loading?: boolean;
}

export class Explorer extends React.Component<{}, IExplorerState> {
    private dropZone: HTMLElement;
    constructor() {
        super();
        this.loadZip = this.loadZip.bind(this);
        this.setDropZone = this.setDropZone.bind(this);
        this.dropFiles = this.dropFiles.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = { showDialog: false };

        localforage.getItem('zip').then(cachedFile => {
            if (cachedFile) {
                this.loadZip(cachedFile);
            } else {
                this.setState({ showDialog: true });
            }
        });
    }

    public render() {
        return (
        <MuiThemeProvider>
            <Dialog
                title="Select game ZIP"
                open={Boolean(this.state.showDialog)}
                modal={true} onRequestClose={this.handleClose}
            >
                { this.state.loading
                ? <CircularProgress size={80} thickness={5} />
                : <div className="drop_zone" ref={element => this.setDropZone(element)}>Drop files here</div>}
            </Dialog>
        </MuiThemeProvider>
        );
    }

    private loadZip(data: any) {
        new JSZip().loadAsync(data).then(zip => {
            this.setState({ resourceZip: zip, loading: false, showDialog: false });
        })
        .catch(err => {
            localforage.removeItem('zip');
            this.setState({ loading: false });
        });
    }
    private setDropZone(element: HTMLElement) {
        this.dropZone = element;
        if (this.dropZone) {
            this.dropZone.addEventListener('dragover', evt => {
                evt.stopPropagation();
                evt.preventDefault();
                evt.dataTransfer.dropEffect = 'copy';
            });
            this.dropZone.addEventListener('drop', evt => {
                evt.stopPropagation();
                evt.preventDefault();
                this.dropFiles(evt.dataTransfer.files);
            });
        }
    }
    private dropFiles(files: FileList) {
        this.setState({ loading: true });
        const reader = new FileReader();
        reader.onload = file => {
            localforage.setItem('zip', reader.result);
            this.loadZip(reader.result);
        };
        reader.readAsBinaryString(files.item(0));
    }
    private handleClose() {
        this.setState({ showDialog: false });
    }
}
