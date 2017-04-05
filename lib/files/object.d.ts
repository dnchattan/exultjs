/// <reference types="node" />
export interface IFileSpec {
    name: string;
    index?: number;
}
export declare class U7Object {
    protected identifier: IFileSpec;
    constructor(identifier: IFileSpec);
    protected index: number;
    readonly count: number;
    read(): Promise<Buffer>;
}
