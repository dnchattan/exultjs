/// <reference types="node" />
import { U7File } from './file';
import { IFileSpec } from './object';
import { IReference, uint32 } from "../include/types";
export interface IFlexHeader {
    title: string;
    magic1: uint32;
    count: uint32;
    magic2: uint32;
    padding?: any;
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
