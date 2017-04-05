import { U7File } from "./file";
import { IFileSpec } from "./object";
import { file_read_exception, wrong_file_type_exception } from "../include/exceptions";
import { Readable } from "stream";
import { IDataSource, BufferDataSource } from "./databuf";
import { applyMixins } from "./utils";
import { U7Exists, U7Open } from "./utils";

enum FlexVersion {
    orig = 0,       ///<    Original file version.
    exult_v2 = 1    ///<    Exult extension for IFIX objects.
};

const EXULT_FLEX_MAGIC2 = 0x0000cc00;

export interface FlexHeader {
    title: string;  // 50 characters (optional, filled with 00s)
    magic1: number; // seems to be always $FFFF1A00
    count: number;  // number of object in table, including empty objects
    magic2: number; // seems to be always $000000CC
    padding?: any;  // often set to 0, but sometimes used, meaning?
}

export interface Reference {
    offset: number;
    size: number;
}

export class Flex extends U7File {
    protected header: FlexHeader;
    protected object_list: Reference[];

    constructor(spec: IFileSpec) {
        super(spec);
    }

    protected index(): void {
        if(!this.data) {
            throw new file_read_exception(this.identifier.name);
        }

        this.header = Flex.readHeader(this.data);
        if(this.header.magic1 != 0xffff1a00) {
		    throw new wrong_file_type_exception(this.identifier.name, "FLEX");
        }
	    this.data.seek(128);
        for (let c = 0; c < this.header.count; c++) {
            this.object_list.push({
                offset: this.data.read4(),
                size: this.data.read4(),
            });
        }
    }

    private static readHeader(data: IDataSource): FlexHeader {
        return {
            title: data.readString(50),
            magic1: data.read2(),
            count: data.read2(),
            magic2: data.read2(),
            padding: data.skip(4 * 9)
        };
    }

    public count: number;
    public read(index: number, size: number): Buffer {
        throw new Error('Method not implemented.');
    }
    public type: "FLEX";
}

export class FlexFile extends Flex {
    constructor(identifier: IFileSpec) {
        super(identifier);
        if(U7Exists(identifier.name)) {
            this.data = new BufferDataSource(U7Open(identifier.name));
            this.index();
        }
    }
}
