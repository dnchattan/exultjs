/// <reference types="node" />
import { U7File } from "./file";
import { IFileSpec } from "./object";
export interface FlexHeader {
    title: string;
    magic1: number;
    count: number;
    magic2: number;
    padding?: any;
}
export interface Reference {
    offset: number;
    size: number;
}
export declare class Flex extends U7File {
    protected header: FlexHeader;
    protected object_list: Reference[];
    constructor(spec: IFileSpec);
    protected index(): void;
    private static readHeader(data);
    count: number;
    read(index: number, size: number): Buffer;
    type: "FLEX";
}
export declare class FlexFile extends Flex {
    constructor(identifier: IFileSpec);
}
