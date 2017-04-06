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
var exceptions_1 = require("../include/exceptions");
var databuf_1 = require("./databuf");
var file_1 = require("./file");
var utils_1 = require("./utils");
var FlexVersion;
(function (FlexVersion) {
    FlexVersion[FlexVersion["orig"] = 0] = "orig";
    FlexVersion[FlexVersion["exult_v2"] = 1] = "exult_v2";
})(FlexVersion || (FlexVersion = {}));
var EXULT_FLEX_MAGIC2 = 0x0000cc00;
var Flex = (function (_super) {
    __extends(Flex, _super);
    function Flex(spec) {
        return _super.call(this, spec) || this;
    }
    Flex.readHeader = function (data) {
        return {
            title: data.readString(80),
            magic1: data.read4(),
            count: data.read4(),
            magic2: data.read4(),
            padding: data.skip(4 * 9),
        };
    };
    Flex.prototype.read = function (index, size) {
        throw new Error('Method not implemented.');
    };
    Flex.prototype.index = function () {
        if (!this.data) {
            throw new exceptions_1.file_read_exception(this.identifier.name);
        }
        this.header = Flex.readHeader(this.data);
        if (this.header.magic1 !== 0xffff1a00) {
            throw new exceptions_1.wrong_file_type_exception(this.identifier.name, 'FLEX');
        }
        this.data.seek(128);
        this.objectList = [];
        for (var c = 0; c < this.header.count; c++) {
            this.objectList.push({
                offset: this.data.read4(),
                size: this.data.read4(),
            });
        }
    };
    return Flex;
}(file_1.U7File));
exports.Flex = Flex;
var FlexFile = (function (_super) {
    __extends(FlexFile, _super);
    function FlexFile(identifier) {
        var _this = _super.call(this, identifier) || this;
        if (utils_1.U7Exists(identifier.name)) {
            _this.data = new databuf_1.BufferDataSource(utils_1.U7Open(identifier.name));
            _this.index();
        }
        return _this;
    }
    return FlexFile;
}(Flex));
exports.FlexFile = FlexFile;
//# sourceMappingURL=flex.js.map