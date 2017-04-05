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
var file_read_exception = (function (_super) {
    __extends(file_read_exception, _super);
    function file_read_exception(name) {
        return _super.call(this, "Error reading from file " + name) || this;
    }
    return file_read_exception;
}(Error));
exports.file_read_exception = file_read_exception;
var wrong_file_type_exception = (function (_super) {
    __extends(wrong_file_type_exception, _super);
    function wrong_file_type_exception(name, type) {
        return _super.call(this, "File " + name + " is not of type " + type) || this;
    }
    return wrong_file_type_exception;
}(Error));
exports.wrong_file_type_exception = wrong_file_type_exception;
//# sourceMappingURL=exceptions.js.map