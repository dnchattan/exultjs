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
var file_1 = require("./file");
var exceptions_1 = require("../include/exceptions");
var IFF = (function (_super) {
    __extends(IFF, _super);
    function IFF(spec) {
        return _super.call(this, spec) || this;
    }
    IFF.readHeader = function (data) {
        return {
            formMagic: data.readString(4),
            size: data.read4(),
            dataType: data.readString(4),
        };
    };
    IFF.readObjectHeader = function (data) {
        return {
            name: data.readString(4),
            size: data.read4(),
            offset: data.pos
        };
    };
    IFF.readObject = function (data, header) {
        return {
            name: data.readString(8),
            data: data.read(header.size),
        };
    };
    IFF.prototype.read = function (index, size) {
        var ref = this.objectList[index];
        if (!ref) {
            return new Buffer('');
        }
        this.data.seek(ref.offset);
        return this.data.read(ref.size);
    };
    IFF.prototype.index = function () {
        if (!this.data) {
            throw new exceptions_1.file_read_exception(this.identifier.name);
        }
        this.header = IFF.readHeader(this.data);
        if (this.header.formMagic !== "FORM") {
            throw new exceptions_1.wrong_file_type_exception(this.identifier.name, 'FLEX');
        }
        this.objectList = [];
        while (this.data.pos < this.header.size) {
            var ref = IFF.readObjectHeader(this.data);
            if (ref.size === 0 || ref.offset == 0) {
                break;
            }
            this.objectList.push(ref);
            this.data.seek(ref.offset + ref.size + (ref.size & 1));
        }
    };
    return IFF;
}(file_1.U7File));
exports.IFF = IFF;
//# sourceMappingURL=iff.js.map