import { Readable } from 'stream';
import { file_read_exception, wrong_file_type_exception } from '../include/exceptions';
import { BufferDataSource, IDataSource } from './databuf';
import { U7File } from './file';
import { IFileSpec } from './object';
import { applyMixins } from './utils';
import { U7Exists, U7Open } from './utils';
import { IReference, uint32 } from "../include/types";

enum FlexVersion {
    orig = 0,       ///<    Original file version.
    exult_v2 = 1,   ///<    Exult extension for IFIX objects.
}

const EXULT_FLEX_MAGIC2 = 0x0000cc00;

interface IFlexHeader {
    title: string;  // 50 characters (optional, filled with 00s)
    magic1: uint32; // seems to be always $FFFF1A00
    count: uint32;  // number of object in table, including empty objects
    magic2: uint32; // seems to be always $000000CC
    padding?: any;  // often set to 0, but sometimes used, meaning?
}

export class Flex extends U7File {
    private static readHeader(data: IDataSource): IFlexHeader {
        return {
            title: data.readString(80),
            magic1: data.read4(),
            count: data.read4(),
            magic2: data.read4(),
            padding: data.skip(4 * 9),
        };
    }

    public count: number;
    public type: 'FLEX';
    private header: IFlexHeader;
    private objectList: IReference[];

    constructor(spec: IFileSpec) {
        super(spec);
    }

    public read(index: number, size: number): Buffer {
        let ref: IReference = this.objectList[index];
        if(!ref) {
            return new Buffer('');
        }
        this.data.seek(ref.offset);
        return this.data.read(ref.size);
    }

    protected index(): void {
        if (!this.data) {
            throw new file_read_exception(this.identifier.name);
        }

        this.header = Flex.readHeader(this.data);
        if (this.header.magic1 !== 0xffff1a00) {
            throw new wrong_file_type_exception(this.identifier.name, 'FLEX');
        }
        this.data.seek(128);
        this.objectList = [];
        for (let c = 0; c < this.header.count; c++) {
            this.objectList.push({
                offset: this.data.read4(),
                size: this.data.read4(),
            });
        }
    }
}

export class FlexFile extends Flex {
    constructor(identifier: IFileSpec) {
        super(identifier);
        if (U7Exists(identifier.name)) {
            this.data = new BufferDataSource(U7Open(identifier.name));
            this.index();
        }
    }
}
