/// <reference types="node" />
import { U7File } from "./file";
import { charArray, uint32, IReference } from "../include/types";
import { IFileSpec } from "./object";
export declare namespace IFFDetails {
    interface IHeader {
        formMagic: charArray;
        size: uint32;
        dataType: charArray;
    }
    interface IIFFReference extends IReference {
        name: string;
        offset: uint32;
        size: uint32;
    }
    interface IU7Object {
        name: string;
        data: Buffer;
    }
}
export declare class IFF extends U7File {
    private static readHeader(data);
    private static readObjectHeader(data);
    private static readObject(data, header);
    count: number;
    type: "IFF";
    protected header: IFFDetails.IHeader;
    protected objectList: IFFDetails.IIFFReference[];
    constructor(spec: IFileSpec);
    read(index: number, size: number): Buffer;
    protected index(): void;
}
