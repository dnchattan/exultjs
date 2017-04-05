import { Readable } from "stream";

export interface IDataSource {
    peek(): number;
    read1(): number;
    read2(): number;
    read2high(): number;
    read4(): number;
    read4high(): number;
    read(size: number): ArrayBuffer;
    readString(size: number): string;

    seek(pos: number): void;
    skip(n: number) : void;
    readonly size: number;
    readonly pos: number;
    readonly eof: boolean;
}

export class BufferDataSource implements IDataSource {
    constructor(private _buffer: Buffer) { 
        this._pos = 0;
    }

    private _pos: number;

    public seek(pos: number) {
        this._pos = pos;
    }

    public skip(n: number) {
        this._pos += n;
    }

    public get pos(): number {
        return this._pos;
    }

    public get size(): number {
        return this._buffer.byteLength;
    }

    public get eof(): boolean {
        return this._pos > this._buffer.byteLength;
    }

    public peek(): number {
        return this._buffer.readUInt8(this._pos);
    }
    
    public read1(): number {
        return this._buffer.readUInt8(this._pos++);
    }
    
    public read2(): number {
        let value = this._buffer.readUInt16LE(this._pos);
        this._pos += 2;
        return value;
    }
    
    public read2high(): number {
        let value = this._buffer.readUInt16BE(this._pos);
        this._pos += 2;
        return value;
    }
    
    public read4(): number {
        let value = this._buffer.readUInt32LE(this._pos);
        this._pos += 4;
        return value;
    }
    
    public read4high(): number {
        let value = this._buffer.readUInt32BE(this._pos);
        this._pos += 4;
        return value;
    }
    
    public read(n: number): ArrayBuffer {
        let value = this._buffer.buffer.slice(this._pos, this._pos += n);
        return value;
    }

    public readString(size: number): string {
        return this._buffer.toString("ascii", this._pos, this._pos += size);
    }
}