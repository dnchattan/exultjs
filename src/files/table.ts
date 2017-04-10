import { file_read_exception, wrong_file_type_exception } from '../include/exceptions';
import { char, IReference, uint32 } from '../include/types';
import { IDataSource } from './databuf';
import { U7File } from './file';
import { IFileSpec } from './object';

interface IHeader {
    formMagic: string; // length:4
    size: uint32;
    dataType: string; // length:4
}

interface IIFFReference extends IReference {
    name: string;
}

export class IFF extends U7File {
    private static readHeader(data: IDataSource): IHeader {
        return {
            formMagic: data.readString(4),
            size: data.read4(),
            dataType: data.readString(4),
        };
    }
    private static readObjectHeader(data: IDataSource): IIFFReference {
        return {
            name: data.readString(4),
            size: data.read4(),
            offset: data.pos,
        };
    }

    public count: number;
    public type: 'IFF';
    private header: IHeader;
    private objectList: IIFFReference[];

    constructor(spec: IFileSpec) {
        super(spec);
    }

    public read(index: number, size: number): Buffer {
        const ref: IIFFReference = this.objectList[index];
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
        if (this.header.formMagic !== 'FORM') {
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
            if (ref.size === 0 || ref.offset === 0) {
                break;
            }
            this.objectList.push(ref);
    		// Objects are word-aligned in IFF files.
            // tslint:disable-next-line:no-bitwise
            this.data.seek(ref.offset + ref.size + (ref.size & 1));
        }
    }
}
