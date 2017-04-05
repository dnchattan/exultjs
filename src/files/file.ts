import { IFileSpec } from "./object";
import { IDataSource, BufferDataSource } from "./databuf";
import * as fs from "fs";

export type ArchiveType = "FLEX";

export abstract class U7File {
    protected data: IDataSource;
    protected index(): void {}

    constructor(protected identifier: IFileSpec) {

    }

    public abstract get count(): number;
    public abstract read(index: number, size: number): Buffer;
    public abstract get type(): ArchiveType;
}
