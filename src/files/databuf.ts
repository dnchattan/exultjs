import { Readable } from 'stream';

export interface IDataSource {
    readonly size: number;
    readonly pos: number;
    readonly eof: boolean;

    seek(pos: number): void;
    skip(n: number): void;
    peek(): number;

    read1(): number;
    read2(): number;
    read2high(): number;
    read4(): number;
    read4high(): number;
    read(size: number): ArrayBuffer;
    readString(size: number): string;
}

export class BufferDataSource implements IDataSource {
    private cursor: number;
    constructor(private buffer: Buffer) {
        this.cursor = 0;
    }
    public seek(pos: number) {
        this.cursor = pos;
    }
    public skip(n: number) {
        this.cursor += n;
    }
    public get pos(): number {
        return this.cursor;
    }
    public get size(): number {
        return this.buffer.byteLength;
    }
    public get eof(): boolean {
        return this.cursor > this.buffer.byteLength;
    }
    public peek(): number {
        return this.buffer.readUInt8(this.cursor);
    }
    public read1(): number {
        return this.buffer.readUInt8(this.cursor++);
    }
    public read2(): number {
        const value = this.buffer.readUInt16LE(this.cursor);
        this.cursor += 2;
        return value;
    }
    public read2high(): number {
        const value = this.buffer.readUInt16BE(this.cursor);
        this.cursor += 2;
        return value;
    }
    public read4(): number {
        const value = this.buffer.readUInt32LE(this.cursor);
        this.cursor += 4;
        return value;
    }
    public read4high(): number {
        const value = this.buffer.readUInt32BE(this.cursor);
        this.cursor += 4;
        return value;
    }
    public read(n: number): ArrayBuffer {
        const value = this.buffer.buffer.slice(this.cursor, this.cursor += n);
        return value;
    }
    public readString(size: number): string {
        return this.buffer.toString('ascii', this.cursor, this.cursor += size);
    }
}
