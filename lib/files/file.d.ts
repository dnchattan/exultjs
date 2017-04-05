/// <reference types="node" />
import { IFileSpec } from "./object";
import { IDataSource } from "./databuf";
export declare type ArchiveType = "FLEX";
export declare abstract class U7File {
    protected identifier: IFileSpec;
    protected data: IDataSource;
    protected index(): void;
    constructor(identifier: IFileSpec);
    readonly abstract count: number;
    abstract read(index: number, size: number): Buffer;
    readonly abstract type: ArchiveType;
}
