/// <reference types="node" />
import { U7File } from "./file";
import { uint32, IReference } from "../include/types";
import { IFileSpec } from "./object";
export declare namespace IFFDetails {
    interface IHeader {
        formMagic: string;
        size: uint32;
        dataType: string;
    }
    interface IIFFReference extends IReference {
        name: string;
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
