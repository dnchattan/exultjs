import * as fs from 'fs';
import { BufferDataSource, IDataSource } from './databuf';
import { IFileSpec } from './object';

export type ArchiveType = 'FLEX';

export abstract class U7File {
    protected data: IDataSource;
    protected index(): void {}

    constructor(protected identifier: IFileSpec) {
    }

    public abstract get count(): number;
    public abstract read(index: number, size: number): Buffer;
    public abstract get type(): ArchiveType;
}
