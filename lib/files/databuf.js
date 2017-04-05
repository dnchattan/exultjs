"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BufferDataSource = (function () {
    function BufferDataSource(_buffer) {
        this._buffer = _buffer;
        this._pos = 0;
    }
    BufferDataSource.prototype.seek = function (pos) {
        this._pos = pos;
    };
    BufferDataSource.prototype.skip = function (n) {
        this._pos += n;
    };
    Object.defineProperty(BufferDataSource.prototype, "pos", {
        get: function () {
            return this._pos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BufferDataSource.prototype, "size", {
        get: function () {
            return this._buffer.byteLength;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BufferDataSource.prototype, "eof", {
        get: function () {
            return this._pos > this._buffer.byteLength;
        },
        enumerable: true,
        configurable: true
    });
    BufferDataSource.prototype.peek = function () {
        return this._buffer.readUInt8(this._pos);
    };
    BufferDataSource.prototype.read1 = function () {
        return this._buffer.readUInt8(this._pos++);
    };
    BufferDataSource.prototype.read2 = function () {
        var value = this._buffer.readUInt16LE(this._pos);
        this._pos += 2;
        return value;
    };
    BufferDataSource.prototype.read2high = function () {
        var value = this._buffer.readUInt16BE(this._pos);
        this._pos += 2;
        return value;
    };
    BufferDataSource.prototype.read4 = function () {
        var value = this._buffer.readUInt32LE(this._pos);
        this._pos += 4;
        return value;
    };
    BufferDataSource.prototype.read4high = function () {
        var value = this._buffer.readUInt32BE(this._pos);
        this._pos += 4;
        return value;
    };
    BufferDataSource.prototype.read = function (n) {
        var value = this._buffer.buffer.slice(this._pos, this._pos += n);
        return value;
    };
    BufferDataSource.prototype.readString = function (size) {
        return this._buffer.toString("ascii", this._pos, this._pos += size);
    };
    return BufferDataSource;
}());
exports.BufferDataSource = BufferDataSource;
//# sourceMappingURL=databuf.js.map