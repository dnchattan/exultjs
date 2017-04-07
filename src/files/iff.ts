import { U7File } from "./file";
import { charArray, uint32, char, IReference } from "../include/types";
import { IFileSpec } from "./object";
import { IDataSource } from "./databuf";
import { file_read_exception, wrong_file_type_exception } from "../include/exceptions";

export namespace IFFDetails {
    export interface IHeader {
        formMagic: charArray; // length:4
        size: uint32;
        dataType: charArray; // length:4
    }
    export interface IIFFReference extends IReference {
        name: string;
        offset: uint32;
        size: uint32;
    }
    export interface IU7Object {
        name: string; // length:8
        data: Buffer;
    }
}

export class IFF extends U7File {
    private static readHeader(data: IDataSource): IFFDetails.IHeader {
        return {
            formMagic: data.readString(4),
            size: data.read4(),
            dataType: data.readString(4),
        };
    }
    private static readObjectHeader(data: IDataSource): IFFDetails.IIFFReference {
        return {
            name: data.readString(4),
            size: data.read4(),
            offset: data.pos
        };
    }
    private static readObject(data: IDataSource, header: IFFDetails.IIFFReference): IFFDetails.IU7Object {
        return {
            name: data.readString(8),
            data: data.read(header.size),
        };
    }

    public count: number;
    public type: "IFF";
    protected header: IFFDetails.IHeader;
    protected objectList: IFFDetails.IIFFReference[];

    constructor(spec: IFileSpec) {
        super(spec);
    }

    public read(index: number, size: number): Buffer {
        let ref: IFFDetails.IIFFReference = this.objectList[index];
        if (!ref) {
            return new Buffer('');
        }
        this.data.seek(ref.offset);
        return this.data.read(ref.size);        
    }
    
    /**
     *  Reads the header from an IFF and builds an object index.
     */
    protected index(): void {
        if (!this.data) {
            throw new file_read_exception(this.identifier.name);
        }

        this.header = IFF.readHeader(this.data);
        if (this.header.formMagic !== "FORM") {
            throw new wrong_file_type_exception(this.identifier.name, 'FLEX');
        }
        
        /*
        -the objects entries
            entry   = type, size, object, [even]
            type    = 4 chars representing the type of this object
            size    = reversed longint (size of the entry excluding the first 8 bytes)
            even    = 1 byte (set to 0) present only to get an even number of bytes
            (the objects found in U7 IFF files have the following format:)
            object  = name, data
            name    = 8 chars (filled with 0s)
            data    = the data of the object
        */
        this.objectList = [];
        while (this.data.pos < this.header.size) {
            const ref = IFF.readObjectHeader(this.data);
            if (ref.size === 0 || ref.offset == 0) {
                break;
            }
            this.objectList.push(ref);
    		// Objects are word-aligned in IFF files.
            this.data.seek(ref.offset + ref.size + (ref.size & 1));
        }
    }
}