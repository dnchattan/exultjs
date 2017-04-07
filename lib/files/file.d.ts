/// <reference types="node" />
import { IDataSource } from './databuf';
import { IFileSpec } from './object';
export declare type ArchiveType = 'FLEX' | 'IFF';
export declare abstract class U7File {
    protected identifier: IFileSpec;
    protected data: IDataSource;
    protected index(): void;
    constructor(identifier: IFileSpec);
    readonly abstract count: number;
    abstract read(index: number, size: number): Buffer;
    readonly abstract type: ArchiveType;
}
