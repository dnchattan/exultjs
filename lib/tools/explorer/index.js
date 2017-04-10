"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var JSZip = require("jszip");
var localforage = require("localforage");
var CircularProgress_1 = require("material-ui/CircularProgress");
var Dialog_1 = require("material-ui/Dialog");
var MuiThemeProvider_1 = require("material-ui/styles/MuiThemeProvider");
var React = require("react");
var ReactDOM = require("react-dom");
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
$(document).ready(function () {
    ReactDOM.render(React.createElement(Explorer, null), document.getElementById('react-dom'));
});
var Explorer = (function (_super) {
    __extends(Explorer, _super);
    function Explorer() {
        var _this = _super.call(this) || this;
        _this.loadZip = _this.loadZip.bind(_this);
        _this.setDropZone = _this.setDropZone.bind(_this);
        _this.dropFiles = _this.dropFiles.bind(_this);
        _this.handleClose = _this.handleClose.bind(_this);
        _this.state = { showDialog: true, loading: true };
        localforage.getItem('zip').then(function (cachedFile) {
            if (cachedFile) {
                _this.loadZip(cachedFile);
            }
            else {
                _this.setState({ loading: false });
            }
        });
        return _this;
    }
    Explorer.prototype.render = function () {
        var _this = this;
        return (React.createElement(MuiThemeProvider_1.default, null,
            React.createElement(Dialog_1.default, { title: "Select game ZIP", open: Boolean(this.state.showDialog), modal: true, onRequestClose: this.handleClose }, this.state.loading
                ? React.createElement(CircularProgress_1.default, { size: 80, thickness: 5 })
                : React.createElement("div", { className: "drop_zone", ref: function (element) { return _this.setDropZone(element); } }, "Drop files here"))));
    };
    Explorer.prototype.loadZip = function (data) {
        var _this = this;
        new JSZip().loadAsync(data).then(function (zip) {
            _this.setState({ resourceZip: zip, loading: false, showDialog: false });
        })
            .catch(function (err) {
            localforage.removeItem('zip');
            _this.setState({ loading: false });
        });
    };
    Explorer.prototype.setDropZone = function (element) {
        var _this = this;
        this.dropZone = element;
        if (this.dropZone) {
            this.dropZone.addEventListener('dragover', function (evt) {
                evt.stopPropagation();
                evt.preventDefault();
                evt.dataTransfer.dropEffect = 'copy';
            });
            this.dropZone.addEventListener('drop', function (evt) {
                evt.stopPropagation();
                evt.preventDefault();
                _this.dropFiles(evt.dataTransfer.files);
            });
        }
    };
    Explorer.prototype.dropFiles = function (files) {
        var _this = this;
        this.setState({ loading: true });
        var reader = new FileReader();
        reader.onload = function (file) {
            localforage.setItem('zip', reader.result);
            _this.loadZip(reader.result);
        };
        reader.readAsBinaryString(files.item(0));
    };
    Explorer.prototype.handleClose = function () {
        this.setState({ showDialog: false });
    };
    return Explorer;
}(React.Component));
exports.Explorer = Explorer;

//# sourceMappingURL=index.js.map
