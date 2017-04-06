/// <reference types="node" />
import { U7File } from './file';
import { IFileSpec } from './object';
export interface IFlexHeader {
    title: string;
    magic1: number;
    count: number;
    magic2: number;
    padding?: any;
}
export interface IReference {
    offset: number;
    size: number;
}
export declare class Flex extends U7File {
    private static readHeader(data);
    count: number;
    type: 'FLEX';
    protected header: IFlexHeader;
    protected objectList: IReference[];
    constructor(spec: IFileSpec);
    read(index: number, size: number): Buffer;
    protected index(): void;
}
export declare class FlexFile extends Flex {
    constructor(identifier: IFileSpec);
}
