/// <reference types="node" />
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
export declare class BufferDataSource implements IDataSource {
    private buffer;
    private cursor;
    constructor(buffer: Buffer);
    seek(pos: number): void;
    skip(n: number): void;
    readonly pos: number;
    readonly size: number;
    readonly eof: boolean;
    peek(): number;
    read1(): number;
    read2(): number;
    read2high(): number;
    read4(): number;
    read4high(): number;
    read(n: number): ArrayBuffer;
    readString(size: number): string;
}
