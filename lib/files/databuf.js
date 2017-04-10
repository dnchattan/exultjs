"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BufferDataSource = (function () {
    function BufferDataSource(buffer) {
        this.buffer = buffer;
        this.cursor = 0;
    }
    BufferDataSource.prototype.seek = function (pos) {
        this.cursor = pos;
    };
    BufferDataSource.prototype.skip = function (n) {
        this.cursor += n;
    };
    Object.defineProperty(BufferDataSource.prototype, "pos", {
        get: function () {
            return this.cursor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BufferDataSource.prototype, "size", {
        get: function () {
            return this.buffer.byteLength;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BufferDataSource.prototype, "eof", {
        get: function () {
            return this.cursor > this.buffer.byteLength;
        },
        enumerable: true,
        configurable: true
    });
    BufferDataSource.prototype.peek = function () {
        return this.buffer.readUInt8(this.cursor);
    };
    BufferDataSource.prototype.read1 = function () {
        return this.buffer.readUInt8(this.cursor++);
    };
    BufferDataSource.prototype.read2 = function () {
        var value = this.buffer.readUInt16LE(this.cursor);
        this.cursor += 2;
        return value;
    };
    BufferDataSource.prototype.read2high = function () {
        var value = this.buffer.readUInt16BE(this.cursor);
        this.cursor += 2;
        return value;
    };
    BufferDataSource.prototype.read4 = function () {
        var value = this.buffer.readUInt32LE(this.cursor);
        this.cursor += 4;
        return value;
    };
    BufferDataSource.prototype.read4high = function () {
        var value = this.buffer.readUInt32BE(this.cursor);
        this.cursor += 4;
        return value;
    };
    BufferDataSource.prototype.read = function (n) {
        var value = this.buffer.slice(this.cursor, this.cursor += n);
        return value;
    };
    BufferDataSource.prototype.readString = function (size) {
        return this.buffer.toString('ascii', this.cursor, this.cursor += size);
    };
    return BufferDataSource;
}());
exports.BufferDataSource = BufferDataSource;

//# sourceMappingURL=databuf.js.map
