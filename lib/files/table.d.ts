/// <reference types="node" />
import { U7File } from './file';
import { IFileSpec } from './object';
export declare class IFF extends U7File {
    private static readHeader(data);
    private static readObjectHeader(data);
    count: number;
    type: 'IFF';
    private header;
    private objectList;
    constructor(spec: IFileSpec);
    read(index: number, size: number): Buffer;
    protected index(): void;
}
