/// <reference types="node" />
import { U7File } from './file';
import { IFileSpec } from './object';
export declare class Flex extends U7File {
    private static readHeader(data);
    count: number;
    type: 'FLEX';
    private header;
    private objectList;
    constructor(spec: IFileSpec);
    read(index: number, size: number): Buffer;
    protected index(): void;
}
export declare class FlexFile extends Flex {
    constructor(identifier: IFileSpec);
}
